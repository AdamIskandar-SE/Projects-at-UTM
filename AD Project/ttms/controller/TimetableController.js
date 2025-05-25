// Timetable Controller
class TimetableController {
    constructor() {
        this.timetableData = [];
        this.loadTimetable();
        this.initializeFilters();
    }

    async loadTimetable() {
        const content = document.getElementById('timetableContent');
        if (content) content.innerHTML = '<p>Loading timetable...</p>';
        
        try {
            this.timetableData = await Timetable.fetchTimetable();
            this.renderTimetable();
        } catch (error) {
            if (content) content.innerHTML = '<p class="w3-text-red">Error loading timetable</p>';
        }
    }

    renderTimetable() {
        const content = document.getElementById('timetableContent');
        const dayFilter = document.getElementById('dayFilter');
        const selectedDay = dayFilter ? dayFilter.value : 'all';
        
        if (!content) return;
        
        const days = Timetable.filterDays(selectedDay);
        const timeSlots = Timetable.timeSlots;
        
        let html = '<div class="w3-responsive"><table class="w3-table">';
        html += '<tr><th>Time</th>';
        
        days.forEach(day => {
            html += `<th>${day}</th>`;
        });
        html += '</tr>';
        
        timeSlots.forEach(time => {
            html += `<tr><td>${time}</td>`;
            
            days.forEach(day => {
                const classes = Timetable.getClassesForTimeAndDay(this.timetableData, time, day);
                html += '<td>';
                
                classes.forEach(slot => {
                    const classType = Timetable.getClassType(slot);
                    html += `<div class="class-card ${classType}">
                        <div class="class-code">${slot.kod_subjek}</div>
                        <div class="class-name">${slot.nama_subjek}</div>
                        <div class="class-details">
                            <span class="class-room">📍 ${slot.no_bilik}</span>
                            <span class="class-type">${slot.jenis}</span>
                        </div>
                    </div>`;
                });
                
                html += '</td>';
            });
            
            html += '</tr>';
        });
        
        html += '</table></div>';
        content.innerHTML = html;
    }

    getClassColor(type) {
        switch(type) {
            case 'lab': return 'w3-orange';
            case 'tutorial': return 'w3-green';
            default: return 'w3-blue';
        }
    }

    initializeFilters() {
        const dayFilter = document.getElementById('dayFilter');
        if (dayFilter) {
            dayFilter.addEventListener('change', () => {
                this.renderTimetable();
            });
        }
        
        // Make loadTimetable globally available
        window.loadTimetable = () => this.loadTimetable();
    }
}
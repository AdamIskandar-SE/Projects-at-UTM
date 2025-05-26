// TimetableController.js
class TimetableController {
    constructor() {
        this.mockTimetable = [
            {
                id: 1,
                kod_subjek: 'SECJ3303',
                nama_subjek: 'Web Programming',
                hari: 'Monday',
                masa_mula: '09:00',
                masa_tamat: '11:00',
                no_bilik: 'P19-3001',
                jenis: 'lecture'
            },
            {
                id: 2,
                kod_subjek: 'SECJ3303',
                nama_subjek: 'Web Programming',
                hari: 'Wednesday',
                masa_mula: '14:00',
                masa_tamat: '16:00',
                no_bilik: 'P19-3001',
                jenis: 'tutorial'
            },
            {
                id: 3,
                kod_subjek: 'SECR3104',
                nama_subjek: 'Database Systems',
                hari: 'Tuesday',
                masa_mula: '10:00',
                masa_tamat: '12:00',
                no_bilik: 'P19-4001',
                jenis: 'lecture'
            },
            {
                id: 4,
                kod_subjek: 'SECR3104',
                nama_subjek: 'Database Systems',
                hari: 'Thursday',
                masa_mula: '15:00',
                masa_tamat: '17:00',
                no_bilik: 'P19-Lab2',
                jenis: 'lab'
            },
            {
                id: 5,
                kod_subjek: 'SECJ2013',
                nama_subjek: 'Object-Oriented Programming',
                hari: 'Friday',
                masa_mula: '11:00',
                masa_tamat: '13:00',
                no_bilik: 'P19-2002',
                jenis: 'lecture'
            },
            {
                id: 6,
                kod_subjek: 'SECJ2013',
                nama_subjek: 'Object-Oriented Programming',
                hari: 'Monday',
                masa_mula: '14:00',
                masa_tamat: '16:00',
                no_bilik: 'P19-Lab1',
                jenis: 'lab'
            }
        ];

        this.timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
        this.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    }

    async loadTimetable(userId, semester = null) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // In a real app, filter by user and semester
        return this.mockTimetable;
    }

    getClassesForTimeAndDay(timetableData, time, day) {
        return timetableData.filter(slot => {
            const startTime = slot.masa_mula;
            const endTime = slot.masa_tamat;
            const slotDay = slot.hari;
            
            return slotDay === day && this.isTimeInRange(time, startTime, endTime);
        });
    }

    isTimeInRange(checkTime, startTime, endTime) {
        const check = this.timeToMinutes(checkTime);
        const start = this.timeToMinutes(startTime);
        const end = this.timeToMinutes(endTime);
        
        return check >= start && check < end;
    }

    timeToMinutes(timeStr) {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    }

    getClassType(slot) {
        const type = slot.jenis.toLowerCase();
        if (type.includes('lecture') || type.includes('kuliah')) return 'lecture';
        if (type.includes('tutorial') || type.includes('tut')) return 'tutorial';
        if (type.includes('lab') || type.includes('praktikum')) return 'lab';
        return 'lecture';
    }

    filterByDay(timetableData, selectedDay) {
        if (selectedDay === 'all') return timetableData;
        return timetableData.filter(slot => slot.hari === selectedDay);
    }

    getAvailableDays(timetableData) {
        const daysSet = new Set(timetableData.map(slot => slot.hari));
        return this.days.filter(day => daysSet.has(day));
    }

    getTimetableStats(timetableData) {
        const stats = {
            totalClasses: timetableData.length,
            lectures: 0,
            tutorials: 0,
            labs: 0,
            subjects: new Set()
        };

        timetableData.forEach(slot => {
            const type = this.getClassType(slot);
            stats[type + 's']++;
            stats.subjects.add(slot.kod_subjek);
        });

        stats.uniqueSubjects = stats.subjects.size;
        delete stats.subjects;

        return stats;
    }
}
// Course Controller
class CourseController {
    constructor() {
        this.allCourses = [];
        this.loadCourses();
        this.initializeSearch();
    }

    async loadCourses() {
        const content = document.getElementById('courseContent');
        if (content) content.innerHTML = '<p>Loading courses...</p>';
        
        try {
            this.allCourses = await Course.fetchUserCourses();
            this.renderCourses(this.allCourses);
        } catch (error) {
            if (content) content.innerHTML = '<p class="w3-text-red">Error loading courses</p>';
        }
    }

    renderCourses(courses) {
        const content = document.getElementById('courseContent');
        if (!content) return;
        
        if (!courses || courses.length === 0) {
            content.innerHTML = '<p>No courses found</p>';
            return;
        }
        
        const groupedCourses = Course.groupCoursesBySemester(courses);
        let html = '';
        
        groupedCourses.forEach(group => {
            html += `<div class="w3-card w3-margin">
                <div class="w3-container w3-theme w3-padding">
                    <h3>Session ${group.sessem} (${group.total} courses)</h3>
                </div>
                <div class="w3-container">`;
            
            group.courses.forEach(course => {
                html += `<div class="w3-panel w3-border-left w3-border-blue">
                    <h4>${course.kod_subjek} - ${course.nama_subjek}</h4>
                    <p><strong>Credit Hours:</strong> ${course.kredit_jam || 'N/A'}</p>
                    ${course.pensyarah ? `<p><strong>Lecturer:</strong> ${course.pensyarah}</p>` : ''}
                </div>`;
            });
            
            html += '</div></div>';
        });
        
        content.innerHTML = html;
    }

    initializeSearch() {
        const searchInput = document.getElementById('courseSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value;
                const filteredCourses = Course.searchCourses(this.allCourses, query);
                this.renderCourses(filteredCourses);
            });
        }
        
        // Make loadCourses globally available
        window.loadCourses = () => this.loadCourses();
    }
}
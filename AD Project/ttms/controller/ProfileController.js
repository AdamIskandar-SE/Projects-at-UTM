// Profile Controller
class ProfileController {
    constructor() {
        this.loadProfile();
        this.loadSemesters();
        this.initializeSemesterChange();
    }

    loadProfile() {
        const user = User.getCurrentUser();
        const profileInfo = document.getElementById('profileInfo');
        
        if (user && profileInfo) {
            profileInfo.innerHTML = `
                <p><strong>Name:</strong> ${user.full_name || 'N/A'}</p>
                <p><strong>Login ID:</strong> ${user.login_name || 'N/A'}</p>
                <p><strong>Type:</strong> ${user.description || 'N/A'}</p>
                ${user.no_pekerja ? `<p><strong>Staff ID:</strong> ${user.no_pekerja}</p>` : ''}
            `;
        }
    }

    loadSemesters() {
        const semesters = User.getSemesterList();
        const currentSemester = User.getCurrentSemester();
        const select = document.getElementById('semesterSelect');
        
        if (select) {
            select.innerHTML = '';
            
            if (semesters.length === 0) {
                select.innerHTML = '<option>No semesters available</option>';
                return;
            }
            
            semesters.forEach(semester => {
                const option = document.createElement('option');
                option.value = JSON.stringify(semester);
                option.text = `${semester.sesi} - Semester ${semester.semester}`;
                
                if (currentSemester && 
                    semester.sesi === currentSemester.sesi && 
                    semester.semester === currentSemester.semester) {
                    option.selected = true;
                }
                
                select.appendChild(option);
            });
        }
    }

    initializeSemesterChange() {
        const select = document.getElementById('semesterSelect');
        if (select) {
            select.addEventListener('change', (e) => {
                if (e.target.value) {
                    const selectedSemester = JSON.parse(e.target.value);
                    User.setCurrentSemester(selectedSemester);
                }
            });
        }
    }
}
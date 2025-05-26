const { createApp } = Vue;

// Mock data for demonstration
const mockUsers = {
    'student1': { 
        password: 'pass123',
        data: {
            full_name: 'Ahmad bin Abdullah',
            login_name: 'student1',
            description: 'Pelajar FSKSM',
            no_matrik: 'A20EC1234'
        }
    },
    'lecturer1': {
        password: 'pass123',
        data: {
            full_name: 'Dr. Siti Aminah',
            login_name: 'lecturer1',
            description: 'Pensyarah',
            no_pekerja: '12345'
        }
    }
};

const mockSemesters = [
    { sesi: '2024/2025', semester: '2' },
    { sesi: '2024/2025', semester: '1' },
    { sesi: '2023/2024', semester: '2' }
];

const app = createApp({
    data() {
        return {
            // Auth state
            isAuthenticated: false,
            user: {},
            username: '',
            password: '',
            errorMessage: '',
            loginLoading: false,
            
            // App state
            currentView: 'profile',
            currentTime: '',
            sidebarOpen: false,
            
            // Semester state
            semesters: [],
            currentSemester: null,
            
            // Timetable state
            timetableData: [],
            timetableLoading: false,
            selectedDay: 'all',
            timeSlots: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
            days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            
            // Course state
            courses: [],
            coursesLoading: false,
            courseSearch: ''
        };
    },

    computed: {
        userInitials() {
            if (!this.user.full_name) return '?';
            return this.user.full_name.split(' ')
                .map(word => word.charAt(0))
                .slice(0, 2)
                .join('')
                .toUpperCase();
        },
        
        filteredDays() {
            return this.selectedDay === 'all' ? this.days : [this.selectedDay];
        },
        
        filteredCourses() {
            if (!this.courseSearch) return this.courses;
            const search = this.courseSearch.toLowerCase();
            return this.courses.filter(course => 
                course.kod_subjek.toLowerCase().includes(search) ||
                course.nama_subjek.toLowerCase().includes(search)
            );
        },
        
        groupedCourses() {
            const grouped = {};
            this.filteredCourses.forEach(course => {
                const key = `${course.sesi}-${course.semester}`;
                if (!grouped[key]) {
                    grouped[key] = {
                        sessem: key,
                        total: 0,
                        courses: []
                    };
                }
                grouped[key].total++;
                grouped[key].courses.push(course);
            });
            return Object.values(grouped).sort((a, b) => b.sessem.localeCompare(a.sessem));
        }
    },

    methods: {
        // Navigation methods
        setView(view) {
            this.currentView = view;
            this.closeSidebar();
            
            if (view === 'timetable' && this.timetableData.length === 0) {
                this.loadTimetable();
            } else if (view === 'courses' && this.courses.length === 0) {
                this.loadCourses();
            }
        },

        openSidebar() {
            document.getElementById('sidebar').style.display = 'block';
            this.sidebarOpen = true;
        },

        closeSidebar() {
            document.getElementById('sidebar').style.display = 'none';
            this.sidebarOpen = false;
        },

        // Data loading methods
        loadSemesters() {
            // Simulate API call
            setTimeout(() => {
                this.semesters = mockSemesters;
                this.currentSemester = this.semesters[0];
            }, 500);
        },

        // Time update
        updateTime() {
            const now = new Date();
            this.currentTime = now.toLocaleTimeString('en-MY', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
        }
    },

    mounted() {
        this.updateTime();
        setInterval(this.updateTime, 1000);
        
        // Handle click outside sidebar to close it
        document.addEventListener('click', (e) => {
            const sidebar = document.getElementById('sidebar');
            const menuButton = e.target.closest('.w3-xxlarge');
            
            if (this.sidebarOpen && sidebar && !sidebar.contains(e.target) && !menuButton) {
                this.closeSidebar();
            }
        });
    }
});

app.mount('#app');
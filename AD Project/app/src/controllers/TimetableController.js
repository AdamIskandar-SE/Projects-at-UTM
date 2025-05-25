// app/src/controllers/TimetableController.js
class TimetableController {
    fetchTimetable() {
        const user = User.getCurrentUser();
        const semester = Semester.getCurrent();
        
        let endpoint = '';
        let params = { sesi: semester.sesi, semester: semester.semester };
        
        if (User.isStudent()) {
            endpoint = "pelajar_jadual";
            params.no_matrik = user.login_name;
        } else if (User.isLecturer()) {
            endpoint = "pensyarah_jadual";
            params.no_pekerja = user.no_pekerja;
        }
        
        const url = this.buildUrl(endpoint, params);
        
        return fetch(url)
            .then(res => res.json())
            .catch(() => {
                // Return mock data if API fails
                return this.getMockTimetable();
            });
    }

    buildUrl(endpoint, params) {
        let url = `http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?entity=${endpoint}`;
        for (const [key, value] of Object.entries(params)) {
            url += `&${key}=${encodeURIComponent(value)}`;
        }
        return url;
    }

    getMockTimetable() {
        return [
            {
                kod_subjek: 'SECJ3303',
                nama_subjek: 'Web Programming',
                hari: 'Monday',
                masa_mula: '09:00',
                masa_tamat: '11:00',
                no_bilik: 'P19-3001',
                jenis: 'lecture'
            },
            {
                kod_subjek: 'SECR3104',
                nama_subjek: 'Database Systems',
                hari: 'Tuesday',
                masa_mula: '10:00',
                masa_tamat: '12:00',
                no_bilik: 'P19-4001',
                jenis: 'lecture'
            }
        ];
    }

    getClassesForTimeAndDay(time, day, timetableData) {
        const hour = parseInt(time.split(':')[0]);
        
        return timetableData.filter(slot => {
            const startHour = parseInt(slot.masa_mula.split(':')[0]);
            const endHour = parseInt(slot.masa_tamat.split(':')[0]);
            
            return slot.hari === day && hour >= startHour && hour < endHour;
        });
    }
}
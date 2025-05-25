// Timetable Model
class Timetable {
    static days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    static timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

    static async fetchTimetable() {
        const user = User.getCurrentUser();
        const semester = User.getCurrentSemester();
        
        if (!user || !semester) {
            throw new Error('User or semester data not available');
        }

        try {
            let timetable;
            if (user.description === 'Pelajar FSKSM') {
                timetable = await Api.getStudentTimetable(user.login_name, semester.sesi, semester.semester);
            } else if (user.description === 'Pensyarah') {
                timetable = await Api.getLecturerTimetable(user.no_pekerja, semester.sesi, semester.semester);
            } else {
                throw new Error('Unknown user type');
            }

            return timetable || [];
        } catch (error) {
            console.error('Error fetching timetable:', error);
            // Return mock data for demonstration
            return this.generateMockTimetable();
        }
    }

    static generateMockTimetable() {
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
                kod_subjek: 'SECJ3303',
                nama_subjek: 'Web Programming',
                hari: 'Wednesday',
                masa_mula: '14:00',
                masa_tamat: '16:00',
                no_bilik: 'P19-3001',
                jenis: 'tutorial'
            },
            {
                kod_subjek: 'SECR3104',
                nama_subjek: 'Database Systems',
                hari: 'Tuesday',
                masa_mula: '10:00',
                masa_tamat: '12:00',
                no_bilik: 'P19-4001',
                jenis: 'lecture'
            },
            {
                kod_subjek: 'SECR3104',
                nama_subjek: 'Database Systems',
                hari: 'Thursday',
                masa_mula: '15:00',
                masa_tamat: '17:00',
                no_bilik: 'P19-Lab2',
                jenis: 'lab'
            }
        ];
    }

    static getClassesForTimeAndDay(timetableData, time, day) {
        const hour = parseInt(time.split(':')[0]);
        
        return timetableData.filter(slot => {
            const startHour = parseInt(slot.masa_mula.split(':')[0]);
            const endHour = parseInt(slot.masa_tamat.split(':')[0]);
            
            return slot.hari === day && hour >= startHour && hour < endHour;
        });
    }

    static getClassType(slot) {
        switch(slot.jenis?.toLowerCase()) {
            case 'lab': return 'lab';
            case 'tutorial': return 'tutorial';
            default: return 'lecture';
        }
    }

    static filterTimeSlots(timeRange) {
        switch(timeRange) {
            case 'morning':
                return this.timeSlots.slice(0, 5); // 8:00 - 12:00
            case 'afternoon':
                return this.timeSlots.slice(5); // 13:00 - 17:00
            default:
                return this.timeSlots;
        }
    }

    static filterDays(selectedDay) {
        if (selectedDay === 'all') {
            return this.days;
        }
        return [selectedDay];
    }
}
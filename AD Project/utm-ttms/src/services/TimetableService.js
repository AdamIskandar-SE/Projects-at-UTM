// src/services/TimetableService.js
import ApiService from './ApiService.js';

class TimetableService extends ApiService {
  constructor() {
    super();
    this.timetableData = null;
  }

  async fetchTimetable() {
    try {
      // In a real application, this would make an API call
      // For now, we'll simulate with local data
      const response = await this.simulateApiCall('/api/timetable');
      this.timetableData = response;
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch timetable: ${error.message}`);
    }
  }

  async fetchTimetableByDay(day) {
    try {
      const timetable = await this.fetchTimetable();
      return timetable[day] || [];
    } catch (error) {
      throw new Error(`Failed to fetch timetable for ${day}: ${error.message}`);
    }
  }

  async updateTimetable(timetableData) {
    try {
      const response = await this.simulateApiCall('/api/timetable', 'PUT', timetableData);
      this.timetableData = response;
      return response;
    } catch (error) {
      throw new Error(`Failed to update timetable: ${error.message}`);
    }
  }

  async addTimetableEntry(day, entry) {
    try {
      if (!this.timetableData) {
        await this.fetchTimetable();
      }
      
      if (!this.timetableData[day]) {
        this.timetableData[day] = [];
      }
      
      this.timetableData[day].push(entry);
      return await this.updateTimetable(this.timetableData);
    } catch (error) {
      throw new Error(`Failed to add timetable entry: ${error.message}`);
    }
  }

  async deleteTimetableEntry(day, timeSlot) {
    try {
      if (!this.timetableData) {
        await this.fetchTimetable();
      }
      
      if (this.timetableData[day]) {
        this.timetableData[day] = this.timetableData[day].filter(
          entry => entry.time !== timeSlot
        );
      }
      
      return await this.updateTimetable(this.timetableData);
    } catch (error) {
      throw new Error(`Failed to delete timetable entry: ${error.message}`);
    }
  }

  getAvailableTimeSlots(day) {
    const allTimeSlots = [
      '8:00 AM - 10:00 AM',
      '10:00 AM - 12:00 PM',
      '12:00 PM - 2:00 PM',
      '2:00 PM - 4:00 PM',
      '4:00 PM - 6:00 PM'
    ];

    if (!this.timetableData || !this.timetableData[day]) {
      return allTimeSlots;
    }

    const occupiedSlots = this.timetableData[day].map(entry => entry.time);
    return allTimeSlots.filter(slot => !occupiedSlots.includes(slot));
  }

  // Simulate API call with local data
  async simulateApiCall(endpoint, method = 'GET', data = null) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock timetable data based on your JSON
        const mockTimetable = {
          "Mon": [
            {
              "time": "8:00 AM - 10:00 AM",
              "course": "UHBL2122",
              "section": "53",
              "courseName": "Professional Communication Skills 1",
              "venue": "N28a BT4"
            },
            {
              "time": "2:00 PM - 4:00 PM",
              "course": "SECR2242",
              "section": "02",
              "courseName": "Computer Network",
              "venue": "N28 CSL"
            }
          ],
          "Tue": [
            {
              "time": "8:00 AM - 10:00 AM",
              "course": "SECR3104",
              "section": "01",
              "courseName": "Application Development",
              "venue": "CGMTL"
            },
            {
              "time": "2:00 PM - 4:00 PM",
              "course": "SECR2345",
              "section": "02",
              "courseName": "Operating Systems",
              "venue": "N28 CSL"
            }
          ],
          "Wed": [
            {
              "time": "8:00 AM - 10:00 AM",
              "course": "SECR3104",
              "section": "01",
              "courseName": "Application Development",
              "venue": "MPK 3"
            },
            {
              "time": "10:00 AM - 11:30 AM",
              "course": "SECR2010",
              "section": "01",
              "courseName": "Data Structures",
              "venue": "N28 BT2"
            },
            {
              "time": "2:00 PM - 3:30 PM",
              "course": "SECR3010",
              "section": "05",
              "courseName": "Algorithms",
              "venue": "N28 BT3"
            }
          ],
          "Thu": [
            {
              "time": "11:00 AM - 1:00 PM",
              "course": "UHBL3344",
              "section": "04",
              "courseName": "Advanced Communication",
              "venue": "N28a BT2"
            }
          ],
          "Fri": [
            {
              "time": "8:00 AM - 10:00 AM",
              "course": "SECR1122",
              "section": "05",
              "courseName": "Cyber Security",
              "venue": "N28 CSL"
            }
          ]
        };

        if (method === 'PUT' && data) {
          resolve(data);
        } else {
          resolve(mockTimetable);
        }
      }, 500);
    });
  }
}

export default TimetableService;
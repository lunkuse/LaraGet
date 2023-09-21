// import customAxios from '../composables/custom-axios';
import axios from 'axios'

export default class PatientsService {
  static async fetchPatients(url) {
    try {
      const response = await customAxios.post(url);
      let data = response.data;
      if (data.status === 'SUCCESS') {
        return { success: true, data: data.payload, message: 'Patient loaded' };
      }
      return { success: false, data: {}, message: data.payload };
    } catch (err) {
      return { success: false, data: {}, message: `${err}` };
    }
  }

  static async fetchSinglePatient(id) {
    try {
      const response = await customAxios.post('v1/patients/patient', { patientId: id });
      let data = response.data;
      if (data.status === 'SUCCESS') {
        localStorage.removeItem('patient');
        setTimeout(() => {
          localStorage.setItem('patient', JSON.stringify(data.payload));
        }, 1000);
        return { success: true, data: data.payload, message: 'Patient loaded' };
      }
      let pLocal = JSON.parse(localStorage.getItem('patient'));
      return { success: true, data: pLocal, message: data.payload };
    } catch (err) {
      return { success: false, data: null, message: `${err}` };
    }
  }

  static async fetchSinglePatientAppontiments(id) {
    try {
      const response = await customAxios.post('v1/patients/appointments', { patientId: id });
      let data = response.data;
      // console.log({ Appointments: data });
      if (data.status === 'SUCCESS') {
        return { success: true, data: data.payload, message: 'Patient Appointments loaded' };
      }
      return { success: false, data: [], message: data.payload };
    } catch (err) {
      return { success: false, data: [], message: `${err}` };
    }
  }

  static async assignDoctor(patientId, mainDoctorId, secondaryDoctorId) {
    try {
      const response = await customAxios.post('v1/patients/assign-doctor', {
        patientId,
        main_doctor_id: mainDoctorId,
        secondary_doctor_id: secondaryDoctorId ? secondaryDoctorId : '',
      });
      let data = response.data;
      console.log({ PatientsData: data });
      if (data.status === 'SUCCESS') {
        return { success: true, data: data.payload, message: 'Patient loaded' };
      }
      return { success: true, data: null, message: data.payload };
    } catch (err) {
      return { success: false, data: null, message: `${err}` };
    }
  }
  static async fetchQuestions(url, id) {
    console.log('getting questions', url,id)
    try {
        const response = await axios.post(url, {patientId: id});
        let data = response.data;
        if (data.status === 'SUCCESS') {
            return {success: true, data: data.payload, message: 'Patient Questions loaded'};
        }

    } catch (err) {
        return {success: false, data: {}, message: `${err}`};
    }
}
  static async fetchTreamentHistory() {
    try {
      const treatments = [
        {
          id: 6,
          title: 'Treatment 1',
          date: '20/Jul/2022',
          currency: '$',
          treatments: [
            {
              time: '15:30',
              subject: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia,
            porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium
            ipsa quae quis praesentium voluptate saepe ullam sint ea itaque consectetur impedit?`,
              element: '34',
              amount: 5000.00,
              doctor: 'Muhammed Kasujja',
            },
            {
              time: '16:30',
              subject: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia,
            porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium
            ipsa quae quis praesentium voluptate saepe ullam sint ea itaque consectetur impedit?`,
              element: null,
              amount: 3000.00,
              doctor: 'Brandon Elijah',
            }],
        },
        {
          id: 3,
          title: 'Treatment 2',
          date: '28/Jul/2022',
          currency: '$',
          treatments: [
            {
              time: '14:50',
              subject: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia,
            porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium
            ipsa quae quis praesentium voluptate saepe ullam sint ea itaque consectetur impedit?`,
              element: '34',
              amount: 9000.00,
              doctor: 'Brandon Elijah',
            },
          ],
        },
        {
          id: 13,
          title: 'Treatment 3',
          date: '02/Aug/2022',
          currency: '$',
          treatments: [
            {
              time: '11:50',
              subject: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia,
            porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium
            ipsa quae quis praesentium voluptate saepe ullam sint ea itaque consectetur impedit?`,
              element: '1',
              amount: 15000.00,
              doctor: 'Mariate Ndagire',
            },
            {
              time: '13:50',
              subject: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia,
            porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium
            ipsa quae quis praesentium voluptate saepe ullam sint ea itaque consectetur impedit?`,
              element: null,
              amount: 10000.00,
              doctor: 'Muhammed Kasujja',
            },
            {
              time: '17:20',
              subject: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia,
            porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium
            ipsa quae quis praesentium voluptate saepe ullam sint ea itaque consectetur impedit?`,
              element: '34',
              amount: 20000.00,
              doctor: 'Muhammed Kasujja',
            },
          ],
        },
        {
          id: 133,
          title: 'Treatment 4',
          date: '04/Aug/2022',
          currency: '$',
          treatments: [
            {
              time: '14:50',
              subject: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia,
            porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium
            ipsa quae quis praesentium voluptate saepe ullam sint ea itaque consectetur impedit?`,
              element: '34',
              amount: 9000.00,
              doctor: 'Brandon Elijah',
            },
          ],
        },
        {
          id: 23,
          title: 'Treatment 1',
          date: '20/Jul/2022',
          currency: '$',
          treatments: [
            {
              time: '12:20',
              subject: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia,
            porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium
            ipsa quae quis praesentium voluptate saepe ullam sint ea itaque consectetur impedit?`,
              element: '34',
              amount: 100000.00,
              doctor: 'Benjamin kooma',
            },
          ],
        },
        {
          id: 123,
          title: 'Treatment 2',
          date: '28/Jul/2022',
          currency: '$',
          treatments: [
            {
              time: '14:50',
              subject: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia,
            porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium
            ipsa quae quis praesentium voluptate saepe ullam sint ea itaque consectetur impedit?`,
              element: '34',
              amount: 9000.00,
              doctor: 'Brandon Elijah',
            },
          ],
        },
        {
          id: 673,
          title: 'Treatment 3',
          date: '02/Aug/2022',
          currency: '$',
          treatments: [
            {
              time: '14:50',
              subject: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia,
            porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium
            ipsa quae quis praesentium voluptate saepe ullam sint ea itaque consectetur impedit?`,
              element: '34',
              amount: 9000.00,
              doctor: 'Brandon Elijah',
            },
          ],
        },
        {
          id: 899,
          title: 'Treatment 4',
          date: '04/Aug/2022',
          currency: '$',
          treatments: [
            {
              time: '14:50',
              subject: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia,
            porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium
            ipsa quae quis praesentium voluptate saepe ullam sint ea itaque consectetur impedit?`,
              element: '34',
              amount: 9000.00,
              doctor: 'Brandon Elijah',
            },
          ],
        },
        {
          id: 356,
          title: 'Treatment 1',
          date: '20/Jul/2022',
          currency: '$',
          treatments: [
            {
              time: '14:50',
              subject: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia,
            porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium
            ipsa quae quis praesentium voluptate saepe ullam sint ea itaque consectetur impedit?`,
              element: '34',
              amount: 9000.00,
              doctor: 'Brandon Elijah',
            },
          ],
        },
        {
          id: 235623,
          title: 'Treatment 2',
          date: '28/Jul/2022',
          currency: '$',
          treatments: [
            {
              time: '14:50',
              subject: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia,
            porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium
            ipsa quae quis praesentium voluptate saepe ullam sint ea itaque consectetur impedit?`,
              element: '34',
              amount: 9000.00,
              doctor: 'Brandon Elijah',
            },
          ],
        },

      ];
      return { success: true, data: treatments, message: null };
    } catch (err) {
      return { success: false, data: null, message: `${err}` };
    }
  }

  static async fetchDentalInformation() {
    try {
      const data = [{
        date: '20/05/2022',
        questions: {
          intake: [
            {
              id: 1,
              question: 'Are you having dental pain or discomfort?',
              status: true,
            },
            {
              id: 2,
              question: 'Are your teeth sensitive to heat, cold, or pressure?',
              status: false,
            },
            {
              id: 3,
              question: 'Do your gums bleed while brushing or flossing?',
              status: false,
            },
            { id: 4, question: 'How often do you brush? Floss?', status: null },
            { id: 5, question: 'Do you use an electric toothbrush?', status: null },
            { id: 7, question: 'Do you clench or grind your teeth?', status: null },
            {
              id: 8,
              question: 'Have you ever had orthodontic treatment/braces?',
              status: null,
            },
            {
              id: 9,
              question:
                'Do you wear removable dentures or partials? If so, how old are they?',
              status: null,
            },
            { id: 10, question: 'Do you wish your teeth looked better?', status: true },
            {
              id: 11,
              question:
                'Do you use anti-anxiety medications or nitrous oxide (laughing gas) for dental visits?',
              status: null,
            },
            {
              id: 12,
              question: 'Have you ever had any serious problems with dental treatment?',
              status: true,
            },
          ],
          jaw: {
            question: 'Have you ever experienced any of the following problems with your jaw?',
            options: [
              { id: 1, name: 'Noise/Popping_pain', checked: null },
              { id: 2, name: 'Locking', checked: null },
              { id: 3, name: 'Difficult Chewing', checked: null },
              { id: 4, name: 'Headaches', checked: true },
            ],
          },
          specialists: {
            question: 'Have you seen other dental specialists ?',
            options: [
              { id: '1', name: 'None', checked: null },
              { id: '2', name: 'Prosthodontist', checked: null },
              { id: '3', name: 'Oral Surgeon', checked: true },
              { id: '4', name: 'Periodontist', checked: null },
              { id: '5', name: 'Orthodontist', checked: null },
              { id: '6', name: 'Endodontist', checked: true },
            ],
          },
          doctor: 'Kasujja Muhammed',
        },
        risks: {
          doctor: 'Dr. Kasujja Muhammed',
        },
      }, {
        date: '22/06/2022',
        questions: {
          intake: [
            {
              id: 1,
              question: 'Are you having dental pain or discomfort?',
              status: false,
            },
            {
              id: 2,
              question: 'Are your teeth sensitive to heat, cold, or pressure?',
              status: null,
            },
            {
              id: 3,
              question: 'Do your gums bleed while brushing or flossing?',
              status: null,
            },
            { id: 4, question: 'How often do you brush? Floss?', status: null },
            { id: 5, question: 'Do you use an electric toothbrush?', status: null },
            { id: 7, question: 'Do you clench or grind your teeth?', status: null },
            {
              id: 8,
              question: 'Have you ever had orthodontic treatment/braces?',
              status: null,
            },
            {
              id: 9,
              question:
                'Do you wear removable dentures or partials? If so, how old are they?',
              status: null,
            },
            { id: 10, question: 'Do you wish your teeth looked better?', status: null },
            {
              id: 11,
              question:
                'Do you use anti-anxiety medications or nitrous oxide (laughing gas) for dental visits?',
              status: null,
            },
            {
              id: 12,
              question: 'Have you ever had any serious problems with dental treatment?',
              status: null,
            },
          ],
          jaw: {
            question: 'Have you ever experienced any of the following problems with your jaw?',
            options: [
              { id: 1, name: 'Noise/Popping_pain', checked: null },
              { id: 2, name: 'Locking', checked: null },
              { id: 3, name: 'Difficult Chewing', checked: null },
              { id: 4, name: 'Headaches', checked: null },
            ],
          },
          specialists: {
            question: 'Have you seen other dental specialists ?',
            options: [
              { id: '1', name: 'None', checked: null },
              { id: '2', name: 'Prosthodontist', checked: null },
              { id: '3', name: 'Oral Surgeon', checked: null },
              { id: '4', name: 'Periodontist', checked: null },
              { id: '5', name: 'Orthodontist', checked: null },
              { id: '6', name: 'Endodontist', checked: null },
            ],
          },
          doctor: 'Brandon Elijah',
        },
        risks: {
          doctor: 'Dr. Mariate Ndagire',
        },
      }, {
        date: '30/06/2022',
        questions: {
          intake: [
            {
              id: 1,
              question: 'Are you having dental pain or discomfort?',
              status: null,
            },
            {
              id: 2,
              question: 'Are your teeth sensitive to heat, cold, or pressure?',
              status: null,
            },
            {
              id: 3,
              question: 'Do your gums bleed while brushing or flossing?',
              status: null,
            },
            { id: 4, question: 'How often do you brush? Floss?', status: null },
            { id: 5, question: 'Do you use an electric toothbrush?', status: null },
            { id: 7, question: 'Do you clench or grind your teeth?', status: null },
            {
              id: 8,
              question: 'Have you ever had orthodontic treatment/braces?',
              status: null,
            },
            {
              id: 9,
              question:
                'Do you wear removable dentures or partials? If so, how old are they?',
              status: null,
            },
            { id: 10, question: 'Do you wish your teeth looked better?', status: null },
            {
              id: 11,
              question:
                'Do you use anti-anxiety medications or nitrous oxide (laughing gas) for dental visits?',
              status: null,
            },
            {
              id: 12,
              question: 'Have you ever had any serious problems with dental treatment?',
              status: null,
            },
          ],
          jaw: {
            question: 'Have you ever experienced any of the following problems with your jaw?',
            options: [
              { id: 1, name: 'Noise/Popping_pain', checked: null },
              { id: 2, name: 'Locking', checked: null },
              { id: 3, name: 'Difficult Chewing', checked: null },
              { id: 4, name: 'Headaches', checked: null },
            ],
          },
          specialists: {
            question: 'Have you seen other dental specialists ?',
            options: [
              { id: '1', name: 'None', checked: null },
              { id: '2', name: 'Prosthodontist', checked: null },
              { id: '3', name: 'Oral Surgeon', checked: null },
              { id: '4', name: 'Periodontist', checked: null },
              { id: '5', name: 'Orthodontist', checked: null },
              { id: '6', name: 'Endodontist', checked: null },
            ],
          },
          doctor: 'Mariate Ndagire',
        },
        risks: {},
      }, {
        date: '30/07/2022',
        questions: {
          intake: [
            {
              id: 1,
              question: 'Are you having dental pain or discomfort?',
              status: null,
            },
            {
              id: 2,
              question: 'Are your teeth sensitive to heat, cold, or pressure?',
              status: null,
            },
            {
              id: 3,
              question: 'Do your gums bleed while brushing or flossing?',
              status: null,
            },
            { id: 4, question: 'How often do you brush? Floss?', status: null },
            { id: 5, question: 'Do you use an electric toothbrush?', status: null },
            { id: 7, question: 'Do you clench or grind your teeth?', status: null },
            {
              id: 8,
              question: 'Have you ever had orthodontic treatment/braces?',
              status: null,
            },
            {
              id: 9,
              question:
                'Do you wear removable dentures or partials? If so, how old are they?',
              status: null,
            },
            { id: 10, question: 'Do you wish your teeth looked better?', status: null },
            {
              id: 11,
              question:
                'Do you use anti-anxiety medications or nitrous oxide (laughing gas) for dental visits?',
              status: null,
            },
            {
              id: 12,
              question: 'Have you ever had any serious problems with dental treatment?',
              status: null,
            },
          ],
          jaw: {
            question: 'Have you ever experienced any of the following problems with your jaw?',
            options: [
              { id: 1, name: 'Noise/Popping_pain', checked: null },
              { id: 2, name: 'Locking', checked: null },
              { id: 3, name: 'Difficult Chewing', checked: null },
              { id: 4, name: 'Headaches', checked: null },
            ],
          },
          specialists: {
            question: 'Have you seen other dental specialists ?',
            options: [
              { id: '1', name: 'None', checked: null },
              { id: '2', name: 'Prosthodontist', checked: null },
              { id: '3', name: 'Oral Surgeon', checked: null },
              { id: '4', name: 'Periodontist', checked: null },
              { id: '5', name: 'Orthodontist', checked: null },
              { id: '6', name: 'Endodontist', checked: null },
            ],
          },
          doctor: 'Benjamin Kooma',
        },
        risks: {},
      }];
      return { success: true, data, message: null };
    } catch (err) {
      return { success: false, data: null, message: `${err}` };
    }
  }

  static async fetchXraysData() {
    try {
      const data = [
        {
          id: 5667,
          appointment_id: 5678,
          appointment_date: '20/Jul/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 16,
          thumbnail: 'https://www.mackenziedentalcentre.com/uploads/upload/fotolia_65927766.jpg',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzM4OvjmdRVHjj3XyNFHCQD9Ex7NT6AyCdDZmSQq6q&s',
          alterations: [],
          comments: [
            {
              date: '22/06/2022',
              comments: [
                {
                  id: 576,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 890,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 4678,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/06/2022',
              comments: [
                {
                  id: 4678,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '30/06/2022',
              comments: [
                {
                  id: 890,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 4678,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 435565,
          appointment_id: 4545,
          appointment_date: '30/Jun/2022',
          doctor: 'Benjamin Kooma',
          tooth: 25,
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvlKT-6k7peGza2D4jocJLup4k2v3myjez_88EwSKx9RG1gZh4KLU9SAbscCjmzoRsQro&usqp=CAU',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvlKT-6k7peGza2D4jocJLup4k2v3myjez_88EwSKx9RG1gZh4KLU9SAbscCjmzoRsQro&usqp=CAU',
          alterations: [],
          comments: [
            {
              date: '01/07/2022',
              comments: [
                {
                  id: 45,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '05/07/2022',
              comments: [
                {
                  id: 67,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '17/07/2022',
              comments: [
                {
                  id: 890,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 4678,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 85645,
          appointment_id: 54678,
          appointment_date: '18/06/2022',
          doctor: 'Brandon Elijah',
          tooth: 22,
          thumbnail: 'https://dentistryfortheentirefamily.com/wp-content/uploads/2016/06/Digital-dental-periapical-xray.jpg',
          image: 'https://dentistryfortheentirefamily.com/wp-content/uploads/2016/06/Digital-dental-periapical-xray.jpg',
          alterations: [],
          comments: [
            {
              date: '18/06/2022',
              comments: [
                {
                  id: 576,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 890,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 4678,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '22/06/2022',
              comments: [
                {
                  id: 4678,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/06/2022',
              comments: [
                {
                  id: 890,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 4678,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 324567,
          appointment_id: 6789,
          appointment_date: '20/Jun/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 13,
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRanEeT-Jls3tmiawvHNoiApTetgKZzBznyEgy5MMeepp6ghW_LzT5z3j850lhWVPhOStk&usqp=CAU',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRanEeT-Jls3tmiawvHNoiApTetgKZzBznyEgy5MMeepp6ghW_LzT5z3j850lhWVPhOStk&usqp=CAU',
          alterations: [],
          comments: [
            {
              date: '06/06/2022',
              comments: [
                {
                  id: 6776,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '15/06/2022',
              comments: [
                {
                  id: 789,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '30/06/2022',
              comments: [
                {
                  id: 567,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 87534587,
          appointment_id: 6565,
          appointment_date: '20/May/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 16,
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9y_JIqrzms77O_EroXVzXcGYfK7-QI-BTqtBm6u5giDL7pE0LOlvFwnPwUcnZa-Blqq0&usqp=CAU',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9y_JIqrzms77O_EroXVzXcGYfK7-QI-BTqtBm6u5giDL7pE0LOlvFwnPwUcnZa-Blqq0&usqp=CAU',
          alterations: [],
          comments: [
            {
              date: '22/05/2022',
              comments: [
                {
                  id: 98545,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/05/2022',
              comments: [
                {
                  id: 6578,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 234,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 874533,
          appointment_id: 4545,
          appointment_date: '30/Jun/2022',
          doctor: 'Benjamin Kooma',
          tooth: 25,
          thumbnail: 'https://uploads-ssl.webflow.com/61e7a911958c1d3ae12a57a5/61fa10b0519af22aaff559bd_Panoramic%20X-ray.jpg',
          image: 'https://uploads-ssl.webflow.com/61e7a911958c1d3ae12a57a5/61fa10b0519af22aaff559bd_Panoramic%20X-ray.jpg',
          alterations: [],
          comments: [
            {
              date: '01/07/2022',
              comments: [
                {
                  id: 45,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '05/07/2022',
              comments: [
                {
                  id: 67,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '17/07/2022',
              comments: [
                {
                  id: 890,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 4678,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 678645,
          appointment_id: 5678,
          appointment_date: '18/06/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 22,
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9y_JIqrzms77O_EroXVzXcGYfK7-QI-BTqtBm6u5giDL7pE0LOlvFwnPwUcnZa-Blqq0&usqp=CAU',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9y_JIqrzms77O_EroXVzXcGYfK7-QI-BTqtBm6u5giDL7pE0LOlvFwnPwUcnZa-Blqq0&usqp=CAU',
          alterations: [],
          comments: [
            {
              date: '18/06/2022',
              comments: [
                {
                  id: 576,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 890,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 4678,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '22/06/2022',
              comments: [
                {
                  id: 4678,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/06/2022',
              comments: [
                {
                  id: 890,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 4678,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 987865454,
          appointment_id: 6789,
          appointment_date: '20/Jun/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 13,
          thumbnail: 'https://media.istockphoto.com/photos/panoramic-dental-and-mandible-xray-image-with-intact-teeth-and-four-picture-id1148236832?k=20&m=1148236832&s=612x612&w=0&h=8zhAp6_aMZHNpOmdac_S3clG-snryEvaKk6bHTqFKlI=',
          image: 'https://media.istockphoto.com/photos/panoramic-dental-and-mandible-xray-image-with-intact-teeth-and-four-picture-id1148236832?k=20&m=1148236832&s=612x612&w=0&h=8zhAp6_aMZHNpOmdac_S3clG-snryEvaKk6bHTqFKlI=',
          alterations: [],
          comments: [
            {
              date: '22/06/2022',
              comments: [
                {
                  id: 5678,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/06/2022',
              comments: [
                {
                  id: 789,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '30/06/2022',
              comments: [
                {
                  id: 567,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 234454,
          appointment_id: 6565,
          appointment_date: '20/May/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 16,
          thumbnail: 'https://www.hawkinsfamilydental.com/wp-content/uploads/2014/08/dental-x-ray.jpg',
          image: 'https://www.hawkinsfamilydental.com/wp-content/uploads/2014/08/dental-x-ray.jpg',
          alterations: [],
          comments: [
            {
              date: '22/05/2022',
              comments: [
                {
                  id: 98545,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/05/2022',
              comments: [
                {
                  id: 6578,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 234,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 23454643,
          appointment_id: 6565,
          appointment_date: '20/May/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 16,
          thumbnail: 'https://previews.123rf.com/images/alexmit/alexmit1610/alexmit161000098/64615358-transparent-scull-and-teeth-xray-view-3d-illustration-.jpg',
          image: 'https://previews.123rf.com/images/alexmit/alexmit1610/alexmit161000098/64615358-transparent-scull-and-teeth-xray-view-3d-illustration-.jpg',
          alterations: [],
          comments: [
            {
              date: '22/05/2022',
              comments: [
                {
                  id: 98545,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/05/2022',
              comments: [
                {
                  id: 6578,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 234,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 435423,
          appointment_id: 6565,
          appointment_date: '20/May/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 16,
          thumbnail: 'https://us.123rf.com/450wm/eraxion/eraxion1304/eraxion130400297/19040341-3d-rendered-illustration-of-the-wisdom-teeth.jpg?ver=6',
          image: 'https://us.123rf.com/450wm/eraxion/eraxion1304/eraxion130400297/19040341-3d-rendered-illustration-of-the-wisdom-teeth.jpg?ver=6',
          alterations: [],
          comments: [
            {
              date: '22/05/2022',
              comments: [
                {
                  id: 98545,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/05/2022',
              comments: [
                {
                  id: 6578,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 234,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 43546734,
          appointment_id: 6565,
          appointment_date: '20/May/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 16,
          thumbnail: 'https://image.shutterstock.com/image-illustration/xray-image-jaw-teeth-one-260nw-331532789.jpg',
          image: 'https://image.shutterstock.com/image-illustration/xray-image-jaw-teeth-one-260nw-331532789.jpg',
          alterations: [],
          comments: [
            {
              date: '22/05/2022',
              comments: [
                {
                  id: 98545,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/05/2022',
              comments: [
                {
                  id: 6578,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 234,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 3454675,
          appointment_id: 5678,
          appointment_date: '20/Jul/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 16,
          thumbnail: 'https://www.mackenziedentalcentre.com/uploads/upload/fotolia_65927766.jpg',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzM4OvjmdRVHjj3XyNFHCQD9Ex7NT6AyCdDZmSQq6q&s',
          alterations: [],
          comments: [
            {
              date: '22/06/2022',
              comments: [
                {
                  id: 576,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 890,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 4678,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/06/2022',
              comments: [
                {
                  id: 4678,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/06/2022',
              comments: [
                {
                  id: 890,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 4678,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 55356544,
          appointment_id: 4545,
          appointment_date: '30/Jun/2022',
          doctor: 'Benjamin Kooma',
          tooth: 25,
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvlKT-6k7peGza2D4jocJLup4k2v3myjez_88EwSKx9RG1gZh4KLU9SAbscCjmzoRsQro&usqp=CAU',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvlKT-6k7peGza2D4jocJLup4k2v3myjez_88EwSKx9RG1gZh4KLU9SAbscCjmzoRsQro&usqp=CAU',
          alterations: [],
          comments: [
            {
              date: '01/07/2022',
              comments: [
                {
                  id: 45,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '05/07/2022',
              comments: [
                {
                  id: 67,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '17/07/2022',
              comments: [
                {
                  id: 890,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 4678,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 6553435,
          appointment_id: 5678,
          appointment_date: '18/06/2022',
          doctor: 'Brandon Elijah',
          tooth: 22,
          thumbnail: 'https://dentistryfortheentirefamily.com/wp-content/uploads/2016/06/Digital-dental-periapical-xray.jpg',
          image: 'https://dentistryfortheentirefamily.com/wp-content/uploads/2016/06/Digital-dental-periapical-xray.jpg',
          alterations: [],
          comments: [
            {
              date: '18/06/2022',
              comments: [
                {
                  id: 576,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 890,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 4678,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '22/06/2022',
              comments: [
                {
                  id: 4678,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/06/2022',
              comments: [
                {
                  id: 890,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 4678,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 7898564,
          appointment_id: 6789,
          appointment_date: '20/Jun/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 13,
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRanEeT-Jls3tmiawvHNoiApTetgKZzBznyEgy5MMeepp6ghW_LzT5z3j850lhWVPhOStk&usqp=CAU',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRanEeT-Jls3tmiawvHNoiApTetgKZzBznyEgy5MMeepp6ghW_LzT5z3j850lhWVPhOStk&usqp=CAU',
          alterations: [],
          comments: [
            {
              date: '22/06/2022',
              comments: [
                {
                  id: 5678,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/06/2022',
              comments: [
                {
                  id: 789,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '30/06/2022',
              comments: [
                {
                  id: 567,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 46764545,
          appointment_id: 6565,
          appointment_date: '20/May/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 16,
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9y_JIqrzms77O_EroXVzXcGYfK7-QI-BTqtBm6u5giDL7pE0LOlvFwnPwUcnZa-Blqq0&usqp=CAU',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9y_JIqrzms77O_EroXVzXcGYfK7-QI-BTqtBm6u5giDL7pE0LOlvFwnPwUcnZa-Blqq0&usqp=CAU',
          alterations: [],
          comments: [
            {
              date: '22/05/2022',
              comments: [
                {
                  id: 98545,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/05/2022',
              comments: [
                {
                  id: 6578,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 234,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 657895645,
          appointment_id: 4545,
          appointment_date: '30/Jun/2022',
          doctor: 'Benjamin Kooma',
          tooth: 25,
          thumbnail: 'https://uploads-ssl.webflow.com/61e7a911958c1d3ae12a57a5/61fa10b0519af22aaff559bd_Panoramic%20X-ray.jpg',
          image: 'https://uploads-ssl.webflow.com/61e7a911958c1d3ae12a57a5/61fa10b0519af22aaff559bd_Panoramic%20X-ray.jpg',
          alterations: [],
          comments: [
            {
              date: '01/07/2022',
              comments: [
                {
                  id: 45,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '05/07/2022',
              comments: [
                {
                  id: 67,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '17/07/2022',
              comments: [
                {
                  id: 890,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 4678,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 243567,
          appointment_id: 5678,
          appointment_date: '18/06/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 22,
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9y_JIqrzms77O_EroXVzXcGYfK7-QI-BTqtBm6u5giDL7pE0LOlvFwnPwUcnZa-Blqq0&usqp=CAU',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9y_JIqrzms77O_EroXVzXcGYfK7-QI-BTqtBm6u5giDL7pE0LOlvFwnPwUcnZa-Blqq0&usqp=CAU',
          alterations: [],
          comments: [
            {
              date: '18/06/2022',
              comments: [
                {
                  id: 576,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 890,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 4678,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '22/06/2022',
              comments: [
                {
                  id: 4678,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/06/2022',
              comments: [
                {
                  id: 890,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 4678,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 8975654,
          appointment_id: 6789,
          appointment_date: '20/Jun/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 13,
          thumbnail: 'https://media.istockphoto.com/photos/panoramic-dental-and-mandible-xray-image-with-intact-teeth-and-four-picture-id1148236832?k=20&m=1148236832&s=612x612&w=0&h=8zhAp6_aMZHNpOmdac_S3clG-snryEvaKk6bHTqFKlI=',
          image: 'https://media.istockphoto.com/photos/panoramic-dental-and-mandible-xray-image-with-intact-teeth-and-four-picture-id1148236832?k=20&m=1148236832&s=612x612&w=0&h=8zhAp6_aMZHNpOmdac_S3clG-snryEvaKk6bHTqFKlI=',
          alterations: [],
          comments: [
            {
              date: '22/06/2022',
              comments: [
                {
                  id: 5678,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/06/2022',
              comments: [
                {
                  id: 789,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '30/06/2022',
              comments: [
                {
                  id: 567,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 657343456,
          appointment_id: 6565,
          appointment_date: '20/May/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 16,
          thumbnail: 'https://www.hawkinsfamilydental.com/wp-content/uploads/2014/08/dental-x-ray.jpg',
          image: 'https://www.hawkinsfamilydental.com/wp-content/uploads/2014/08/dental-x-ray.jpg',
          alterations: [],
          comments: [
            {
              date: '22/05/2022',
              comments: [
                {
                  id: 98545,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/05/2022',
              comments: [
                {
                  id: 6578,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 234,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 6785454,
          appointment_id: 6565,
          appointment_date: '20/May/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 16,
          thumbnail: 'https://previews.123rf.com/images/alexmit/alexmit1610/alexmit161000098/64615358-transparent-scull-and-teeth-xray-view-3d-illustration-.jpg',
          image: 'https://previews.123rf.com/images/alexmit/alexmit1610/alexmit161000098/64615358-transparent-scull-and-teeth-xray-view-3d-illustration-.jpg',
          alterations: [],
          comments: [
            {
              date: '22/05/2022',
              comments: [
                {
                  id: 98545,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/05/2022',
              comments: [
                {
                  id: 6578,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 234,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 865535657,
          appointment_id: 6565,
          appointment_date: '20/May/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 16,
          thumbnail: 'https://us.123rf.com/450wm/eraxion/eraxion1304/eraxion130400297/19040341-3d-rendered-illustration-of-the-wisdom-teeth.jpg?ver=6',
          image: 'https://us.123rf.com/450wm/eraxion/eraxion1304/eraxion130400297/19040341-3d-rendered-illustration-of-the-wisdom-teeth.jpg?ver=6',
          alterations: [],
          comments: [
            {
              date: '22/05/2022',
              comments: [
                {
                  id: 98545,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/05/2022',
              comments: [
                {
                  id: 6578,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 234,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 4567535465,
          appointment_id: 6565,
          appointment_date: '20/May/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 16,
          thumbnail: 'https://image.shutterstock.com/image-illustration/xray-image-jaw-teeth-one-260nw-331532789.jpg',
          image: 'https://image.shutterstock.com/image-illustration/xray-image-jaw-teeth-one-260nw-331532789.jpg',
          alterations: [],
          comments: [
            {
              date: '22/05/2022',
              comments: [
                {
                  id: 98545,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/05/2022',
              comments: [
                {
                  id: 6578,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 234,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 65545657657,
          appointment_id: 5678,
          appointment_date: '20/Jul/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 16,
          thumbnail: 'https://www.mackenziedentalcentre.com/uploads/upload/fotolia_65927766.jpg',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzM4OvjmdRVHjj3XyNFHCQD9Ex7NT6AyCdDZmSQq6q&s',
          alterations: [],
          comments: [
            {
              date: '22/06/2022',
              comments: [
                {
                  id: 576,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 890,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 4678,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/06/2022',
              comments: [
                {
                  id: 4678,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/06/2022',
              comments: [
                {
                  id: 890,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 4678,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 6535657,
          appointment_id: 4545,
          appointment_date: '30/Jun/2022',
          doctor: 'Benjamin Kooma',
          tooth: 25,
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvlKT-6k7peGza2D4jocJLup4k2v3myjez_88EwSKx9RG1gZh4KLU9SAbscCjmzoRsQro&usqp=CAU',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvlKT-6k7peGza2D4jocJLup4k2v3myjez_88EwSKx9RG1gZh4KLU9SAbscCjmzoRsQro&usqp=CAU',
          alterations: [],
          comments: [
            {
              date: '01/07/2022',
              comments: [
                {
                  id: 45,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '05/07/2022',
              comments: [
                {
                  id: 67,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '17/07/2022',
              comments: [
                {
                  id: 890,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 4678,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 6789064,
          appointment_id: 5678,
          appointment_date: '18/06/2022',
          doctor: 'Brandon Elijah',
          tooth: 22,
          thumbnail: 'https://dentistryfortheentirefamily.com/wp-content/uploads/2016/06/Digital-dental-periapical-xray.jpg',
          image: 'https://dentistryfortheentirefamily.com/wp-content/uploads/2016/06/Digital-dental-periapical-xray.jpg',
          alterations: [],
          comments: [
            {
              date: '18/06/2022',
              comments: [
                {
                  id: 576,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 890,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 4678,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '22/06/2022',
              comments: [
                {
                  id: 4678,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/06/2022',
              comments: [
                {
                  id: 890,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 4678,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 653034,
          appointment_id: 6789,
          appointment_date: '20/Jun/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 13,
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRanEeT-Jls3tmiawvHNoiApTetgKZzBznyEgy5MMeepp6ghW_LzT5z3j850lhWVPhOStk&usqp=CAU',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRanEeT-Jls3tmiawvHNoiApTetgKZzBznyEgy5MMeepp6ghW_LzT5z3j850lhWVPhOStk&usqp=CAU',
          alterations: [],
          comments: [
            {
              date: '22/06/2022',
              comments: [
                {
                  id: 5678,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/06/2022',
              comments: [
                {
                  id: 789,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '30/06/2022',
              comments: [
                {
                  id: 567,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 2233456,
          appointment_id: 6565,
          appointment_date: '20/May/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 16,
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9y_JIqrzms77O_EroXVzXcGYfK7-QI-BTqtBm6u5giDL7pE0LOlvFwnPwUcnZa-Blqq0&usqp=CAU',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9y_JIqrzms77O_EroXVzXcGYfK7-QI-BTqtBm6u5giDL7pE0LOlvFwnPwUcnZa-Blqq0&usqp=CAU',
          alterations: [],
          comments: [
            {
              date: '22/05/2022',
              comments: [
                {
                  id: 98545,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/05/2022',
              comments: [
                {
                  id: 6578,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 234,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 6456755,
          appointment_id: 4545,
          appointment_date: '30/Jun/2022',
          doctor: 'Benjamin Kooma',
          tooth: 25,
          thumbnail: 'https://uploads-ssl.webflow.com/61e7a911958c1d3ae12a57a5/61fa10b0519af22aaff559bd_Panoramic%20X-ray.jpg',
          image: 'https://uploads-ssl.webflow.com/61e7a911958c1d3ae12a57a5/61fa10b0519af22aaff559bd_Panoramic%20X-ray.jpg',
          alterations: [],
          comments: [
            {
              date: '01/07/2022',
              comments: [
                {
                  id: 45,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '05/07/2022',
              comments: [
                {
                  id: 67,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '17/07/2022',
              comments: [
                {
                  id: 890,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 4678,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 6578455,
          appointment_id: 5678,
          appointment_date: '18/06/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 22,
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9y_JIqrzms77O_EroXVzXcGYfK7-QI-BTqtBm6u5giDL7pE0LOlvFwnPwUcnZa-Blqq0&usqp=CAU',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9y_JIqrzms77O_EroXVzXcGYfK7-QI-BTqtBm6u5giDL7pE0LOlvFwnPwUcnZa-Blqq0&usqp=CAU',
          alterations: [],
          comments: [
            {
              date: '18/06/2022',
              comments: [
                {
                  id: 576,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 890,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 4678,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '22/06/2022',
              comments: [
                {
                  id: 4678,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/06/2022',
              comments: [
                {
                  id: 890,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 4678,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 895644,
          appointment_id: 6789,
          appointment_date: '20/Jun/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 13,
          thumbnail: 'https://media.istockphoto.com/photos/panoramic-dental-and-mandible-xray-image-with-intact-teeth-and-four-picture-id1148236832?k=20&m=1148236832&s=612x612&w=0&h=8zhAp6_aMZHNpOmdac_S3clG-snryEvaKk6bHTqFKlI=',
          image: 'https://media.istockphoto.com/photos/panoramic-dental-and-mandible-xray-image-with-intact-teeth-and-four-picture-id1148236832?k=20&m=1148236832&s=612x612&w=0&h=8zhAp6_aMZHNpOmdac_S3clG-snryEvaKk6bHTqFKlI=',
          alterations: [],
          comments: [
            {
              date: '22/06/2022',
              comments: [
                {
                  id: 5678,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/06/2022',
              comments: [
                {
                  id: 789,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '30/06/2022',
              comments: [
                {
                  id: 567,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 12334333,
          appointment_id: 6565,
          appointment_date: '20/May/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 16,
          thumbnail: 'https://www.hawkinsfamilydental.com/wp-content/uploads/2014/08/dental-x-ray.jpg',
          image: 'https://www.hawkinsfamilydental.com/wp-content/uploads/2014/08/dental-x-ray.jpg',
          alterations: [],
          comments: [
            {
              date: '22/05/2022',
              comments: [
                {
                  id: 98545,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/05/2022',
              comments: [
                {
                  id: 6578,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 234,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 4234553,
          appointment_id: 6565,
          appointment_date: '20/May/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 16,
          thumbnail: 'https://previews.123rf.com/images/alexmit/alexmit1610/alexmit161000098/64615358-transparent-scull-and-teeth-xray-view-3d-illustration-.jpg',
          image: 'https://previews.123rf.com/images/alexmit/alexmit1610/alexmit161000098/64615358-transparent-scull-and-teeth-xray-view-3d-illustration-.jpg',
          alterations: [],
          comments: [
            {
              date: '22/05/2022',
              comments: [
                {
                  id: 98545,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/05/2022',
              comments: [
                {
                  id: 6578,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 234,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 2312244,
          appointment_id: 6565,
          appointment_date: '20/May/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 16,
          thumbnail: 'https://us.123rf.com/450wm/eraxion/eraxion1304/eraxion130400297/19040341-3d-rendered-illustration-of-the-wisdom-teeth.jpg?ver=6',
          image: 'https://us.123rf.com/450wm/eraxion/eraxion1304/eraxion130400297/19040341-3d-rendered-illustration-of-the-wisdom-teeth.jpg?ver=6',
          alterations: [],
          comments: [
            {
              date: '22/05/2022',
              comments: [
                {
                  id: 98545,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/05/2022',
              comments: [
                {
                  id: 6578,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 234,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 5356454,
          appointment_id: 6565,
          appointment_date: '20/May/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 16,
          thumbnail: 'https://image.shutterstock.com/image-illustration/xray-image-jaw-teeth-one-260nw-331532789.jpg',
          image: 'https://image.shutterstock.com/image-illustration/xray-image-jaw-teeth-one-260nw-331532789.jpg',
          alterations: [],
          comments: [
            {
              date: '22/05/2022',
              comments: [
                {
                  id: 98545,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/05/2022',
              comments: [
                {
                  id: 6578,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 234,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 65755454,
          appointment_id: 5678,
          appointment_date: '20/Jul/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 16,
          thumbnail: 'https://www.mackenziedentalcentre.com/uploads/upload/fotolia_65927766.jpg',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzM4OvjmdRVHjj3XyNFHCQD9Ex7NT6AyCdDZmSQq6q&s',
          alterations: [],
          comments: [
            {
              date: '22/06/2022',
              comments: [
                {
                  id: 576,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 890,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 4678,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/06/2022',
              comments: [
                {
                  id: 4678,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/06/2022',
              comments: [
                {
                  id: 890,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 4678,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 756555,
          appointment_id: 4545,
          appointment_date: '30/Jun/2022',
          doctor: 'Benjamin Kooma',
          tooth: 25,
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvlKT-6k7peGza2D4jocJLup4k2v3myjez_88EwSKx9RG1gZh4KLU9SAbscCjmzoRsQro&usqp=CAU',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvlKT-6k7peGza2D4jocJLup4k2v3myjez_88EwSKx9RG1gZh4KLU9SAbscCjmzoRsQro&usqp=CAU',
          alterations: [],
          comments: [
            {
              date: '01/07/2022',
              comments: [
                {
                  id: 45,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '05/07/2022',
              comments: [
                {
                  id: 67,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '17/07/2022',
              comments: [
                {
                  id: 890,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 4678,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 453566,
          appointment_id: 5678,
          appointment_date: '18/06/2022',
          doctor: 'Brandon Elijah',
          tooth: 22,
          thumbnail: 'https://dentistryfortheentirefamily.com/wp-content/uploads/2016/06/Digital-dental-periapical-xray.jpg',
          image: 'https://dentistryfortheentirefamily.com/wp-content/uploads/2016/06/Digital-dental-periapical-xray.jpg',
          alterations: [],
          comments: [
            {
              date: '18/06/2022',
              comments: [
                {
                  id: 576,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 890,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 4678,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '22/06/2022',
              comments: [
                {
                  id: 4678,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/06/2022',
              comments: [
                {
                  id: 890,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 4678,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 656477,
          appointment_id: 6789,
          appointment_date: '20/Jun/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 13,
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRanEeT-Jls3tmiawvHNoiApTetgKZzBznyEgy5MMeepp6ghW_LzT5z3j850lhWVPhOStk&usqp=CAU',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRanEeT-Jls3tmiawvHNoiApTetgKZzBznyEgy5MMeepp6ghW_LzT5z3j850lhWVPhOStk&usqp=CAU',
          alterations: [],
          comments: [
            {
              date: '22/06/2022',
              comments: [
                {
                  id: 5678,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/06/2022',
              comments: [
                {
                  id: 789,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '30/06/2022',
              comments: [
                {
                  id: 567,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 6764533,
          appointment_id: 6565,
          appointment_date: '20/May/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 16,
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9y_JIqrzms77O_EroXVzXcGYfK7-QI-BTqtBm6u5giDL7pE0LOlvFwnPwUcnZa-Blqq0&usqp=CAU',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9y_JIqrzms77O_EroXVzXcGYfK7-QI-BTqtBm6u5giDL7pE0LOlvFwnPwUcnZa-Blqq0&usqp=CAU',
          alterations: [],
          comments: [
            {
              date: '22/05/2022',
              comments: [
                {
                  id: 98545,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/05/2022',
              comments: [
                {
                  id: 6578,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 234,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 7877954,
          appointment_id: 4545,
          appointment_date: '30/Jun/2022',
          doctor: 'Benjamin Kooma',
          tooth: 25,
          thumbnail: 'https://uploads-ssl.webflow.com/61e7a911958c1d3ae12a57a5/61fa10b0519af22aaff559bd_Panoramic%20X-ray.jpg',
          image: 'https://uploads-ssl.webflow.com/61e7a911958c1d3ae12a57a5/61fa10b0519af22aaff559bd_Panoramic%20X-ray.jpg',
          alterations: [],
          comments: [
            {
              date: '01/07/2022',
              comments: [
                {
                  id: 45,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '05/07/2022',
              comments: [
                {
                  id: 67,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '17/07/2022',
              comments: [
                {
                  id: 890,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 4678,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 4565745,
          appointment_id: 5678,
          appointment_date: '18/06/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 22,
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9y_JIqrzms77O_EroXVzXcGYfK7-QI-BTqtBm6u5giDL7pE0LOlvFwnPwUcnZa-Blqq0&usqp=CAU',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9y_JIqrzms77O_EroXVzXcGYfK7-QI-BTqtBm6u5giDL7pE0LOlvFwnPwUcnZa-Blqq0&usqp=CAU',
          alterations: [],
          comments: [
            {
              date: '18/06/2022',
              comments: [
                {
                  id: 576,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 890,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 4678,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '22/06/2022',
              comments: [
                {
                  id: 4678,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/06/2022',
              comments: [
                {
                  id: 890,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 4678,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 986699,
          appointment_id: 6789,
          appointment_date: '20/Jun/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 13,
          thumbnail: 'https://media.istockphoto.com/photos/panoramic-dental-and-mandible-xray-image-with-intact-teeth-and-four-picture-id1148236832?k=20&m=1148236832&s=612x612&w=0&h=8zhAp6_aMZHNpOmdac_S3clG-snryEvaKk6bHTqFKlI=',
          image: 'https://media.istockphoto.com/photos/panoramic-dental-and-mandible-xray-image-with-intact-teeth-and-four-picture-id1148236832?k=20&m=1148236832&s=612x612&w=0&h=8zhAp6_aMZHNpOmdac_S3clG-snryEvaKk6bHTqFKlI=',
          alterations: [],
          comments: [
            {
              date: '22/06/2022',
              comments: [
                {
                  id: 5678,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/06/2022',
              comments: [
                {
                  id: 789,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '30/06/2022',
              comments: [
                {
                  id: 567,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 6755,
          appointment_id: 6565,
          appointment_date: '20/May/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 16,
          thumbnail: 'https://www.hawkinsfamilydental.com/wp-content/uploads/2014/08/dental-x-ray.jpg',
          image: 'https://www.hawkinsfamilydental.com/wp-content/uploads/2014/08/dental-x-ray.jpg',
          alterations: [],
          comments: [
            {
              date: '22/05/2022',
              comments: [
                {
                  id: 98545,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/05/2022',
              comments: [
                {
                  id: 6578,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 234,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 67896756,
          appointment_id: 6565,
          appointment_date: '20/May/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 16,
          thumbnail: 'https://previews.123rf.com/images/alexmit/alexmit1610/alexmit161000098/64615358-transparent-scull-and-teeth-xray-view-3d-illustration-.jpg',
          image: 'https://previews.123rf.com/images/alexmit/alexmit1610/alexmit161000098/64615358-transparent-scull-and-teeth-xray-view-3d-illustration-.jpg',
          alterations: [],
          comments: [
            {
              date: '22/05/2022',
              comments: [
                {
                  id: 98545,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/05/2022',
              comments: [
                {
                  id: 6578,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 234,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 876756,
          appointment_id: 6565,
          appointment_date: '20/May/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 16,
          thumbnail: 'https://us.123rf.com/450wm/eraxion/eraxion1304/eraxion130400297/19040341-3d-rendered-illustration-of-the-wisdom-teeth.jpg?ver=6',
          image: 'https://us.123rf.com/450wm/eraxion/eraxion1304/eraxion130400297/19040341-3d-rendered-illustration-of-the-wisdom-teeth.jpg?ver=6',
          alterations: [],
          comments: [
            {
              date: '22/05/2022',
              comments: [
                {
                  id: 98545,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/05/2022',
              comments: [
                {
                  id: 6578,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 234,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 345677,
          appointment_id: 6565,
          appointment_date: '20/May/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 16,
          thumbnail: 'https://image.shutterstock.com/image-illustration/xray-image-jaw-teeth-one-260nw-331532789.jpg',
          image: 'https://image.shutterstock.com/image-illustration/xray-image-jaw-teeth-one-260nw-331532789.jpg',
          alterations: [],
          comments: [
            {
              date: '22/05/2022',
              comments: [
                {
                  id: 98545,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/05/2022',
              comments: [
                {
                  id: 6578,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 234,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 57879764,
          appointment_id: 5678,
          appointment_date: '20/Jul/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 16,
          thumbnail: 'https://www.mackenziedentalcentre.com/uploads/upload/fotolia_65927766.jpg',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzM4OvjmdRVHjj3XyNFHCQD9Ex7NT6AyCdDZmSQq6q&s',
          alterations: [],
          comments: [
            {
              date: '22/06/2022',
              comments: [
                {
                  id: 576,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 890,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 4678,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/06/2022',
              comments: [
                {
                  id: 4678,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/06/2022',
              comments: [
                {
                  id: 890,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 4678,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 6578446,
          appointment_id: 4545,
          appointment_date: '30/Jun/2022',
          doctor: 'Benjamin Kooma',
          tooth: 25,
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvlKT-6k7peGza2D4jocJLup4k2v3myjez_88EwSKx9RG1gZh4KLU9SAbscCjmzoRsQro&usqp=CAU',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvlKT-6k7peGza2D4jocJLup4k2v3myjez_88EwSKx9RG1gZh4KLU9SAbscCjmzoRsQro&usqp=CAU',
          alterations: [],
          comments: [
            {
              date: '01/07/2022',
              comments: [
                {
                  id: 45,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '05/07/2022',
              comments: [
                {
                  id: 67,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '17/07/2022',
              comments: [
                {
                  id: 890,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 4678,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 6574456,
          appointment_id: 5678,
          appointment_date: '18/06/2022',
          doctor: 'Brandon Elijah',
          tooth: 22,
          thumbnail: 'https://dentistryfortheentirefamily.com/wp-content/uploads/2016/06/Digital-dental-periapical-xray.jpg',
          image: 'https://dentistryfortheentirefamily.com/wp-content/uploads/2016/06/Digital-dental-periapical-xray.jpg',
          alterations: [],
          comments: [
            {
              date: '18/06/2022',
              comments: [
                {
                  id: 576,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 890,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 4678,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '22/06/2022',
              comments: [
                {
                  id: 4678,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/06/2022',
              comments: [
                {
                  id: 890,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 4678,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 80987564,
          appointment_id: 6789,
          appointment_date: '20/Jun/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 13,
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRanEeT-Jls3tmiawvHNoiApTetgKZzBznyEgy5MMeepp6ghW_LzT5z3j850lhWVPhOStk&usqp=CAU',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRanEeT-Jls3tmiawvHNoiApTetgKZzBznyEgy5MMeepp6ghW_LzT5z3j850lhWVPhOStk&usqp=CAU',
          alterations: [],
          comments: [
            {
              date: '22/06/2022',
              comments: [
                {
                  id: 5678,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/06/2022',
              comments: [
                {
                  id: 789,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '30/06/2022',
              comments: [
                {
                  id: 567,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 6567464,
          appointment_id: 6565,
          appointment_date: '20/May/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 16,
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9y_JIqrzms77O_EroXVzXcGYfK7-QI-BTqtBm6u5giDL7pE0LOlvFwnPwUcnZa-Blqq0&usqp=CAU',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9y_JIqrzms77O_EroXVzXcGYfK7-QI-BTqtBm6u5giDL7pE0LOlvFwnPwUcnZa-Blqq0&usqp=CAU',
          alterations: [],
          comments: [
            {
              date: '22/05/2022',
              comments: [
                {
                  id: 98545,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/05/2022',
              comments: [
                {
                  id: 6578,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 234,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 9690088,
          appointment_id: 4545,
          appointment_date: '30/Jun/2022',
          doctor: 'Benjamin Kooma',
          tooth: 25,
          thumbnail: 'https://uploads-ssl.webflow.com/61e7a911958c1d3ae12a57a5/61fa10b0519af22aaff559bd_Panoramic%20X-ray.jpg',
          image: 'https://uploads-ssl.webflow.com/61e7a911958c1d3ae12a57a5/61fa10b0519af22aaff559bd_Panoramic%20X-ray.jpg',
          alterations: [],
          comments: [
            {
              date: '01/07/2022',
              comments: [
                {
                  id: 45,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '05/07/2022',
              comments: [
                {
                  id: 67,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '17/07/2022',
              comments: [
                {
                  id: 890,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 4678,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 56768754,
          appointment_id: 5678,
          appointment_date: '18/06/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 22,
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9y_JIqrzms77O_EroXVzXcGYfK7-QI-BTqtBm6u5giDL7pE0LOlvFwnPwUcnZa-Blqq0&usqp=CAU',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9y_JIqrzms77O_EroXVzXcGYfK7-QI-BTqtBm6u5giDL7pE0LOlvFwnPwUcnZa-Blqq0&usqp=CAU',
          alterations: [],
          comments: [
            {
              date: '18/06/2022',
              comments: [
                {
                  id: 576,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 890,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 4678,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '22/06/2022',
              comments: [
                {
                  id: 4678,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/06/2022',
              comments: [
                {
                  id: 890,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 4678,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 9970000,
          appointment_id: 6789,
          appointment_date: '20/Jun/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 13,
          thumbnail: 'https://media.istockphoto.com/photos/panoramic-dental-and-mandible-xray-image-with-intact-teeth-and-four-picture-id1148236832?k=20&m=1148236832&s=612x612&w=0&h=8zhAp6_aMZHNpOmdac_S3clG-snryEvaKk6bHTqFKlI=',
          image: 'https://media.istockphoto.com/photos/panoramic-dental-and-mandible-xray-image-with-intact-teeth-and-four-picture-id1148236832?k=20&m=1148236832&s=612x612&w=0&h=8zhAp6_aMZHNpOmdac_S3clG-snryEvaKk6bHTqFKlI=',
          alterations: [],
          comments: [
            {
              date: '22/06/2022',
              comments: [
                {
                  id: 5678,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/06/2022',
              comments: [
                {
                  id: 789,
                  by: 'Kasujja Muhammed',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '30/06/2022',
              comments: [
                {
                  id: 567,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 67875500,
          appointment_id: 6565,
          appointment_date: '20/May/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 16,
          thumbnail: 'https://www.hawkinsfamilydental.com/wp-content/uploads/2014/08/dental-x-ray.jpg',
          image: 'https://www.hawkinsfamilydental.com/wp-content/uploads/2014/08/dental-x-ray.jpg',
          alterations: [],
          comments: [
            {
              date: '22/05/2022',
              comments: [
                {
                  id: 98545,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/05/2022',
              comments: [
                {
                  id: 6578,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 234,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 78678900,
          appointment_id: 6565,
          appointment_date: '20/May/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 16,
          thumbnail: 'https://previews.123rf.com/images/alexmit/alexmit1610/alexmit161000098/64615358-transparent-scull-and-teeth-xray-view-3d-illustration-.jpg',
          image: 'https://previews.123rf.com/images/alexmit/alexmit1610/alexmit161000098/64615358-transparent-scull-and-teeth-xray-view-3d-illustration-.jpg',
          alterations: [],
          comments: [
            {
              date: '22/05/2022',
              comments: [
                {
                  id: 98545,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/05/2022',
              comments: [
                {
                  id: 6578,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 234,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 867567,
          appointment_id: 6565,
          appointment_date: '20/May/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 16,
          thumbnail: 'https://us.123rf.com/450wm/eraxion/eraxion1304/eraxion130400297/19040341-3d-rendered-illustration-of-the-wisdom-teeth.jpg?ver=6',
          image: 'https://us.123rf.com/450wm/eraxion/eraxion1304/eraxion130400297/19040341-3d-rendered-illustration-of-the-wisdom-teeth.jpg?ver=6',
          alterations: [],
          comments: [
            {
              date: '22/05/2022',
              comments: [
                {
                  id: 98545,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/05/2022',
              comments: [
                {
                  id: 6578,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 234,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
        {
          id: 657880,
          appointment_id: 6565,
          appointment_date: '20/May/2022',
          doctor: 'Muhammed Kasujja',
          tooth: 16,
          thumbnail: 'https://image.shutterstock.com/image-illustration/xray-image-jaw-teeth-one-260nw-331532789.jpg',
          image: 'https://image.shutterstock.com/image-illustration/xray-image-jaw-teeth-one-260nw-331532789.jpg',
          alterations: [],
          comments: [
            {
              date: '22/05/2022',
              comments: [
                {
                  id: 98545,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
            {
              date: '28/05/2022',
              comments: [
                {
                  id: 6578,
                  by: 'Brandon Elijah',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
                {
                  id: 234,
                  by: 'Mariate Ndagire',
                  msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, porro. Non a excepturi, voluptatibus ipsam magnam, eligendi, accusantium',
                },
              ],
            },
          ],
        },
      ];

      return { success: true, data, message: null };
    } catch (err) {
      return { success: false, data: null, message: `${err}` };
    }
  }
}

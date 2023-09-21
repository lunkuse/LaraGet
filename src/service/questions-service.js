import axios from '../axios'
export default class AppointmentsService {
  static async fetchQuestions() {
    try {
      const response = await axios.get('/v2/questions/all/v2')
      console.log(
        'data response response?.data?.status',
        response?.data?.payload
      )

      return {
        success: response.data.status,
        data: response.data.payload,
        message: 'questions loaded'
      }
    } catch (err) {
      return { success: false, data: {}, message: `${err}` }
    }
  }

  static async answerQuestions(data) {
    try {
      console.log('data payload answer questions', data)
      const response = await axios.post('/v2/answers/save', data)
      // let data = response.data;
      console.log(
        'data response answer questions',
        response?.data?.message,
        response?.data?.status
      )

      return {
        status: response?.data?.status,
        data: response?.data?.payload,
        message: response?.data?.error
      }
    } catch (err) {
      return { status: false, data: {}, message: `${err}` }
    }
  }
}

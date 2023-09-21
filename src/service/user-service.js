import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost/mfi-v2/public/client/'

class UserService {
  sendVerificationEmail() {
    return axios.get(API_URL + 'send_verification', { headers: authHeader() })
  }

  getUserData() {
    return axios.get(API_URL + 'user', { headers: authHeader() })
  }

  async updateProfile(user) {
    return await axios
      .post(API_URL + 'clientProfile', user, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        if (response.data && Object.prototype.hasOwnProperty.call(response.data, 'data')) {
          const deviceStore = JSON.parse(localStorage.getItem('user'))
          const userData = response.data.data
          deviceStore.user = { ...deviceStore.user, ...userData }
          // // Save credentials again to update user details
          localStorage.removeItem('user')
          localStorage.setItem('user', JSON.stringify(deviceStore))
        }

        return response
      })
  }

  updatePassword(user) {
    return axios.put(API_URL + 'customers', user).then((response) => {
      if (response.data === true) {
        // Remove user
        localStorage.removeItem('user')
      }

      return response
    })
  }

  uploadFile(formData) {
    return axios.post(API_URL + 'kyc', formData, {
      headers: {
        ...authHeader(),
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  getKYC(data) {
    return axios.get(API_URL + 'kyc', { headers: authHeader(), params: data })
  }
}

export default new UserService()

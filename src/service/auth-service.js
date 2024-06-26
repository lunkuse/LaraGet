import axios from "../axios";
import { useLocalStorage } from "./local-starage-service";
import store from "../store/index.js";
class AuthService {
  login(user) {
    return axios
      .post("auth/login", {
        email: user.identifier,
        password: user.password,
      })
      .then((response) => {
        console.log(
          "service1 login: current lang",
          localStorage.getItem("lang")
        );
        console.log("response.status check", response.data.status);
        if (response.data.status === "success") {
          console.log("service2 login: current lang", response.data.data);

          localStorage.setItem('user', JSON.stringify(response.data.data))
          // localStorage.setItem('userID', user?.id)
          // localStorage.setItem('facilityID', user?.facility_id)
          // const { patient, expires_in, token } = response.data.payload
          // const { saveSession } = useLocalStorage()
          // saveSession(patient, token, expires_in)
          return response.data;
        } else if (response.data.status === false) {
          console.log("login failed else", response.data);
          return response.data;
        }
        else if (response.data.status === "error") {
          console.log("login failed else", response?.message);
          return response.data;
        }

        throw response.data.error;
      });
  }

  logout() {

    useLocalStorage().clearSession();
  }

  register(user) {
    console.log("user to register", user);
    // return axios.post(API_URL + 'register', {
    return axios
      .post("auth/signup", {
        firstname: user?.firstName,
        lastname: user?.lastName,
        email: user?.email,
        password: user?.password,
        DOB: user?.birthDate,
        Id_number: user?.idNumber,
        country: user?.country,
        phone_number: user?.phone_number,
        gender: user?.gender,
        user_Type:"vendor",
        city:user?.city,
        business_name:user?.business_name,
        account_number:user?.business_account,
        business_documents: [
          "https://media.istockphoto.com/id/1434947710/photo/businessman-headphones-and-laptop-webinar-in-office-with-coffee-on-table-video-call-or.jpg?s=1024x1024&w=is&k=20&c=NvC5p29pg1jBXw-IEzCTYg3Mv1A11k8BGVFqRw-DCDk=",
          "https://media.istockphoto.com/id/1434947710/photo/businessman-headphones-and-laptop-webinar-in-office-with-coffee-on-table-video-call-or.jpg?s=1024x1024&w=is&k=20&c=NvC5p29pg1jBXw-IEzCTYg3Mv1A11k8BGVFqRw-DCDk=",
          "https://media.istockphoto.com/id/1434947710/photo/businessman-headphones-and-laptop-webinar-in-office-with-coffee-on-table-video-call-or.jpg?s=1024x1024&w=is&k=20&c=NvC5p29pg1jBXw-IEzCTYg3Mv1A11k8BGVFqRw-DCDk="
        ],

      })
      .then((response) => {
        console.log("response.status check", response);
        if (response.data.status === "success") {
          return response.data;
        }
        else if (response.data.status === false) {
          console.log("register failed else", response.data);
          return response.data;
        }
        throw response.data.error;
      });
  }

  verifyPhoneNumber(userId, data) {
    const token = localStorage.getItem("token");
    return axios
      .post("/phoneVerification/" + userId, data, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
          "X-Requested-With": "XMLHttpRequest",
        },
      })
      .then((response) => {
        const res = response.data;
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        return { success: res.success, data: res.data, message: res.message };
      });
  }

  // verifyEmail(data) {
  //   console.log("token data", data)
  //   let res = axios
  //     .post('patients/auth/2fa' , data)
  //     .then(response => {
  //       const res = response.data
  //       console.log('coded data', res)
  //       const {user, expires_in, token } = response.data.payload
  //       const { saveSession } = useLocalStorage()
  //       saveSession(user, token, expires_in)
  //       // localStorage.setItem('user', JSON.stringify(response.data.data.user))
  //       // this.$store.commit('auth/update', { user: data, isUpdate: true })
  //       return { success: res.status, data: res.payload, message: res.message }
  //     })
  //     return res
  // }

  verifyEmail(data) {
    return axios.post("patients/auth/2fa", data).then((response) => {
      if (response.data.status === true) {
        console.log("code login success", response.data);
        const { user, expires_in, token } = response.data.payload;
        const { saveSession } = useLocalStorage();
        saveSession(user, token, expires_in);
        return response.data;
      } else if (response.data.status === false) {
        console.log("login failed else", response.data);
        return response.data;
      }
      throw response.data.error;
    });
  }
}

export default new AuthService();

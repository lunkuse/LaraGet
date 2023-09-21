import axios from "../axios";
import { useLocalStorage } from "./local-starage-service";
import store from "../store/index.js";
class AuthService {
  login(user) {
    return axios
      .post("patients/auth/login", {
        identifier: user.identifier,
        password: user.password,
      })
      .then((response) => {
        console.log(
          "service1 login: current lang",
          localStorage.getItem("lang")
        );
        console.log("response.status check", response);
        if (response.data.status === true) {
          console.log("service2 login: current lang", response.data.payload);
          // const { patient, expires_in, token } = response.data.payload
          // const { saveSession } = useLocalStorage()
          // saveSession(patient, token, expires_in)
          return response.data;
        } else if (response.data.status === false) {
          console.log("login failed else", response.data);
          return response.data;
        }
        throw response.data.error;
      });
  }

  logout() {
    store.mutations.RESET_STATE(store.allquestions.logoutQuestions);
    useLocalStorage().clearSession();
  }

  register(user) {
    console.log("user to register", user);
    // return axios.post(API_URL + 'register', {
    return axios
      .post("patients/auth/register", {
        firstName: user?.firstName,
        middleName: user?.middleName,
        lastName: user?.lastName,
        patientPhone: user?.patientPhone,
        BSN: user?.BSN,
        email: user?.email,
        password: user?.password,
        password_confirmation: user?.password_confirmation,
        homePhone: user?.homePhone,
        secretNumber: user?.secretNumber,
        privateNumber: user?.privateNumber,
        birthDate: user?.birthDate,
        maritalStatus: user?.maritalStatus,
        is_disabled: user?.is_disabled,
        gender: user?.gender,
        address: user.address,
        street: user.street,
        nationality: user?.nationality,
        country: user?.country,
        countryCode: user?.countryCode,
        city: user?.city,
        province: user?.province,
        ext: user?.ext,
        mobileNumber: user?.mobileNumber,
        telephoneNumber: user?.telephoneNumber,
        fillIfNotFilled: user?.fillIfNotFilled,
        guardianName: user?.guardianName,
        guardianType: user?.guardianType,
        street: user?.street,
        municipality: user?.municipality,

        houseNumber: user?.houseNumber,
        postalCode: user?.postalCode,
        patientInsurer: user?.patientInsurer,
        insuranceUzoviCode: user?.insuranceUzoviCode,

        insurancePolicyNumber: user?.insurancePolicyNumber,
        additionalInsurance: user?.additionalInsurance,
        additionalInsurancePolicyNo: user?.additionalInsurancePolicyNo,
     
        documentType: user?.documentType,
        documentNumber: user?.documentNumber,

        countryOfBirth: user?.countryOfBirth,
        placeOfBirth: user?.placeOfBirth,
        // firstName: user.firstName,
        // lastName: user.lastName,
        // phone: user.phone,
        // address: user.address,
        // email: user.email,
        // birthDate: user.birthDate,
        // password: user.password,
        // password_confirmation: user.password_confirmation,
        // gender: user.gender,
        // additionalInsurance:user.additionalInsurance,
        // documentType:user.documentType,
        // documentNumber:user.documentNumber
      })
      .then((response) => {
        console.log("response.status check", response);
        if (response.data.status === true) {
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

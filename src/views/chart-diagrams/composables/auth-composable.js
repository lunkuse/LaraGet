/* eslint-disable semi */
/* eslint-disable padded-blocks */
/* eslint-disable brace-style */
/* eslint-disable no-trailing-spaces */

import { onMounted, provide, ref, toRaw } from "vue";
import router from "@/router";
import customAxios from "./custom-axios";

export default function authFunctionality() {
  const authenticatedUser = ref(null);
  const userRoles = ref(null);
  const userPrmissions = ref(null);
  const compoToken = ref(null);
  const auth = ref(false);

  onMounted(() => {
    const storedAuth =
      sessionStorage.getItem("dentalSoftAuth") === "true" ? true : false;

    if (storedAuth) {
      authenticatedUser.value = JSON.parse(
        sessionStorage.getItem("dentalSoftUser")
      );
      compoToken.value = sessionStorage.getItem("dentalSoftToken");
      auth.value = storedAuth;
      // console.log('user token', sessionStorage.getItem('dentalSoftToken'))
    }
  });

  const credentials = ref({
    email: null,
    password: null,
  });

  const loginLoader = ref(false);
  const updateLoginLoader = (value) => (loginLoader.value = value);

  const login = () => {
    loginLoader.value = true;

    customAxios
      .post("v1/auth/login", credentials.value)
      .then((response) => {
        // console.log(response);
        const { data } = response;

        const { payload } = data;

        const { user, token } = payload;

        authenticatedUser.value = user;
        compoToken.value = token;
        userRoles.value = toRaw(user.roles.map((role) => role.name));
        userPrmissions.value = toRaw(
          user.permissions.map((permission) => permission.name)
        );
        console.log("roles", userRoles.value);
        console.log(userPrmissions.value);

        sessionStorage.setItem("dentalSoftUser", JSON.stringify(user));
        sessionStorage.setItem("UserRoles", JSON.stringify(userRoles.value));
        sessionStorage.setItem(
          "UserPermissions",
          JSON.stringify(userPrmissions.value)
        );
        sessionStorage.setItem("dentalSoftToken", token);
        sessionStorage.setItem("dentalSoftAuth", true);
        auth.value = true;
        router.push("/");
      })
      .finally(() => (loginLoader.value = false));
  };

  const logout = () => {
    customAxios.post("v1/auth/logout").then(() => {
      sessionStorage.removeItem("dentalSoftUser");
      sessionStorage.removeItem("dentalSoftToken");
      sessionStorage.removeItem("UserRoles");
      sessionStorage.removeItem("UserPermissions");
      sessionStorage.removeItem("dentalSoftAuth");

      authenticatedUser.value = null;
      compoToken.value = null;
      auth.value = null;
      credentials.value.email = null;
      credentials.value.password = null;
      router.push("/login");
    });
  };

  provide("credentials", credentials);
  provide("loginLoader", loginLoader);
  provide("login", login);
  provide("user", authenticatedUser);
  provide("token", compoToken);
  provide("logout", logout);
  provide("updateLoginLoader", updateLoginLoader);
  return {
    loginLoader,
    credentials,
    login,
    logout,
  };
}

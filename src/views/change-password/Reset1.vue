<template>
  <div class="forgot">
    <div class="container">
      <h2 class="loginText">DentalSoft</h2>
      <div class="custom-card">
        <div class="card-body">
          <form class="form" action="#" method="POST">
            <div class="form-group">
              <input name="email" class="form-control" placeholder="Email" type="email" id="email" />
            </div>
            <!-- form-group// -->
            <div class="form-group">
              <Button label="RESET" class="signin-button" />
            </div>
          </form>
          <div class="d-block text-center pt-1 forgotPassText">
            Go to <router-link to="/login">Login</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/buttons/Button.vue';

export default {
  components: {
    Button,
  },
};
</script>

<style scoped>
.custom-card {
  transition: all 200ms ease-in-out !important;
  position: relative;
  background: #fff4ef;
  box-shadow: 5px 5px 15px rgba(0,0,0, .05),-5px -5px 15px rgba(0,0,0, .05) !important;
}
.custom-card:hover {
  margin-top: -8px !important;
  box-shadow: 5px 5px 15px rgba(0,0,0, .15), -5px -5px 15px rgba(0,0,0, .00);
}
.signin-button {
  margin-top: 15px;
  padding: 10px 0px;
}
.forgot {
  background-image: url("../../assets/images/login.png");
  background-size: cover;
  position: fixed;
  height: 100%;
  width: 100%;
}

.container {
  width: 480px !important;
  height: auto !important;

  padding-top: 15%;
  position: relative;
  align-items: center !important;
  margin-bottom: -5%;
}

.form-group {
  width: 320px;
  justify-self: center !important;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center !important;
}

.form-control {
  height: 48px;
}

#email {
  margin-top: 10px;

  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
}

#password {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}

.btn {
  background-color: #ff6f00 !important;
  width: 320px !important ;
  height: 48px;
  margin-top: 22px;
  color: white !important;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif !important;
}

.loginText {
  text-align: center;
  font-size: 40px;
  font-weight: bold;
  color: #ff6f00;
}

.forgotPassText {
  text-align: center;
  font-size: 16px;
  /* font-weight: bold; */
  margin-top: 16px;
  color: #ff6f00;
  text-decoration: none;
}

#loginBackground {
  background: no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>

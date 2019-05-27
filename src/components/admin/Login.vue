<template>
  <b-container class="[ mt-2 ][ vh100 ]">
    <b-row class="[ pt-4 ]" align-h="center">
      <b-col cols="12" md="5" class="[ m-2 ]">
        <b-form @submit.prevent="loginSubmit">
          <div class="error" v-if="showError">{{ form.errorMessage }}</div>
          <b-form-group id="ig-1" label="Username:" label-for="username">
            <b-form-input
              v-model="form.username"
              type="text"
              placeholder="Enter Username"
              name="username"
              id="username"
              :state="state"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="ig-2" label="Password:" label-for="password">
            <b-form-input
              v-model="form.password"
              type="password"
              placeholder="Enter Password"
              name="password"
              id="password"
              :state="state"
            ></b-form-input>
          </b-form-group>
          <div class="[ text-center ][ mt-4 ]">
            <b-button type="submit" variant="primary" style="width: 75%;"
              >Login</b-button
            >
          </div>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Login",

  data() {
    return {
      state: null,
      showError: false,
      form: {
        username: "",
        password: "",
        errorMessage: ""
      }
    };
  },

  methods: {
    loginSubmit() {
      if (
        this.form.username !== localStorage.getItem("username") ||
        this.form.password !== localStorage.getItem("password")
      ) {
        this.form.errorMessage = "Please enter correct login details!";
        this.showError = true;
        this.form.username = "";
        this.form.password = "";
        this.state = false;
      } else {
        this.showError = false;
        this.errorMessage = "";
        this.state = true;

        const sessionID = "numbersForSure123456789";
        sessionStorage.setItem("sessionID", sessionID);
        this.$router.push("/moreAdmin/");
      }
    }
  }
};
</script>

<style scoped>
.error {
  color: red;
}
</style>

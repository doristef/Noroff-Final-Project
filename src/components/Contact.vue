<template>
  <b-container class="[ mt-2 ][ vh100 ]">
    <b-row class="[ pt-4 ]">
      <b-col align-self="center" class="[ m-2 ]">
        <div v-if="form.errors.length">
          <ul>
            <li v-for="error in form.errors" :key="error">{{ error }}</li>
          </ul>
        </div>
        <b-form
          @submit.prevent="onSubmit"
          @reset="onReset"
          ref="form"
          method="POST"
          action="http://localhost/holidaze/server/contact-success.php"
        >
          <b-form-group
            id="input-group-1"
            label="Email address:"
            label-for="email"
            description="We'll never share your email with anyone else."
          >
            <b-form-input
              v-model="form.email"
              type="email"
              required
              placeholder="Enter email"
              name="email"
              id="email"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Your Name:"
            label-for="clientName"
          >
            <b-form-input
              v-model="form.name"
              required
              placeholder="Enter name"
              name="clientName"
              id="clientName"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-3" label="Message:" label-for="message">
            <b-form-textarea
              name="message"
              id="message"
              required
              v-model="form.message"
              placeholder="Enter something..."
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </b-form-group>

          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="warning" class="[ ml-2 ]"
            >Reset</b-button
          >
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
/* Regex from http://emailregex.com/ */

const emailRegex = RegExp(
  // eslint-disable-next-line
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}.[0-9]{1,3}\.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

/* Regex from doristef.me  */
const nameRegex = /^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,0-9]{2,}$/; // Only check for characters that are not allowed

export default {
  name: "contactUs",
  components: {},
  data() {
    return {
      form: {
        email: null,
        name: null,
        message: null,
        errors: []
      }
    };
  },
  methods: {
    onSubmit() {
      if (
        !nameRegex.test(this.form.name) ||
        !emailRegex.test(this.form.email) ||
        this.form.message.length < 20
      ) {
        this.form.errors = [];
        if (!nameRegex.test(this.form.name)) {
          this.form.errors.push("Invalid characters in name.");
        }
        if (this.form.email !== null && !emailRegex.test(this.form.email)) {
          this.form.errors.push("Incorrect format of email.");
        }
        if (this.form.message.length < 20) {
          this.form.errors.push("Message need at least 20 characters.");
        }
      } else {
        this.form.errors = [];
        return this.$refs.form.submit();
      }
    },
    onReset() {
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.message = "";
    }
  }
};
</script>

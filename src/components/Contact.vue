<template>
  <b-container class="[ mt-2 ][ vh100 ]">
    <b-row class="[ pt-4 ]">
      <b-col align-self="center" class="[ m-2 ]">
        <div v-if="form.errors.length" class="[ alert alert-danger ]">
          <ul>
            <li v-for="error in form.errors" :key="error">{{ error }}</li>
          </ul>
        </div>
        <b-form @submit.prevent="onSubmit" @reset="onReset">
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
              :state="form.errorEmail"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Your Name:"
            label-for="clientName"
          >
            <b-form-input
              v-model="form.clientName"
              required
              placeholder="Enter name"
              name="clientName"
              id="clientName"
              :state="form.errorName"
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
              :state="form.errorMessage"
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
import axios from "axios";
const postUrl =
  "http://doristef.me/semester4/FinalProject/server/contact-success.php";

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
        clientName: null,
        message: null,
        errors: [],
        errorName: null,
        errorEmail: null,
        errorMessage: null
      }
    };
  },
  methods: {
    // FORM DATA
    formData: data => {
      const form = new FormData();
      for (const key in data) {
        form.append(key, data[key]);
      }
      return form;
    }, // formData END
    // POST FORM
    postForm: function() {
      let data = this.formData(this.form);
      axios
        .post(postUrl, data)
        .catch(e => {
          this.form.errors.push(e);
        })
        .finally(() => {
          return this.$router.push("/thankyou/");
        });
    }, // postForm END
    // ON SUBMIT
    onSubmit() {
      if (
        !nameRegex.test(this.form.clientName) ||
        !emailRegex.test(this.form.email) ||
        this.form.message.length < 20
      ) {
        this.errorReset(true);
        if (!nameRegex.test(this.form.clientName)) {
          this.form.errors.push("Invalid characters in name.");
          this.form.errorName = false;
        }
        if (this.form.email !== null && !emailRegex.test(this.form.email)) {
          this.form.errors.push("Incorrect format of email.");
          this.form.errorEmail = false;
        }
        if (this.form.message.length < 20) {
          this.form.errors.push("Message need at least 20 characters.");
          this.form.errorMessage = false;
        }
      } else {
        this.errorReset();
        return this.postForm();
      }
    }, // onSubmit END
    // RESET ERRORS
    errorReset(value = null) {
      return (
        (this.form.errors = []),
        (this.form.errorName = value),
        (this.form.errorEmail = value),
        (this.form.errorMessage = value)
      );
    }, // errorReset END
    // ON RESET
    onReset() {
      // Reset our form values
      this.form.email = "";
      this.form.clientName = "";
      this.form.message = "";
      this.errorReset();
    } // onReset END
  } // methods END
};
</script>

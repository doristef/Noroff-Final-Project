<template>
  <b-container class="[ mt-2 ][ vh100 ]">
    <b-row class="[ pt-4 ]">
      <b-col align-self="center" class="[ m-2 ]">
        <b-form @submit="onSubmit" @reset="onReset" method="POST" action='http://localhost/holidaze/server/contact-success.php'>
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
              name="email" id="email"
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
              name="message" id="message"
              v-model="form.message"
              placeholder="Enter something..."
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </b-form-group>

          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="warning" class="[ ml-2 ]">Reset </b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "contactUs",
  components: {},
  data() {
    return {
      form: {
        email: "",
        name: "",
        message: ""
      }
    };
  },
  methods: {
    onSubmit(evt) {
      alert(JSON.stringify(this.form));
      
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.message = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>

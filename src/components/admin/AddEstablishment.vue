<template>
  <b-container>
    <b-row align-h="center">
      <b-col cols="12" md="8" align-self="center" class="[ m-2 ]">
        <h1 class="[ card-hotel-header ][ mt-5 mb-4 ]">Add a new Establishment</h1>
      </b-col>
    </b-row>
    <b-row class="[ mb-5 pb150 ]" align-h="center">
      <b-col cols="12" md="8" align-self="center" class="[ m-2 ]">
        <div v-if="form.errors.length">
          <ul>
            <li v-for="error in form.errors" :key="error">{{ error }}</li>
          </ul>
        </div>
        <b-form
          ref="form"
          @submit.prevent="onSubmit"
          @reset="onReset"
          method="POST"
          action="http://doristef.me/semester4/FinalProject/server/enquiry-success.php"
        >
          <b-form-group
            id="email"
            label="Email address:"
            label-for="input-1"
            description="We'll never share your email with anyone else."
          >
            <b-form-input
              name="email"
              id="email"
              v-model="form.email"
              type="email"
              required
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Your Name:"
            label-for="clientName"
          >
            <b-form-input
              name="clientName"
              id="clientName"
              v-model="form.name"
              required
              placeholder="Enter name"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            label="Check In / Check Out:"
            label-for="input-3"
          >
            <input type="hidden" name="checkin" :value="form.checkin" />
            <input type="hidden" name="checkout" :value="form.checkout" />
            <input type="hidden" name="establishment" :value="form.establishment" />
            <HotelDatePicker
              @confirm="applyDate"
              @reset="cancelDate"
              required
              selectForward:true
              seperator="to"
              minNights="1"
              format="DD-MM-YYYY"
            />
          </b-form-group>

          <b-button type="submit" variant="primary">Send Enquiry</b-button>
          <b-button type="reset" variant="warning" class="[ ml-2 ]"
            >Reset</b-button
          >
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import HotelDatePicker from "@northwalker/vue-hotel-datepicker";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
/* Regex from http://emailregex.com/ */
const emailRegex = RegExp(
  // eslint-disable-next-line
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}.[0-9]{1,3}\.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

/* Regex from doristef.me  */
const nameRegex = /^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,0-9]{2,}$/; // Only check for characters that are not allowed

export default {
  name: "establishments",
  components: { FontAwesomeIcon, HotelDatePicker },
  props: ["establishments"],
  data() {
    return {
      form: {
        name: "",
        email: "",
        checkin: "",
        checkout: "",
        establishment: "",
        errors: []
      }
    };
  },
  computed: {
    filteredId() {
      return this.establishments.filter(e => e.id === this.$route.params.id);
    }
  },
  methods: {
    applyDate(result) {
      this.form.checkin = result.start;
      this.form.checkout = result.end;
    },
    cancelDate() {
      this.form.checkin = "";
      this.form.checkout = "";
    },
    onSubmit() {
      if (
        !nameRegex.test(this.form.name) ||
        !emailRegex.test(this.form.email) ||
        this.form.checkin === "" ||
        this.form.checkout === ""
      ) {
        this.form.errors = [];
        if (!nameRegex.test(this.form.name)) {
          this.form.errors.push("Invalid characters in name.");
        }
        if (this.form.email !== null && !emailRegex.test(this.form.email)) {
          this.form.errors.push("Incorrect format of email.");
        }
        if (this.form.checkin === "" || this.form.checkout === "") {
          this.form.errors.push("Checkin / Checkout dates required.");
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
      this.form.checkin = "";
      this.form.checkout = "";
    }
  },
  mounted() {
    console.log();
  }
};
</script>

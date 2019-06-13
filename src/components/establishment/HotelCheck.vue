<template>
  <b-container>
    <b-row>
      <b-button
        variant="outline-primary"
        class="[ mt-2 ml-3 ml-md-1 ]"
        @click="$router.go(-1)"
        >Back</b-button
      >
    </b-row>
    <b-row align-h="center">
      <b-col cols="12" md="8" align-self="center" class="[ m-2 ]">
        <h1 class="[ card-hotel-header ][ my-2 ]">Send Enquiry for:</h1>
        <div v-for="establishment in filteredId" :key="establishment.id">
          <h5 class="[ card-hotel-subheader ][ my-2 ml-3 ]">
            {{ establishment.establishmentName }}
          </h5>
        </div>
      </b-col>
    </b-row>
    <b-row class="[ mb-5 ]" align-h="center">
      <b-col cols="12" md="8" align-self="center" class="[ m-2 ]">
        <div v-if="form.errors.length">
          <ul>
            <li v-for="error in form.errors" :key="error">{{ error }}</li>
          </ul>
        </div>
        <b-form @submit.prevent="onSubmit" @reset="onReset">
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
              v-model="form.clientName"
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
            <input
              type="hidden"
              name="establishment"
              :value="form.establishment"
            />
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
    <!--- CARDS --->
    <b-row align-h="center" class="[ my-3 ][ pb150 ]">
      <b-card
        no-body
        class="[ overflow-hidden ][ m-2 ]"
        style="max-width: 700px;"
        v-for="establishment in filteredId"
        :key="establishment.id"
      >
        <router-link :to="'/accomodations/' + establishment.id">
          <b-row no-gutters>
            <b-col md="6">
              <b-card-img
                :src="establishment.imageUrl"
                :alt="establishment.establishmentName"
                class="rounded-0"
              ></b-card-img>
            </b-col>
            <b-col md="6">
              <b-card-title class="[ card-hotel-header ][ ml-2 mt-2 ]">
                {{
                  (form.establishment = establishment.establishmentName)
                }}</b-card-title
              >

              <b-card-body align-v="bottom">
                <p class=" d-none d-md-block ">
                  {{ establishment.description }}
                </p>
                <font-awesome-icon
                  icon="user-alt"
                  size="lg"
                  class="[ ml-2 mr-2 ]"
                />
                <span class="[ card-footer-text ]">{{
                  establishment.maxGuests
                }}</span>

                <div class="[ float-right ][ mr-2 ]">
                  <font-awesome-icon
                    icon="dollar-sign"
                    size="lg"
                    class="[ mr-2 ]"
                  />
                  <span class="[ card-footer-text ]">{{
                    establishment.price
                  }}</span>
                </div>
              </b-card-body>
            </b-col>
          </b-row>
        </router-link>
      </b-card>
    </b-row>
    <!--- CARDS END -->
  </b-container>
</template>

<script>
import HotelDatePicker from "@northwalker/vue-hotel-datepicker";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import axios from "axios";
import { URL } from "./../../../server.config";
const postUrl = URL + "enquiry-success.php";

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
        clientName: "",
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
    // APPLY DATE
    applyDate(result) {
      this.form.checkin = result.start;
      this.form.checkout = result.end;
    }, // applyDate END
    // CANCEL DATE
    cancelDate() {
      this.form.checkin = "";
      this.form.checkout = "";
    }, // cancelDate END
    // ON SUBMIT
    onSubmit() {
      if (
        !nameRegex.test(this.form.clientName) ||
        !emailRegex.test(this.form.email) ||
        this.form.checkin === "" ||
        this.form.checkout === ""
      ) {
        this.form.errors = [];
        if (!nameRegex.test(this.form.clientName)) {
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
        return this.postForm();
      }
    }, // onSubmit END
    // ON RESET
    onReset() {
      // Reset our form values
      this.form.email = "";
      this.form.clientName = "";
      this.form.checkin = "";
      this.form.checkout = "";
    } // onReset END
  } // method END
};
</script>

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
      <!--- CARDS --->
      <b-card
        no-body
        class="[ overflow-hidden ][ m-3 ]"
        style="max-width: 700px;"
        v-for="establishment in filteredId"
        :key="establishment.id"
      >
        <b-row no-gutters>
          <b-col md="6">
            <b-card-img
              :src="establishment.imageUrl"
              :alt="establishment.establishmentName"
              class="[ rounded-0 ][ card-img-side ]"
            ></b-card-img>
          </b-col>
          <b-col md="6">
            <b-card-title class="[ card-hotel-header ][ ml-2 mt-2 ]">
              {{ establishment.establishmentName }}</b-card-title
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
      </b-card>

      <!--- CARDS END -->
    </b-row>
    <b-row align-h="center">
      <b-col cols="12" md="8" align-self="center" class="[ m-2 ]">
        <h1 class="[ card-hotel-header ][ mt-5 mb-4 ]">Send Enquiry</h1>
      </b-col>
    </b-row>
    <b-row class="[ mb-5 pb150 ]" align-h="center">
      <b-col cols="12" md="8" align-self="center" class="[ m-2 ]">
        <b-form
          ref="form"
          @submit.prevent="onSubmit"
          @reset="onReset"
          method="POST"
          action="http://localhost/holidaze/server/enquiry-success.php"
        >
          <input
            type="hidden"
            name="establishment"
            :value="this.$route.params.id"
          />
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
            <span v-if="form.error.check">ERROR</span>
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
          <b-button
            type="reset"
            variant="warning"
            class="[ text-white ][ ml-2 ]"
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
        error: {
          check: false
        }
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
    toFormData: function(obj) {
      let formData = new FormData();
      for (let key in obj) {
        formData.append(key, obj[key]);
      }
      return formData;
    },
    onSubmit() {
      if (this.form.checkin === "" || this.form.checkout === "") {
        return (this.form.error.check = true);
      } else {
        this.form.error.check = false;
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
  }
};
</script>

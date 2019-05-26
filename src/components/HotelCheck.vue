<template>
  <b-container class="[ mt-2 ][ vh100 ]">
    <b-row>
      <b-button
        variant="outline-primary"
        class="[ mt-2 ]"
        @click="$router.go(-1)"
        >Back</b-button
      >
    </b-row>
    <b-row align-h="center">
      <!--- CARDS --->
      <b-card
        v-for="establishment in filteredId"
        :key="establishment.id"
        :title="establishment.establishmentName"
        :img-src="establishment.imageUrl"
        :img-alt="establishment.establishmentName"
        img-top
        tag="article"
        class="[ card-hotel ][ m-4 ]"
      >
        <b-card-sub-title>
          {{ establishment.establishmentEmail }}
        </b-card-sub-title>

        <template slot="footer">
          <font-awesome-icon icon="user-alt" size="lg" class="[ ml-2 mr-2 ]" />
          <span class="[ card-footer-text ]">{{
            establishment.maxGuests
          }}</span>

          <div class="[ float-right ][ mr-2 ]">
            <font-awesome-icon icon="dollar-sign" size="lg" class="[ mr-2 ]" />
            <span class="[ card-footer-text ]">{{ establishment.price }}</span>
          </div>
        </template>
      </b-card>
      <!--- CARDS END -->
    </b-row>

    <b-row>
      <b-col align-self="center" class="[ m-2 ]">
        <b-form @submit.prevent="onSubmit" @reset="onReset">
          <b-form-group
            id="input-group-1"
            label="Email address:"
            label-for="input-1"
            description="We'll never share your email with anyone else."
          >
            <b-form-input
              id="input-1"
              v-model="form.email"
              type="email"
              required
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Your Name:"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
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
        checkout: ""
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
      if (this.form.checkin === "" || this.form.checkout === "") {
        return;
      } else {
        console.log("sent");
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

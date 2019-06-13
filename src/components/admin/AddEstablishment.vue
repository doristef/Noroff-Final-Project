<template>
  <b-container>
    <b-row align-h="center" class="[ admin-splitter ][ mb-2 ]">
      <b-col align-self="center" class="[ mt-2 mb-1 ][ text-center ]">
        <h3 class="[ admin-splitter-heading ]">
          Add a New Establishment
        </h3>
      </b-col>
    </b-row>
    <b-row class="[ mb-5 pb150 ]" align-h="center">
      <b-col cols="12" md="8" align-self="center" class="[ m-2 ]">
        <div v-if="form.errors.length" class="[ alert alert-danger ]">
          <ul>
            <li v-for="(error, i) in form.errors" :key="i">{{ error }}</li>
          </ul>
        </div>
        <b-form @submit.prevent="onSubmit" @reset="onReset">
          <b-form-group
            label="Establishment Name:"
            label-for="establishmentName"
          >
            <b-form-input
              name="establishmentName"
              id="establishmentName"
              v-model="form.establishmentName"
              type="text"
              required
              placeholder="Name of Establishment"
              :state="form.error.name"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="Email address:"
            label-for="email"
            description="Direct email to the establishment."
          >
            <b-form-input
              name="establishmentEmail"
              id="establishmentEmail"
              v-model="form.establishmentEmail"
              type="email"
              required
              placeholder="Enter email"
              :state="form.error.email"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Image URL:" label-for="imageUrl">
            <b-form-input
              name="imageUrl"
              id="imageUrl"
              v-model="form.imageUrl"
              type="url"
              required
              placeholder="Enter URL to image"
              :state="form.error.image"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="Price per Night:"
            label-for="price"
            class="[ d-inline-block ][ ml-2  mr-md-4 ]"
          >
            <b-input-group>
              <b-input-group-text slot="prepend">
                <font-awesome-icon icon="dollar-sign" />
              </b-input-group-text>
              <b-form-input
                name="price"
                id="price"
                v-model="form.price"
                type="number"
                style="max-width: 100px;"
                required
                step="0.01"
                placeholder="Price"
                :state="form.error.price"
              ></b-form-input>
            </b-input-group>
          </b-form-group>

          <b-form-group
            label="Maximum Guests:"
            label-for="maxGuests"
            class="[ d-inline-block ][ ml-2 ml-md-4 ]"
          >
            <b-input-group>
              <b-input-group-text slot="prepend">
                <font-awesome-icon icon="user-alt" />
              </b-input-group-text>
              <b-form-input
                name="maxGuests"
                id="maxGuests"
                v-model="form.maxGuests"
                type="number"
                required
                placeholder="Guests"
                style="max-width: 100px;"
                :state="form.error.guests"
              ></b-form-input>
            </b-input-group>
          </b-form-group>

          <b-form-group label="Location:" label-for="googleLat, googleLong">
            <b-input-group style="max-width: 40%;" class="[ ml-2 ]">
              <b-input-group-text slot="append">
                &deg;
              </b-input-group-text>
              <b-form-input
                name="googleLat"
                id="googleLat"
                v-model="form.googleLat"
                type="text"
                required
                placeholder="Latitude Degrees"
                :state="form.error.lat"
              ></b-form-input>
            </b-input-group>
            <b-input-group
              style="max-width: 40%;"
              class="[ ml-2 mt-2 mt-md-3 ]"
            >
              <b-input-group-text slot="append">
                &deg;
              </b-input-group-text>
              <b-form-input
                name="googleLong"
                id="googleLong"
                v-model="form.googleLong"
                type="text"
                required
                placeholder="Longitude Degrees"
                :state="form.error.long"
              ></b-form-input>
            </b-input-group>
          </b-form-group>

          <b-form-group label="Description:" label-for="description">
            <b-form-textarea
              name="description"
              id="description"
              required
              v-model="form.description"
              type="text"
              placeholder="Enter Establishment Description"
              rows="4"
              :state="form.error.description"
            ></b-form-textarea>
          </b-form-group>

          <b-form-group label="Self Catering:" label-for="selfCatering">
            <b-form-radio
              v-model="form.selfCatering"
              name="selfCatering"
              id="true"
              :value="true"
              >Yes</b-form-radio
            >
            <b-form-radio
              v-model="form.selfCatering"
              name="selfCatering"
              id="false"
              :value="false"
              selected
              >No</b-form-radio
            >
          </b-form-group>

          <b-form-group label="ID:" label-for="id">
            <div class="[ admin-bold ]">{{ (form.id = nextId) }}</div>
          </b-form-group>

          <b-button type="submit" variant="primary"
            >Add this New Establishment</b-button
          >
          <b-button type="reset" variant="warning" class="[ ml-2 ]"
            >Reset</b-button
          >
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import axios from "axios";
import { URL } from "./../../../server.config";
const postUrl = URL + "add-establishments-success.php";

/* Regex from http://emailregex.com/ */
const emailRegex = RegExp(
  // eslint-disable-next-line
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}.[0-9]{1,3}\.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export default {
  name: "addestablishment",
  props: ["establishments"],
  components: { FontAwesomeIcon },
  data() {
    return {
      form: {
        id: null,
        establishmentName: "",
        establishmentEmail: "",
        imageUrl: "",
        price: null,
        maxGuests: null,
        googleLat: null,
        googleLong: null,
        description: "",
        selfCatering: false,
        errors: [],
        error: {
          name: null,
          email: null,
          image: null,
          price: null,
          lat: null,
          long: null,
          guests: null,
          description: null
        }
      }
    };
  },
  computed: {
    nextId() {
      return (this.establishments.length + 1).toString();
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
          return this.$router.push("/admin/establishmentadded/" + this.form.id);
        });
    }, // postForm END
    // ON SUBMIT
    onSubmit() {
      /* Lets error check again, if HTML5 error check let something through we dont want! */
      if (
        !emailRegex.test(this.form.establishmentEmail) ||
        isNaN(this.form.maxGuests) ||
        isNaN(this.form.price) ||
        isNaN(this.form.googleLat) ||
        isNaN(this.form.googleLong) ||
        this.form.imageUrl === "" ||
        this.form.establishmentName === "" ||
        this.form.description.length < 15
      ) {
        this.errorReset(true);
        if (this.form.establishmentName === "") {
          this.form.errors.push("Named must be filled out.");
          this.form.error.name = false;
        }
        if (
          this.form.email !== null &&
          !emailRegex.test(this.form.establishmentEmail)
        ) {
          this.form.errors.push("Incorrect format of email.");
          this.form.error.email = false;
        }
        if (this.form.imageUrl === "") {
          this.form.errors.push("Image Url must be filled out.");
          this.form.error.image = false;
        }
        if (isNaN(this.form.price)) {
          this.form.errors.push("Price must be a number.");
          this.form.error.price = false;
        }
        if (isNaN(this.form.googleLat)) {
          this.form.errors.push("Latitude must be a number.");
          this.form.error.lat = false;
        }
        if (isNaN(this.form.googleLong)) {
          this.form.errors.push("Longitude must be a number.");
          this.form.error.long = false;
        }
        if (isNaN(this.form.maxGuests)) {
          this.form.errors.push("Maximum Guests must be a number.");
          this.form.error.guests = false;
        }
        if (this.form.description.length < 15) {
          this.form.errors.push("Description must be at least 15 characters.");
          this.form.error.description = false;
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
        (this.form.error.name = value),
        (this.form.error.email = value),
        (this.form.error.image = value),
        (this.form.error.price = value),
        (this.form.error.lat = value),
        (this.form.error.long = value),
        (this.form.error.guests = value),
        (this.form.error.description = value)
      );
    }, // errorReset END
    // ON RESET
    onReset() {
      // Reset our form values
      this.form.establishmentName = "";
      this.form.establishmentEmail = "";
      this.form.imageUrl = "";
      this.form.price = null;
      this.form.maxGuests = null;
      this.form.googleLat = null;
      this.form.googleLong = null;
      this.form.description = "";
      this.form.selfCatering = false;
      this.errorReset();
    } // onReset END
  }
};
</script>

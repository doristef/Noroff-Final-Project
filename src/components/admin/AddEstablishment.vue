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
        <div v-if="form.errors.length">
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
        errors: []
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
      if (
        !emailRegex.test(this.form.establishmentEmail) ||
        isNaN(this.form.maxGuests) ||
        isNaN(this.form.price) ||
        isNaN(this.form.googleLat) ||
        isNaN(this.form.googleLong) ||
        this.form.imageUrl === "" ||
        this.form.establishmentName === ""
      ) {
        this.form.errors = [];
        if (this.form.establishmentName === "") {
          this.form.errors.push("Named must be filled out.");
        }
        if (
          this.form.email !== null &&
          !emailRegex.test(this.form.establishmentEmail)
        ) {
          this.form.errors.push("Incorrect format of email.");
        }
        if (this.form.imageUrl === "") {
          this.form.errors.push("Image Url must be filled out.");
        }
        if (isNaN(this.form.price)) {
          this.form.errors.push("Price must be a number.");
        }
        if (isNaN(this.form.googleLat)) {
          this.form.errors.push("Latitude must be a number.");
        }
        if (isNaN(this.form.googleLong)) {
          this.form.errors.push("Longitude must be a number.");
        }
        if (isNaN(this.form.maxGuests)) {
          this.form.errors.push("Maximum Guests must be a number.");
        }
      } else {
        this.form.errors = [];
        return this.postForm();
      }
    }, // onSubmit END
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
    } // onReset END
  }
};
</script>

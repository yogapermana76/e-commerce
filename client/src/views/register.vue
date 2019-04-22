<template>
  <div>
    <b-container class="text-left">
      <b-row style="margin-top: 120px">
        <b-col md="4"></b-col>

        <!-- register -->
        <b-col md="4" style="border: 1px solid #ebebe0; border-radius: 15px" class="p-5 shadow">
          <h3 class="text-center mb-3">Register</h3>
          <b-form @submit.prevent="register" @reset="onReset" v-if="show">
            <b-form-group
              id="input-group-1"
              label="Your Name:"
              label-for="name"
            >
              <b-form-input
                id="name" 
                v-model="form.name"
                required
                placeholder="Enter Name"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label="Email address:"
              label-for="email"
              required
              description="We'll never share your email with anyone else."
            >
              <b-form-input
                id="email"
                v-model="form.email"
                type="email"
                required
                placeholder="Enter email"
              ></b-form-input>
            </b-form-group>

            <b-form-group 
              id="input-group-3"
              label="Your Password:"
              label-for="password"
            >
              <b-form-input
                id="password"
                v-model="form.password"
                required
                placeholder="Enter Password"
                type="password"
              ></b-form-input>
            </b-form-group>

            <b-form-group>
              <b-button
                type="reset"
                class="mr-2"
                style="background-color: #FC419C; color: white; border: 1px solid #FC419C"
              >Cancel</b-button>
              <b-button
                type="submit"
                style="background-color: #00ffcc; color: white; border: 1px solid #00ffcc"
              >Register</b-button>
            </b-form-group>

          </b-form>
        </b-col>
        <!-- end of register -->

        <b-col md="4"></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: ""
      },
      show: true
    };
  },
  methods: {
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.name = "";
      this.form.email = "";
      this.form.password = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    register() {
      this.$axios
        .post(`/users/register`, {
          name: this.form.name,
          email: this.form.email,
          password: this.form.password
        })
          .then(({ data }) => {
            console.log(data)
            this.form.name = ''
            this.form.email = ''
            this.form.password = ''
            this.$router.push('/login')
            this.$swal(`Success Register`, "You clicked the button!", "success")
          })
          .catch(err => {
            console.log(err.response)
            this.$swal(`${err.response.data}`, "You clicked the button!", "error")
          })
    }
  }
};
</script>
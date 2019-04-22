<template>
  <div>
    <b-container class="text-left">
      <b-row style="margin-top: 170px">
        <b-col md="4"></b-col>

        <!-- form login -->
        <b-col md="4" style="border: 1px solid #ebebe0; border-radius: 15px" class="p-5 shadow">
          <h3 class="text-center mb-3">Login</h3>
          <b-form @submit.prevent="login" @reset="onReset" v-if="show">
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

            <b-form-group id="input-group-2" label="Your Password:" label-for="input-2">
              <b-form-input
                id="input-2"
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
              >Login</b-button>
            </b-form-group>
          </b-form>
        </b-col>
        <!-- end of form login -->

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
      this.form.email = "";
      this.form.password = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    login() {
      this.$axios.post('/users/login', {
        email: this.form.email,
        password: this.form.password
      })
        .then(({ data }) => {
          const { token, email, id, role } = data
          localStorage.setItem('token', token)
          localStorage.setItem('email', email)
          localStorage.setItem('id', id)
          localStorage.setItem('name', email)
          localStorage.setItem('role', role)
          this.form.email = ''
          this.form.password = ''
          this.$emit('success-login', role)
          this.$router.push('/')
          this.$swal("Success Login!", "You clicked the button!", "success")
        })
        .catch(err => {
          this.form.email = "";
          this.form.password = "";
          console.log(err)
          this.$swal(`${err}`, "You clicked the button!", "error")
        })

    }
  }
};
</script>
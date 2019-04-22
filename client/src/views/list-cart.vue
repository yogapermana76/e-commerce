<template>
  <div>
    <b-container style="margin-top: 100px; color: #B4B2B3">
      <h3 class="mb-4">List On Cart</h3>
      <table class="table shadow">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cart in carts" :key="cart.productId._id">
            <td>{{ cart.productId.name }}</td>
            <td>{{ cart.productId.description }}</td>
            <td>{{ cart.productId.price }}</td>
            <td>{{ cart.quantity }}</td>
            <td>{{ cart.quantity * cart.productId.price }}</td>
            <td>
              <b-img
                v-bind:src="cart.productId.image"
                fluid
                thumbnail
                size="sm"
                style="width: 125px"
              ></b-img>
            </td>
            <td>
              <b-form-group>
                <b-button
                  style="background-color: #00ffcc; color: white; border: 1px solid #00ffcc"
                  size="sm"
                  v-on:click="cancel(cart._id)"
                >Cancel</b-button>
              </b-form-group>
            </td>
          </tr>
        </tbody>
      </table>
    </b-container>
  </div>
</template>

<script>
export default {
  props: ["carts"],
  data() {
    return {
      total: ''
    };
  },
  created() {},
  methods: {
    cancel(id) {
      this.$axios
        .delete(`/carts/${id}`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(() => {
          console.log("successfull deleted");
          this.$emit("success-cancel");
          this.$swal("Success Cancel!", "You clicked the button!", "success");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
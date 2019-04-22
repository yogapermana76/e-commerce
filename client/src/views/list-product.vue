<template>
  <div>
    <b-container style="margin-top: 100px; color: #B4B2B3">
      <h3 class="mb-4">List Product</h3>
      <table class="table shadow">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stok</th>
            <th>Image</th>
            <th style="padding-right: 100px">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product._id">
            <td>{{ product._id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.stock }}</td>
            <td><b-img v-bind:src="product.image" fluid thumbnail size="sm" style="width: 125px"></b-img></td>
            <td>
              <b-form-group>
              <b-button
                class="mr-2"
                style="background-color: #FC419C; color: white; border: 1px solid #FC419C"
                size="sm"
                v-on:click="updateProduct(product._id)"
              >Update</b-button>
              <b-button
                style="background-color: #00ffcc; color: white; border: 1px solid #00ffcc"
                size="sm"
                v-on:click="deleteProduct(product._id)"
              >Delete</b-button>
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
  props: ['products', 'getAllProducts'],
  created() {
    this.getAllProducts
  },
  methods: {
    deleteProduct(id) {
      this.$axios
        .delete(`/products/${id}`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(() => {
          console.log('successfull deleted')
          this.$emit('success-deleted')
          this.$swal(`Success RegisDeter`, "You clicked the button!", "success")
        })
        .catch(err => {
          console.log(err)
        })
    },
    // updateProduct(id) {
    //   this.$axios
    //     .put(`/products/${id}`, {

    //     })
    //     .then(() => {
    //       console.log('success updated')
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // }
  }
};
</script>
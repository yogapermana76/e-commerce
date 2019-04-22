<template>
  <div>
    <b-card
      v-bind:img-src="product.image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-4 shadow"
    >
      <b-card-text style="color: #C5C4C4">
        <p>
          <b>{{ product.name }}</b>
        </p>
        {{ product.description }}
        <br>
        Rp. {{ product.price }}
        <br>
      </b-card-text>

      <center v-if="isLogin">
        <b-button
          href="#"
          style="background-color: #FC419C; color: white; border: 1px solid #FC419C"
          class="mx-1"
          size="sm"
          v-on:click="viewDetail(product._id)"
        >View</b-button>
        <b-button
          href="#"
          style="background-color: #00ffcc; color: white; border: 1px solid #00ffcc"
          size="sm"
          v-on:click="addToCart(userId, product._id)"
        >Add To Cart</b-button>
      </center>
    </b-card>
  </div>
</template>

<script>
export default {
  props: ["isLogin", "product", "userId"],
  methods: {
    addToCart(idUser, idProduct) {
      this.$axios
        .post("/carts", {
          productId: idProduct,
          userId: idUser,
          quantity: '1'
        }, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          console.log(data);
          this.$emit('success-add-cart')
          this.$swal("Success Add To Cart!", "You clicked the button!", "success")
        })
        .catch(err => {
          console.log(err);
        });
    },
    viewDetail(id) {
      // this.$router.push(`/detail-product/${id}`)
      this.$axios
        .get(`/products/${id}`)
        .then(({ data }) => {
          console.log(data);
          this.$emit("view-product", data);
          // this.$router.push('/detail-product/' + id)
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>

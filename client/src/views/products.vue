<template>
  <div>
    <b-container fluid style="margin-top: 100px">
      <b-row>
        <b-col md="2"></b-col>
        <b-col md="8">
          <h2 class="mb-4" style="color: #B4B2B3">
          <b>Products</b>
          </h2>
          <b-row>
            <b-col md="4" v-for="product in products" :key="product._id">
              <product
              v-bind:product="product"
              v-bind:userId="userId"
              v-bind:is-login="isLogin"
              v-bind:detail-product="detailProduct"
              ></product>
            </b-col>
          </b-row>
        </b-col>
        <b-col md="2"></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import product from "@/components/product.vue";

export default {
  name: "products",
  components: {
    product
  },
  props: ["products","userId", "isLogin", "role", "detailProduct"],
  data() {
    return {
      form: {},
      show: true
    };
  },
  methods: {
    
  }
};
</script>
<template>
  <div>
    <b-container style="margin-top: 100px">

      <!-- carousel -->
      <b-carousel
        class="my-5 shadow-lg"
        id="carousel-1"
        v-model="slide"
        :interval="4000"
        controls
        indicators
        background="#ababab"
        img-width="1024"
        img-height="480"
        style="text-shadow: 1px 1px 2px #333;"
      >
        <!-- @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd" -->

        <!-- Text slides with image -->
        <b-carousel-slide
          caption="First slide"
          text="Nulla vitae elit libero, a pharetra augue mollis interdum."
          img-src="https://www.laptopfactoryoutlet.com.sg/wp-content/uploads/2017/07/14-Days-Exchange-Ecommerce-Banner-1.jpg"
        ></b-carousel-slide>

        <b-carousel-slide
          caption="First slide"
          text="Nulla vitae elit libero, a pharetra augue mollis interdum."
          img-src="https://www.laptopfactoryoutlet.com.sg/wp-content/uploads/2017/07/14-Days-Exchange-Ecommerce-Banner-1.jpg"
        ></b-carousel-slide>
      </b-carousel>
      <!-- end of carousel -->

      <!-- home product -->
      <b-row>
        <b-col md="3" v-for="product in products" :key="product._id">
          <product v-bind:product="product" v-bind:userId="userId" v-bind:is-login="isLogin"></product>
        </b-col>
      </b-row>
      <!-- end of home product -->

    </b-container>
  </div>
</template>


<script>
import product from "@/components/product.vue";

export default {
  name: "home",
  components: {
    product
  },
  props: ['isLogin', 'products', 'userId'],
  data() {
    return {
      slide: 0,
      sliding: null
    };
  },
  methods: {
    // onSlideStart(slide) {
    //   this.sliding = true;
    // },
    // onSlideEnd(slide) {
    //   this.sliding = false;
    // }
  }
};
</script>

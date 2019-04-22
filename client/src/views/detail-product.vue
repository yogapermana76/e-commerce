<template>
  <div>
    <b-container style="margin-top: 100px">
      <b-row>
        <b-col md="2"></b-col>
        <b-col md="8" class="shadow p-3">
          <b-row>
            <b-col md="4">
              <b-card
                no-body
                style="max-width: 20rem;"
                img-src="https://placekitten.com/380/500"
                img-alt="Image"
                img-top
              ></b-card>
            </b-col>
            <b-col md="8" style="color: #999597">
              <div>
                <h4 class="pb-2" style="border-bottom: 1px solid #999597;"></h4>
                <h5>Rp. 100.000</h5>Description: {{ detailProduct }}
                <b-form>
                  <b-form-group id="input-group-1" label="Quantity" label-for="quantity">
                    <b-form-input
                      id="quantity"
                      v-model="form.quantity"
                      type="number"
                      required
                      placeholder="Enter Quantity"
                    ></b-form-input>
                  </b-form-group>
                </b-form>

                <div>
                  <b-button block variant="success">Buy Now</b-button>
                  <b-row class="mt-1">
                    <b-col>
                      <b-button block variant="info">Add To Cart</b-button>
                    </b-col>
                    <b-col>
                      <b-button block variant="danger">Chat</b-button>
                    </b-col>
                  </b-row>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-col>
        <b-col md="2"></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// import product from "@/components/product.vue";

export default {
  name: "detail-product",
  props: ['detailProduct'],
  created() {
    // this.getProduct()
    // console.log(this.detailProduct)
  },
  data() {
    return {
      form: {
        quantity: '',
      },
        product: ''
    }
  },
  methods: {
    getProduct(product) {
      console.log(product, '====')
    }
  },
};
</script>
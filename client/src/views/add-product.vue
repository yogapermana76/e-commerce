<template>
  <div>
    <b-container style="margin-top: 100px">
      <b-row>
        <b-col md="2"></b-col>
        <b-col md="8" class="shadow p-3">
          <h3 class="text-center mb-2">Add Product</h3>
          <b-form @submit.prevent="addProduct">
            <b-form-group label="Product Name" label-for="product-name">
              <b-form-input
                v-model="form.name"
                type="text"
                required
                placeholder="Enter Product Name"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Price:" label-for="price">
              <b-form-input v-model="form.price" required type="number" placeholder="0"></b-form-input>
            </b-form-group>

            <b-form-group label="Description:" label-for="description">
              <b-form-input
                v-model="form.description"
                required
                type="text"
                placeholder="Description"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Stock:" label-for="stock">
              <b-form-input
                v-model="form.stock"
                required
                type="number"
                placeholder="0"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Image" label-for="image">
              <b-form-file
                v-on:change="getImage"
                placeholder="Choose a file..."
                drop-placeholder="Drop file here..."
              ></b-form-file>
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
              >Add product</b-button>
            </b-form-group>
          </b-form>
        </b-col>
        <b-col md="2"></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "add-product",
  props: ['products'],
  data() {
    return {
      form: {
        name: "",
        description: "",
        price: "",
        stock: "",
        image: null
      }
    };
  },
  methods: {
    addProduct() {
      let fd = new FormData()
      fd.append('name', this.form.name)
      fd.append('description', this.form.description)
      fd.append('price', this.form.price)
      fd.append('stock', this.form.stock)
      fd.append('image', this.form.image)
      this.$axios
        .post('/products', fd, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            this.products.push(data)
            this.form.name = ''
            this.form.description = ''
            this.form.price = ''
            this.form.stock = ''
            this.form.image = ''
            console.log(data)
            this.$emit('success-add-product')
            this.$router.push('/list-product')
            this.$swal(`Success Add Product`, "You clicked the button!", "success")
          })
          .catch(err => {
            console.log(err)
          })
    },
    getImage(event) {
      this.form.image = event.target.files[0]
    }
  }
};
</script>
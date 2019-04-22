<template>
  <div id="app">
    <div>
      <b-navbar
        style="margin-bottom: 50px; background-color: white; color: #f5f5f0; border-bottom: 1px solid #e0e0d1;"
        class="shadow fixed-top"
      >
        <b-navbar-brand>
          <h3>
            <router-link style="color: #d6d6c2; text-decoration: none" to="/">gaMerc.com</router-link>
          </h3>
        </b-navbar-brand>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav v-if="isLogin && role == 'user'">
            <b-nav-item>
              <router-link style="color: #d6d6c2; text-decoration: none" to="/products">Products</router-link>
            </b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav v-if="isLogin && role == 'admin'">
            <b-nav-item>
              <router-link style="color: #d6d6c2; text-decoration: none" to="/list-product">List Product</router-link>
            </b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav v-if="isLogin && role == 'admin'">
            <b-nav-item>
              <router-link style="color: #d6d6c2; text-decoration: none" to="/add-product">Add Product</router-link>
            </b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto" >
            <b-nav-item v-on:click="getAllCart" v-if="isLogin" class="border-right px-2 mr-2">
              <router-link to="/list-cart">
                <i style="color: black" class="fas fa-shopping-cart"></i>
              </router-link>
            </b-nav-item>

            <b-nav-item v-if="isLogin == false">
              <router-link to="/register">
                <b-button
                  size="sm"
                  style="background-color: #00ffcc; color: white; border: 1px solid #00ffcc"
                >Register</b-button>
              </router-link>
            </b-nav-item>

            <b-nav-item v-if="isLogin == false">
              <router-link to="/login">
                <b-button
                  size="sm"
                  style="background-color: white; color: #d6d6c2; border: 1px solid #d6d6c2"
                >Login</b-button>
              </router-link>
            </b-nav-item>

            <b-nav-item v-if="isLogin == true">
              <b-button
                size="sm"
                style="background-color: white; color: #FC419C; border: 1px solid #FC419C"
                v-on:click="logout"
              >Logout</b-button>
            </b-nav-item>

          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <router-view
      v-on:success-login="loginSuccess"
      v-bind:is-login="isLogin"
      v-bind:products="products"
      v-bind:get-all-products="getAllProducts"
      v-on:success-deleted="getAllProducts"
      v-bind:detail-product="detailProduct"
      v-bind:carts="carts"
      v-bind:userId="userId"
      v-on:success-cancel="getAllCart"
      v-on:success-add-cart="addToCart"
      v-on:success-add-product="getAllProducts"
      v-on:view-product="view"
    />
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      isLogin: false,
      role: '',
      products: [],
      detailProduct: '',
      carts: [],
      userId: ''
    }
  },
  created() {
    this.getAllProducts()
    if(localStorage.getItem('token')) {
      this.role = localStorage.getItem('role')
      this.userId = localStorage.getItem('id')
      this.isLogin = true
      this.addToCart()
    }
  },
  methods: {
    getAllProducts() {
      this.$axios
        .get('/products')
        .then(({ data }) => {
          this.products = data
        })
        .catch(err => {
          console.log(err)
        })
    },
    getAllCart() {
      this.$axios
        .get(`/carts/${localStorage.getItem('id')}`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          this.carts = data
        })
        .catch(err => {
          console.log(err)
        })
    },
    addToCart() {
      this.getAllCart()
    },
    view(product) {
      console.log(product, '=================')
      this.detailProduct = product
    },
    loginSuccess(role) {
      this.role = role
      this.isLogin = true
    },
    logout() {
      this.isLogin = false
      localStorage.clear()
      this.$router.push('/')
      this.$swal("Success Logout!", "You clicked the button!", "success")
    },
  },
}
</script>


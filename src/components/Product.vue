<template>
  <div>
    <my-header></my-header>
    <div class="container mx-auto px-4">
      <h1 class="text-xl mb-4">This is the id {{ $route.params.id }}</h1>
      <div class="row" v-if="product">
        <div class="col-md-5 col-md-offset-0">
          <figure class="w-80">
            <img class="product" v-bind:src="'/' + product.image" />
          </figure>
        </div>
        <div class="form-group">
          <div class="form-control w-full max-w-xs">
            <p class="label mt-4">
              <span class="label-text">{{ product.title }}</span>
            </p>
            <p class="label">
              <span class="label-text" v-html="product.description"></span>
            </p>
            <p class="label">
              <span class="label-text">{{ product.price }}</span>
            </p>
            <button class="btn btn-primary mt-4" @click="del(product.id)">
              Delete Product
            </button>
          {{product}}
          <br>
          {{product.id}}
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MyHeader from "./Header.vue";
import { productsRef, db } from "../firebase";
export default {
  components: { MyHeader },
  firebase: {
    products: productsRef
  },
  data() {
    return {};
  },
  computed: {
    product() {
      return this.products
        .filter(product => product.id === parseInt(this.$route.params.id))
        .shift();
    },
    index() {
      return this.products.indexOf(this.product);
    }
  },
  methods: {
    async del(id) {
      try {
        await db.ref("products/" + id).remove();
        this.$router.push({ name: "Edit" });
      } catch (error) {
        throw error;
      }
    }
  },
  created: function() {
    /*axios.get('/static/products.json')
    .then((response) =>{
      this.product = response.data.products.filter(data => data.id == this.$route.params.id)[0]
      this.product.image = '/' + this.product.image;
    }); */
  }
};
</script>

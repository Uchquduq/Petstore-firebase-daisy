<template>
  <div>
    <my-header></my-header>
    <div class="container mx-auto px-4">
      <h1 class="text-xl mb-4">This is the id {{ p.id }}</h1>
      <div class="row" v-if="added">
        <div class="col-md-5 col-md-offset-0">
          <figure class="w-80" v-if="p.image">
            <img class="product" v-bind:src="'/' + p.image" />
          </figure>
        </div>
        <div class="form-group">
          <div class="form-control w-full max-w-xs">
            <label class="label mt-4">
              <span class="label-text">Product id > {{idThan - 1 }}</span>
            </label>
            <input
              type="number"
              placeholder="Type here"
              class="input input-bordered w-full max-w-xs"
              v-model.number="p.id"
            />
            <label class="label mt-4">
              <span class="label-text">Product name</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered w-full max-w-xs"
              v-model.trim="p.title"
            />
            <label class="label">
              <span class="label-text">Product description</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered w-full max-w-xs"
              v-model.trim="p.description"
            />
            <label class="label">
              <span class="label-text">Product image</span>
            </label>
            <select
              name="productImage"
              id="pImage"
              v-model="p.image"
              class="select select-bordered"
            >
              <option
                :value="product.image"
                v-for="(product, id) in products"
                :key="id"
                >{{ product.image }}</option
              >
            </select>
            <label class="label">
              <span class="label-text">Product price ( cent )</span>
            </label>
            <input
              type="number"
              placeholder="Type here"
              class="input input-bordered w-full max-w-xs"
              v-model.number="p.price"
            />

            <button class="btn btn-primary mt-4" @click="add(p)">
              Add Product
            </button>
          </div>
        </div>
      </div>
      <div v-else>
        <div>Product successfuly added!</div>
        <button class="btn btn-primary mt-4" @click="added = !added">
          Ok
        </button>
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
    return {
      added: true,
      p: {
        id: 0,
        title: "",
        description:
          "",
        price: 0,
        image: "",
        availableInventory: 7,
        rating: 1
      }
    };
  },
  computed: {
    product() {
      return this.products
        .filter(product => product.id === parseInt(this.$route.params.id))
        .shift();
    },
    idThan() {
      return this.products.length
    }
  },
  methods: {
    async add(p) {
      try {
        await db.ref("products/" + p.id).set(p);
        this.added = false;
        this.p = {
        id: 0,
        title: "",
        description:
          "",
        price: 0,
        image: "",
        availableInventory: 7,
        rating: 1
      }
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

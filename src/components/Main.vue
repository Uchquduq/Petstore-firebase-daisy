<template>
  <div>
    <my-header :cartItemCount="cartItemCount"></my-header>
    <main>
      <div class="mx-2">
        <div class="flex flex-row flex-wrap justify-center">
          <div
            v-for="product in sortedProducts"
            :key="product.id"
            class="basis-1/4 mx-2"
          >
            <div class="card w-96 bg-base-100 shadow-xl mb-5">
              <figure class="h-80">
                <img v-bind:src="product.image" />
              </figure>

              <div class="card-body">
                <div class="rating">
                  <span
                    v-bind:class="{ 'rating-active': checkRating(n, product) }"
                    v-for="n in 5"
                    :key="n"
                    >☆
                  </span>
                </div>
                <h2 class="card-title">
                  <router-link
                    tag="h1"
                    :to="{ name: 'Id', params: { id: product.id } }"
                    >{{ product.title }}</router-link
                  >
                </h2>
                <p v-html="product.description"></p>
                <h2 class="price">
                  {{ product.price | formatPrice }}
                </h2>

                <div class="card-actions">
                  <button
                    class=" btn btn-primary"
                    v-on:click="addToCart(product)"
                    v-if="canAddToCart(product)"
                  >
                    Add to cart
                  </button>
                  <button disabled="true" class=" btn btn-primary" v-else>
                    Add to cart
                  </button>
                  <div>
                    <transition name="bounce" mode="out-in">
                      <div class="mt-3">
                        <span
                          class=" inventory-message mt-2"
                          v-if="
                            product.availableInventory -
                              cartCount(product.id) ===
                              0
                          "
                          key="0"
                        >
                          All Out!
                        </span>
                        <span
                          class="inventory-message"
                          v-else-if="
                            product.availableInventory - cartCount(product.id) <
                              5
                          "
                          key=""
                        >
                          Only
                          {{
                            product.availableInventory - cartCount(product.id)
                          }}
                          left!
                        </span>
                        <span class="inventory-message  mt-2" v-else key=""
                          >Buy Now!
                        </span>
                      </div>
                    </transition>
                  </div>
                </div>
              </div>
            </div>

            <!-- end of col-md-6-->
          </div>
          <!-- end of row-->
        </div>
      </div>
      <!-- end of v-for-->
    </main>
  </div>
</template>
<script>
import MyHeader from "./Header.vue";
import { mapGetters } from "vuex";
import { productsRef } from "../firebase";
export default {
  name: "imain",
  firebase: {
    products: productsRef
  },
  data() {
    return {
      cart: []
    };
  },
  components: { MyHeader },
  methods: {
    checkRating(n, myProduct) {
      return myProduct.rating - n >= 0;
    },
    addToCart(aProduct) {
      this.cart.push(aProduct.id);
    },
    canAddToCart(aProduct) {
      //return this.product.availableInventory > this.cartItemCount;
      return aProduct.availableInventory > this.cartCount(aProduct.id);
    },
    cartCount(id) {
      let count = 0;
      for (var i = 0; i < this.cart.length; i++) {
        if (this.cart[i] === id) {
          count++;
        }
      }
      return count;
    }
  },
  computed: {
    ...mapGetters(["session"]),
    cartItemCount() {
      return this.cart.length || "";
    },
    sortedProducts() {
      if (this.products.length > 0) {
        let productsArray = this.products.slice(0);
        function compare(a, b) {
          if (a.title < b.title) return -1;
          if (a.title > b.title) return 1;
          return 0;
        }
        return productsArray.sort(compare);
      }
    }
  },
  filters: {
    formatPrice(price) {
      if (!parseInt(price)) {
        return "";
      }
      if (price > 99999) {
        var priceString = (price / 100).toFixed(2);
        var priceArray = priceString.split("").reverse();
        var index = 3;
        while (priceArray.length > index + 3) {
          priceArray.splice(index + 3, 0, ",");
          index += 4;
        }
        return "$" + priceArray.reverse().join("");
      } else {
        return "$" + (price / 100).toFixed(2);
      }
    }
  },
  created: function() {
    // this.$store.dispatch("initStore");
  },
  beforeUpdate: function() {
    console.log(this.products);
  }
};
</script>
<style scoped>
.bounce-enter-active {
  animation: shake 0.72s cubic-bezier(0.37, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}

.rating-active:before {
  content: "\2605";
  position: absolute;
}
.rating {
  display: inline;

  margin-top: 10px;
  float: right;
}
.rating > span {
  display: inline-block;
  position: relative;
  width: 1.1em;
}

@keyframes shake {
  10%,
  90% {
    color: red;
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    color: red;
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>

<template>
  <header>
    <div class="navbar bg-base-100 mt-1 mb-5 shadow-xl rounded-box">
      <div class="flex-1">
        <a class="btn btn-ghost normal-case text-xl"
          ><router-link :to="{ name: 'iMain' }">{{ sitename }}</router-link></a
        >
      </div>
      <div class="flex-none">
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-circle">
            <div class="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span
                v-if="cartItemCount"
                class="badge badge-sm indicator-item"
                >{{ cartItemCount }}</span
              >
            </div>
          </label>
          <div
            tabindex="0"
            class="mt-3 card card-compact w-52 dropdown-content bg-base-100 shadow"
          >
            <div class="card-body">
              <span class="font-bold text-lg">{{ cartItemCount }} Items</span>
              <span class="text-info subtotal"></span>
              <div class="card-actions">
                <button class="btn btn-primary btn-block">
                  <router-link
                    active-class="active"
                    tag="span"
                    class=""
                    :to="{ name: 'Form' }"
                    >View cart</router-link
                  >
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!mySession" class="mr-3 ml-2">
          <button type="button" class="btn" v-on:click="signIn">
            Sign In
          </button>
        </div>

        <div v-else class="dropdown dropdown-end mr-3 ml-2">
          <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img :src="mySession.photoURL" />
            </div>
          </label>
          <ul
            tabindex="0"
            class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <router-link
                tag="a"
                :to="{ name: 'ProductAdd' }"
                class="justify-between"
              >
                Add Product
              </router-link>
            </li>
            <li><a>Products Table</a></li>
            <li><a v-on:click="signOut">Sign out</a></li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Header",
  data() {
    return {
      sitename: "Montblanc"
    };
  },
  props: ["cartItemCount"],
  beforeCreate() {
    firebase.auth().onAuthStateChanged(user => {
      this.$store.commit("SET_SESSION", user || false);
    });
  },
  methods: {
    showCheckout() {
      this.$router.push({ name: "Form" });
    },
    signIn() {
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          console.log("signed in!");
        })
        .catch(function(error) {
          console.log("error " + error);
        });
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(function() {
          // Sign-out successful.
          console.log("signed out!");
        })
        .catch(function(error) {
          console.log("error in sign out!");
          // An error happened.
        });
    }
  },
  computed: {
    mySession() {
      return this.$store.getters.session;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  text-decoration: none;
}

.photo {
  width: 25px;
  height: 25px;
}

.router-link-exact-active {
}
</style>

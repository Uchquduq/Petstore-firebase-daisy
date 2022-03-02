<template>
  <div>
    <my-header :cartItemCount="cartItemCount"></my-header>
    <div class="container mx-auto px-4">
      <p class="text-2xl font-bold">Pet Depot Checkout</p>
      <div class="flex flex-row flex-wrap">
        <div class="basis-3/4">
          <div class="form-group mt-2 mb-2">
            <div class="">
              <p class="text-xl font-bold">Enter Your Information</p>
            </div>
          </div>
          <div class="form-group">
            <div class="form-control w-full max-w-xs">
              <label class="label">
                <span class="label-text">First name</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                class="input input-bordered w-full max-w-xs"
                v-model.trim="order.firstName"
              />
              <label class="label">
                <span class="label-text">Last name</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                class="input input-bordered w-full max-w-xs"
                v-model.trim="order.lastName"
              />
              <label class="label">
                <span class="label-text">Address</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                class="input input-bordered w-full max-w-xs"
                v-model.trim="order.address"
              />
              <label class="label">
                <span class="label-text">City</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                class="input input-bordered w-full max-w-xs"
                v-model.trim="order.city"
              />
              <label class="label">
                <span class="label-text">State</span>
              </label>
              <select v-model="order.state" class="select select-bordered">
                <option
                  v-for="(state, key) in states"
                  v-bind:value="state"
                  :key="key"
                >
                  {{ state }}
                </option>
              </select>
              <label class="label">
                <span class="label-text">ZIP code</span>
              </label>
              <input
                type="number"
                placeholder="Type here"
                class="input input-bordered w-full max-w-xs"
                v-model.trim="order.zip"
              />
              <label class="cursor-pointer label mt-4">
                <span class="label-text">Ship As Gift?</span>
                <input
                  type="checkbox"
                  id="gift"
                  value="true"
                  v-bind:true-value="order.sendGift"
                  v-bind:false-value="order.dontSendGift"
                  v-model="order.gift"
                  class="checkbox checkbox-primary"
                />
              </label>
              <div class="form-control mt-3">
                <label class="cursor-pointer label">
                  <span class="label-text">Home</span>
                  <input
                    type="radio"
                    name="radio-6"
                    v-bind:value="order.home"
                    v-model="order.method"
                    class="radio checked:bg-red-500"
                  />
                </label>
              </div>
              <div class="form-control">
                <label class="cursor-pointer label">
                  <span class="label-text">Business</span>
                  <input
                    type="radio"
                    name="radio-6"
                    class="radio checked:bg-blue-500"
                    v-bind:value="order.business"
                    v-model="order.method"
                  />
                </label>
              </div>
            </div>
          </div>

          <!-- end of form-group -->

          <!-- end of form-group-->

          <div class="form-group mt-4">
            <div class="">
              <button
                type="submit"
                class="btn btn-primary submit"
                v-on:click="submitForm"
              >
                Place Order
              </button>
            </div>
            <!-- end of col-md-6-->
          </div>
        </div>
        <!-- end of form-group-->
        <div class="basis-1/4 mt-20">
          <div class="verify">
            <pre>
                        First Name: {{ order.firstName }}
                        Last Name: {{ order.lastName }}
                        Address: {{ order.address }}
                        City: {{ order.city }}
                        Zip: {{ order.zip }}
                        State: {{ order.state }}
                        Method: {{ order.method }}
                        Gift: {{ order.gift }}
              </pre
            >
          </div>
        </div>
        <!-- end of col-md-12 verify-->
      </div>
      <!--end of panel-body-->

      <!--end of row-->
    </div>
  </div>
</template>
<script>
import MyHeader from "./Header.vue";
export default {
  name: "Form",
  props: ["cartItemCount"],
  data() {
    return {
      states: {
        AL: "Alabama",
        AK: "Alaska",
        AR: "Arizona",
        CA: "California",
        NV: "Nevada"
      },
      order: {
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        zip: "",
        state: "",
        method: "Home Address",
        business: "Business Address",
        home: "Home Address",
        gift: "",
        sendGift: "Send As A Gift",
        dontSendGift: "Do Not Send As A Gift"
      }
    };
  },
  components: { MyHeader },
  methods: {
    submitForm() {
      alert("Submitted");
    }
  }
};
</script>
<style scoped></style>

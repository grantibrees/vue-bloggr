<template>
  <nav class="navbar navbar-expand-lg navbar-light second-color">
    <router-link class="navbar-brand d-flex second-color" :to="{ name: 'Home' }">
      <div>
        <h3 class="second-color">Bloggr</h3>
      </div>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" :class="{ active: $route.name == 'Home' }">
          <router-link :to="{ name: 'Home' }" class="nav-link text-white">Home</router-link>
        </li>
        <li
          class="nav-item"
          v-if="$auth.isAuthenticated"
          :class="{ active: $route.name == 'UserProfile' }"
        >
          <router-link class="nav-link text-white" :to="{ name: 'UserProfile' }">Profile</router-link>
        </li>
      </ul>
      <span class="navbar-text">
        <button class="btn btn-primary" @click="login" v-if="!$auth.isAuthenticated">Login</button>
        <button class="btn btn-danger" @click="logoutWarn" v-else>Logout</button>
      </span>
    </div>
  </nav>
</template>

<script>
import { getUserData } from "@bcwdev/auth0-vue";
import { setBearer, api } from "../store/AxiosStore";
export default {
  name: "Navbar",
  methods: {
    async login() {
      await this.$auth.loginWithPopup();
      if (this.$auth.isAuthenticated) {
        setBearer(this.$auth.bearer);
        // NOTE if you want to do something everytime the user logs in, do so here
      }
      this.$store.dispatch("getUser");
    },
    logoutWarn() {
      this.$swal({
        title: "Log Out?",
        text: "Ready to leave?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, log out!",
      }).then((result) => {
        if (result.value) {
          this.$swal(
            "Logged Out!",
            "You have been successfully logged out.",
            "success"
          );
          this.logout();
        }
      });
    },

    async logout() {
      this.$store.dispatch("resetBearer");
      await this.$auth.logout({ returnTo: window.location.origin });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

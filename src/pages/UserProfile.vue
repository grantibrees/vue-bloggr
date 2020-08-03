<template>
  <div class="about">
    <div class="row d-flex justify-content-center">
      <div
        class="rounded shadow text-center col-10 d-flex align-items-center user-height justify-content-around second-color mx-2 my-2"
      >
        <h1 class="rm-my mx-2">Welcome, {{userData.name}}</h1>
        <img class="rounded mx-2" :src="userData.picture" alt />
      </div>
    </div>
    <div class="row justify-content-around">
      <button class="btn btn-primary px-5" @click="showBlogs = !showBlogs">Show/Hide your Blogs</button>
      <button
        class="btn btn-primary px-3"
        @click="showComments = !showComments"
      >Show/Hide your Comments</button>
    </div>
    <div class="row">
      <div class="col-6 d-flex flex-column align-items-center">
        <div class="row d-flex justify-content-center" v-if="showBlogs">
          <blog v-for="blog in userBlogs" :key="blog.id" :blog="blog" />
        </div>
      </div>
      <div class="col-6 d-flex flex-column align-items-center">
        <div class="row d-flex justify-content-center my-2" v-if="showComments">
          <comment v-for="comment in userComments" :key="comment.id" :comment="comment" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Blog from "../components/UserBlogs.vue";
import Comment from "../components/UserComments";
export default {
  name: "UserProfile",
  data() {
    return {
      showBlogs: false,
      showComments: false,
    };
  },
  mounted() {
    this.$store.dispatch("getUserComments");
    this.$store.dispatch("getUserBlogs");
  },
  computed: {
    userData() {
      return this.$store.state.userData;
    },
    userBlogs() {
      return this.$store.state.userBlogs;
    },
    userComments() {
      return this.$store.state.userComments;
    },
  },
  components: {
    Blog,
    Comment,
  },
};
</script>

<style scoped>
.user-height {
  min-height: 30vh;
}
img {
  max-width: 100px;
}
</style>

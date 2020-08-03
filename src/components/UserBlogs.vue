<template>
  <div
    class="user-blogs rounded shadow text-center col-8 d-flex align-items-center comment-height justify-content-around second-color mx-2 my-2"
  >
    <div class="row">
      <div class="col-8 align-items-center">
        <h4 class="rm-my pt-2">{{ blog.title }}</h4>
      </div>
      <div class="col-4 d-flex align-items-center justify-content-center">
        <router-link :to="{ name: 'BlogMain', params: { id: blog.id } }">
          <button class="btn btn-primary mx-2 my-2">View Blog</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "user-blogs",
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {},
  props: ["blog"],
};
</script>

<style scoped>
</style>

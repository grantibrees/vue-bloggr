<template>
  <div
    class="blog rounded shadow col-5 d-flex align-items-center justify-content-center second-color post-height mx-2 my-2"
  >
    <router-link :to="{ name: 'BlogMain', params: { id: blog._id }}">
      <div class="row d-flex align-content-center justify-content-center mx-2">
        <div class="col-12">
          <h3 class="mx-2 second-color">
            <b>{{blog.title}}</b>
          </h3>
        </div>
        <div class="col-12">
          <h5 class="mx-2 second-color">Author: {{blog.creatorEmail}}</h5>
        </div>
      </div>
    </router-link>
  </div>
</template>


<script>
export default {
  name: "blog",
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {},
  props: ["blog"],
};
</script>


<style lang="scss" scoped>
.post-height {
  min-height: 6rem;
}
</style>
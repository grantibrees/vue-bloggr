<template>
  <div class="container-fluid main-color">
    <div class="home row d-flex justify-content-center py-3">
      <div class="col-12 text-center pb-2">
        <h1 class>Hello! Share something!</h1>

        <p v-if="$auth.isAuthenticated">Make a post, or see what others have posted!</p>
        <p v-if="!$auth.isAuthenticated">Log in to make or read posts!</p>
      </div>
      <div class="col-12 d-flex justify-content-center">
        <button
          class="btn btn-primary"
          v-if="$auth.isAuthenticated"
          data-toggle="modal"
          data-target="#modal1"
        >Make a New Post</button>
      </div>

      <div class="modal row" id="modal1" tabindex="-1" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modal title</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form class @submit.prevent="postWarn">
                <div class="form-group">
                  <div class="row justify-content-center">
                    <label for="input1" class>Title:</label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      class="form-control mx-3"
                      placeholder="Clickbait!"
                      aria-describedby="helpId"
                      v-model="newBlog.title"
                    />
                  </div>
                  <div class="row justify-content-center">
                    <div class="form-group w-100 mx-3 text-center">
                      <label for="blogInfo" class="mt-2">Blog Body:</label>
                      <textarea class="form-control" v-model="newBlog.body" id="blogInfo" rows="3"></textarea>
                    </div>
                  </div>
                  <div class="row justify-content-center">
                    <button data-toggle="modal" type="submit" class="btn btn-success">Post</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row align-items-center justify-content-center">
      <blog v-for="blog in blogs" :key="blog.id" :blog="blog" />
    </div>
  </div>
</template>

<script>
import Blog from "../components/Blog.vue";
export default {
  name: "home",

  mounted() {
    this.$store.dispatch("getAllBlogs");
  },

  data() {
    return {
      newBlog: {},
    };
  },

  computed: {
    blogs() {
      return this.$store.state.blogs;
    },
    userData() {
      return this.$store.state.userData;
    },
  },

  methods: {
    createBlog() {
      this.$store.dispatch("createBlog", { ...this.newBlog });
      this.newBlog = {};
    },

    postWarn() {
      this.$swal({
        title: "Ready to Post?",
        text: "This blog post will be publically published!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, publish it!",
      }).then((result) => {
        if (result.value) {
          this.$swal("Posted!", "Your blog has been posted.", "success");
          this.createBlog();
        }
      });
    },
  },

  components: {
    Blog,
  },
};
</script>

<style lang="scss" scoped>
</style>

<template>
  <!-- ANCHOR This is so much chaos. I tried to split it, but gave up-->
  <div class="blog-main container">
    <!-- SECTION row 1 -->
    <div class="row d-flex justify-content-center mt-2">
      <div
        class="rounded shadow text-center col-10 d-flex align-items-center justify-content-around second-color mx-2 my-2"
      >
        <h4 class="rm-my">Title: {{ blog.title }}</h4>
        <p class="rm-my">Author: {{ blog.creatorEmail }}</p>
        <img class="user-icon rounded mx-2 my-2 border" :src="blog.creator.picture" alt />
      </div>
      <div
        class="rounded shadow text-start col-10 d-flex align-items-start justify-content-start third-color post-height mx-4 my-2"
      >
        <h5 class="mx-2 my-4">"{{ blog.body }}"</h5>
      </div>
      <div class="col-8 d-flex justify-content-center my-2">
        <button class="btn btn-danger mx-2" v-if="creator" @click="deleteWarn">Delete Blog</button>
        <button class="btn btn-primary mx-2" v-if="creator" @click="editForm = !editForm">Edit Blog</button>
      </div>
      <div class="col-8 d-flex justify-content-center my-3" v-if="editForm">
        <form class="form-inline" @submit.prevent="sendEdit">
          <div class="form-group">
            <input
              type="text"
              name="title"
              id="title"
              class="form-control mx-3"
              placeholder="Edit Title..."
              aria-describedby="helpId"
              v-model="editBlog.title"
            />
            <input
              type="text"
              name="body"
              id="body"
              class="form-control mx-3"
              placeholder="Edit Blog..."
              aria-describedby="helpId"
              v-model="editBlog.body"
            />
            <button typ="submit" class="btn btn-primary">Edit</button>
          </div>
        </form>
      </div>
    </div>
    <!-- SECTION row 2 -->
    <div class="row d-flex justify-content-center mb-3">
      <div class="col-6 d-flex justify-content-center">
        <button
          class="btn btn-primary"
          @click="commentForm = !commentForm"
        >Show/Hide {{ comments.length }} Comments</button>
      </div>
    </div>
    <!-- SECTION row 3 -->
    <div class="row d-flex justify-content-center mb-4" v-if="commentForm">
      <div class="col-7 d-flex justify-content-center">
        <form class="form-inline" @submit.prevent="createComment">
          <div class="form-group">
            <input
              type="text"
              name="body"
              id="body"
              class="form-control"
              placeholder="Type comment here..."
              v-model="newComment.body"
            />
          </div>
          <button type="submit" class="btn btn-primary mx-2">Submit</button>
        </form>
      </div>
      <comment v-for="comment in comments" :key="comment.id" :comment="comment" />
    </div>
  </div>
</template>

<script>
import Comment from "@/components/Comments.vue";

export default {
  name: "blog-main",
  mounted() {
    this.$store.dispatch("getBlogMain", this.$route.params.id);
    this.$store.dispatch("getComments", this.$route.params.id);
  },

  data() {
    return {
      editBlog: {
        id: this.$route.params.id,
      },
      newComment: {
        blogId: this.$route.params.id,
      },
      commentForm: false,
      editForm: false,
    };
  },
  computed: {
    blog() {
      return this.$store.state.activeBlog.blog;
    },
    comments() {
      return this.$store.state.comments;
    },
    creator() {
      return this.$store.state.userData.email == this.blog.creatorEmail;
    },
  },
  methods: {
    beforeRouteLeave(to, from, next) {
      this.$store.commit("setActiveBlog", {});
      next();
    },
    createComment() {
      this.$store.dispatch("createComment", { ...this.newComment });
      this.newComment = {
        blogId: this.$route.params.id,
      };
    },
    deleteBlog() {
      this.$store.dispatch("deleteBlog", this.$route.params.id);
    },
    sendEdit() {
      this.$store.dispatch("editBlog", { ...this.editBlog });
      this.editBlog = {
        id: this.$route.params.id,
      };
    },

    deleteWarn() {
      this.$swal({
        title: "Delete Blog Post?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          this.$swal("Deleted!", "Your blog post has been deleted.", "success");
          this.deleteBlog();
        }
      });
    },
  },

  components: {
    Comment,
  },
};
</script>

<style scoped>
.post-height {
  min-height: 20rem;
}
.user-icon {
  max-height: 70px;
}
</style>

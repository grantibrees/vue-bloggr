<template>
  <div
    class="user-comments rounded shadow text-center col-10 d-flex align-items-center comment-height justify-content-around third-color mx-2 my-2"
  >
    <div class="row align-items-center justify-items-between">
      <div class="col-8 align-items-center">
        <p class="rm-my">"{{ comment.body }}"</p>
      </div>
      <div class="col-4 justify-content-center">
        <div class="row justify-content-center">
          <router-link :to="{ name: 'BlogMain', params: { id: comment.blogId } }">
            <button class="btn btn-primary mx-2 my-2">View Blog</button>
          </router-link>
        </div>
        <div class="row justify-content-center">
          <button class="btn btn-danger mb-2" @click="deleteCommentWarn">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "user-comments",
  data() {
    return {};
  },
  computed: {},
  methods: {
    deleteCommentWarn() {
      this.$swal({
        title: "Delete Comment?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          this.$swal("Deleted!", "Your comment has been deleted.", "success");
          this.deleteComment();
        }
      });
    },
    deleteComment() {
      this.$store.dispatch("deleteUserComment", this.comment.id);
    },
  },
  components: {},
  props: ["comment"],
};
</script>

<style scoped>
</style>

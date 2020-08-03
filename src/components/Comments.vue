<template>
  <div
    class="comments rounded shadow text-center col-8 d-flex align-items-center comment-height justify-content-around second-color mx-2 my-2"
  >
    <h4 class="rm-my">"{{ comment.body }}"</h4>
    <p class="rm-my">{{ comment.creatorEmail }}</p>
    <div class="row d-flex justify-content-center">
      <div class="col-6 d-flex justify-content-center">
        <button class="btn btn-danger mb-1 mx-2" v-if="creator" @click="deleteWarn">Delete</button>
        <button class="btn btn-success mb-1 mx-2" v-if="creator" @click="edit = !edit">Edit</button>
      </div>
      <div class="col-12 d-flex justify-content-center mb-2" v-if="edit">
        <form class="form-inline" @submit.prevent="invokeEditComment">
          <div class="form-group">
            <input
              type="text"
              name="body"
              id="body"
              class="form-control"
              placeholder="Type comment here..."
              v-model="editComment.body"
            />
          </div>
          <button class="btn btn-success" type="submit">Edit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "comments",
  data() {
    return {
      edit: false,
      editComment: {
        id: this.comment.id,
        blogId: this.comment.blogId,
      },
    };
  },
  computed: {
    creator() {
      return this.$store.state.userData.email == this.comment.creatorEmail;
    },
  },
  methods: {
    deleteWarn() {
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
      this.$store.dispatch("deleteComment", this.comment.id);
    },

    invokeEditComment() {
      this.$store.dispatch("editComment", { ...this.editComment });
      this.editComment = {
        id: this.comment.id,
        blogId: this.comment.blogId,
      };
    },
  },
  components: {},
  props: ["comment"],
};
</script>

<style scoped>
.comment-height {
  min-height: 4rem;
}
</style>

import Vue from "vue";
import Vuex, { Store } from "vuex";
import router from "../router";
import { api } from "./AxiosStore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    blogs: [],
    activeBlog: {},
    comments: [],
    userData: {},
    userBlogs: [],
    userComments: [],
  },
  mutations: {

    //SECTION User Mutations
    setUser(state, userData) {
      state.userData = userData;
    },

    deleteUserComment(state, id) {
      state.userComments = state.userComments.filter((comment) => comment.id != id);
    },

    setUserComments(state, comments) {
      state.userComments = comments;
    },

    setUserBlogs(state, blogs) {
      state.userBlogs = blogs;
    },
    // SECTION Comment Mutations

    addComment(state, comment) {
      state.comments.push(comment);
    },

    setComments(state, comments) {
      state.comments = comments;
    },

    deleteComment(state, id) {
      state.comments = state.comments.filter((comment) => comment.id != id);
    },

    // SECTION Blog Mutations
    setBlogs(state, blogs) {
      state.blogs = blogs;
    },

    setActiveBlog(state, blog) {
      state.activeBlog = blog;
    },
  },
  actions: {
    // Don't fuck with this
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    //

    // SECTION User Actions
    async getUser({ commit, dispatch }) {
      try {
        let res = await api.get("profile");
        commit("setUser", res.data);
      } catch (err) {
        console.error(err);
      }
    },

    async deleteUserComment({ commit, dispatch }, id) {
      try {
        let res = await api.delete("comments/" + id);
        commit("deleteUserComment", id);
        dispatch("getUserComments");
      } catch (err) {
        console.error(err);
      }
    },

    async getUserBlogs({ commit, dispatch }) {
      try {
        let res = await api.get("profile/blogs");
        commit("setUserBlogs", res.data);
      } catch (err) {
        console.error(err);
      }
    },

    async getUserComments({ commit, dispatch }) {
      try {
        let res = await api.get("profile/comments");
        commit("setUserComments", res.data);
      } catch (err) {
        console.error(err);
      }
    },

    // SECTION Comment Actions

    async getComments({ commit, dispatch }, id) {
      try {
        let res = await api.get("blogs/" + id);
        commit("setComments", res.data.comments);
        dispatch("getBlogMain", id);
      } catch (err) {
        console.error(err);
      }
    },

    async createComment({ commit, dispatch }, commentDetails) {
      try {
        let res = await api.post("comments", commentDetails);
        commit("addComment", res.data);
        dispatch("getComments");
      } catch (err) {
        console.error(err);
      }
    },

    async deleteComment({ commit, dispatch }, id) {
      try {
        let res = await api.delete("comments/" + id);
        commit("deleteComment", id);
        dispatch("getComments");
      } catch (err) {
        console.error(err);
      }
    },

    async editComment({ commit, dispatch }, commentDetails) {
      try {
        let res = await api.put("comments/" + commentDetails.id, commentDetails);
        dispatch("getComments", commentDetails.blogId);
      } catch (err) {
        console.error(err);
      }
    },

    // SECTION Blog Actions

    async getAllBlogs({ commit, dispatch }) {
      try {
        let res = await api.get("blogs");
        commit("setBlogs", res.data);
      } catch (err) {
        console.error(err);
      }
    },

    async getBlogMain({ commit, dispatch }, id) {
      try {
        let res = await api.get("blogs/" + id);
        commit("setActiveBlog", res.data);
      } catch (err) {
        console.error(err);
      }
    },

    async createBlog({ commit, dispatch }, blogMain) {
      try {
        let res = await api.post("blogs", blogMain);
        dispatch("getAllBlogs");
      } catch (err) {
        console.error(err);
      }
    },

    async deleteBlog({ commit, dispatch }, id) {
      try {
        let res = await api.delete("blogs/" + id);
        router.push({ name: "Home" });
      } catch (err) {
        console.error(err);
      }
    },

    async editBlog({ commit, dispatch }, blogMain) {
      try {
        let res = await api.put("blogs/" + blogMain.id, blogMain);
        dispatch("getBlogMain", blogMain.id);
      } catch (err) {
        console.error(err);
      }
    }

  },
});

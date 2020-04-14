<template>
  <div class="card o-hidden border-0 shadow-lg my-5">
    <div class="card-body p-0">
      <!-- Nested Row within Card Body -->
      <div class="row">
        <div class="col-lg-6 d-none d-lg-block bg-password-image"></div>
        <div class="col-lg-6">
          <div class="p-5">
            <div class="text-center">
              <h1 class="h4 text-gray-900 mb-2">Reset you Password?</h1>
              <p class="mb-4">Please enter the password you wanna set for your account!</p>
              <div class="alert alert-danger" v-if="has_error">{{error_message}}</div>
              <div class="alert alert-success" v-if="has_success" v-html="success_message"></div>
            </div>
            <form class="user">
              <div class="form-group">
                <input
                  v-model="password"
                  type="password"
                  class="form-control form-control-user"
                  placeholder="Enter Password"
                >
              </div>
              <div class="form-group">
                <input
                  v-model="password_confirmation"
                  type="password"
                  class="form-control form-control-user"
                  id="exampleInputEmail"
                  aria-describedby="emailHelp"
                  placeholder="Enter Password again"
                >
              </div>
              <a @click="forgotPassword" class="btn btn-primary btn-user btn-block">Change password</a>
            </form>
            <hr>
            <div class="text-center">
              <router-link :to="{name:'Register'}" class="small">Create an Account!</router-link>
            </div>
            <div class="text-center">
              <router-link :to="{name:'Login'}" class="small">Already have an account? Login!</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResetPassword",
  /**
   * check if the token param is not sent then redirect to login
   * @param to
   * @param from
   * @param next
   */
  beforeRouteEnter: function(to, from, next) {
    next(vm => {
      // get the token
      const token = vm.$route.query.token;
      // if no token redirect to login
      if (token === undefined) {
        vm.$router.push({ name: "Login" });
      }
      vm.token = token;
    });
  },
  data: function() {
    return {
      password: "",
      password_confirmation: "",
      token: "",

      has_error: false,
      error_message: "",

      has_success: false,
      success_message: ""
    };
  },
  methods: {
    forgotPassword: function() {
      const app = this;
      this.has_error = false;
      this.error_message = "";
      this.has_success = false;
      this.success_message = "";

      // all is successful, send the request
      app.axios
        .post(
          "/account/resetPassword",
          {
            token: this.token,
            password: this.password,
            confirmPassword: this.password_confirmation
          })
        .then(function(response) {
          app.success_message =
            "Your password changed successfully, Go to your <a href='/profile'>Profile</a> ";
          app.has_success = true;
          app.axios.defaults.headers["Authorization"] = response.data.token;
          localStorage.setItem("token", response.data.token);
        })
        .catch(function(error) {
          app.error_message = "Error has occurred";
          app.has_error = true;
        });
    }
  }
};
</script>

<style scoped>
</style>
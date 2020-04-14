<template>
  <div class="card o-hidden border-0 shadow-lg my-5">
    <div class="card-body p-0">
      <!-- Nested Row within Card Body -->
      <div class="row">
        <div class="col-lg-6 d-none d-lg-block bg-password-image"></div>
        <div class="col-lg-6">
          <div class="p-5">
            <div class="text-center">
              <h1 class="h4 text-gray-900 mb-2">{{txt('Forgot Your Password?')}}</h1>
              <p
                class="mb-4"
              >{{`${txt('We get it')}, ${txt('stuff happens')}. ${txt('Just enter your email address below and we will send you a link to reset your password')}` }}</p>
              <div class="alert alert-danger" v-if="has_error">{{error_message}}</div>
              <div class="alert alert-success" v-if="has_success">{{success_message}}</div>
            </div>
            <form class="user" @submit.prevent="forgotPassword">
              <div class="form-group">
                <input
                  v-model="email"
                  type="email"
                  class="form-control form-control-user"
                  id="exampleInputEmail"
                  aria-describedby="emailHelp"
                  :placeholder="txt('Enter Email Address')"
                >
              </div>
              <a
                @click="forgotPassword"
                class="btn btn-primary btn-user btn-block"
              >{{txt('Reset Password')}}</a>
            </form>
            <hr>
            <div class="text-center">
              <router-link :to="{name:'Register'}" class="small">{{txt('Create an Account')}}!</router-link>
            </div>
            <div class="text-center">
              <router-link
                :to="{name:'Login'}"
                class="small"
              >{{txt('Already have an account? Login!')}}</router-link>
            </div>
          </div>
          <div class="container" style="display: inline-flex;">
            <div id="lang_selector" class="language-dropdown first">
              <label for="toggle" class="lang-flag lang-en" title="Click to select the language">
                <span class="flag" @click="chooseLang('en_US')"></span>
              </label>
            </div>

            <div id="lang_selector" class="language-dropdown">
              <label for="toggle" class="lang-flag lang-zh" title="Click to select the language">
                <span class="flag" @click="chooseLang('zh_HK')"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForgotPassword",
  data: function() {
    return {
      email: "",
      password: "",
      rememberMe: false,

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

      // validate email
      let emailReg = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (emailReg.test(app.email) === false) {
        app.error_message = "Email is invalid";
        app.has_error = true;
        return false;
      }

      // all is successful, send the request
      app.axios
        .post(
          "/account/forgotPassword",
          {
            email: this.email
          }
        )
        .then(function(response) {
          app.success_message =
            "An Email has been sent to you with resetting password instructions";
          app.has_success = true;
        })
        .catch(function(error) {
          app.error_message = "Error has occurred";
          app.has_error = true;
        });
    },
    chooseLang: function(lang) {
      localStorage.setItem("activeLang", lang);
      location.reload();
    }
  }
};
</script>

<style scoped>
</style>
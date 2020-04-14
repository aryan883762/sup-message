<template>
  <div class="row justify-content-center">
    <div class="col-xl-10 col-lg-12 col-md-9">
      <div class="card o-hidden border-0 shadow-lg my-5">
        <div class="card-body p-0">
          <!-- Nested Row within Card Body -->
          <div class="row">
            <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
            <div class="col-lg-6">
              <div class="p-5">
                <div class="text-center">
                  <h1 class="h4 text-gray-900 mb-4">{{txt('Welcome Back!')}}</h1>
                  <div class="alert alert-danger" v-if="has_error">{{error_message}}</div>
                </div>
                <form class="user">
                  <div class="form-group">
                    <input
                      type="email"
                      class="form-control form-control-user"
                      id="exampleInputEmail"
                      aria-describedby="emailHelp"
                      v-model="email"
                      :placeholder="txt('Enter Email Address')"
                    >
                  </div>
                  <div class="form-group">
                    <input
                      type="password"
                      class="form-control form-control-user"
                      v-model="password"
                      id="exampleInputPassword"
                      :placeholder="txt('Password')"
                    >
                  </div>

                  <a @click="login" class="btn btn-primary btn-user btn-block">{{txt('Login')}}</a>
                </form>
                <hr>
                <div class="text-center">
                  <router-link
                    class="small"
                    :to="({name:'ForgotPassword'})"
                  >{{txt('Forgot Password?')}}</router-link>
                </div>
                <div class="text-center">
                  <router-link class="small" :to="({name:'Register'})">{{txt('Create an Account')}}!</router-link>
                </div>
              </div>
              <div class="container" style="display: inline-flex;">
                <div id="lang_selector" class="language-dropdown first">
                  <label
                    for="toggle"
                    class="lang-flag lang-en"
                    title="Click to select the language"
                  >
                    <span class="flag" @click="chooseLang('en_US')"></span>
                  </label>
                </div>

                <div id="lang_selector" class="language-dropdown">
                  <label
                    for="toggle"
                    class="lang-flag lang-zh"
                    title="Click to select the language"
                  >
                    <span class="flag" @click="chooseLang('zh_HK')"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: function() {
    return {
      email: "",
      password: "",
      rememberMe: false,

      has_error: false,
      error_message: ""
    };
  },
  methods: {
    login: function() {
      const app = this;
      this.has_error = false;
      this.error_message = "";

      // check password is not empty
      if (this.password.length === 0) {
        this.error_message = "Password should not be empty";
        this.has_error = true;
        return false;
      }

      // validate email
      let emailReg = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (emailReg.test(this.email) === false) {
        this.error_message = "Email is invalid";
        this.has_error = true;
        return false;
      }

      // all is successful, send the request
      this.axios
        .post(
          "/account/login",
          {
            password: this.password,
            email: this.email
          })
        .then((response)=> {
          console.log(response);
          this.$store.commit('SET_TOKEN',response.data.token)
          localStorage.setItem("token", response.data.token);
          app.axios.defaults.headers["Authorization"] = response.data.token;
          app.$router.push({ name: "Profile" });
        })
        .catch(function(error) {
          console.log(error);
          app.error_message = "Error: " + error.response.data.message;
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
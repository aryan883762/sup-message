<template>
  <div class="card o-hidden border-0 shadow-lg my-5">
    <div class="card-body p-0">
      <!-- Nested Row within Card Body -->
      <div class="row">
        <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
        <div class="col-lg-7">
          <div class="p-5">
            <div class="text-center">
              <h1 class="h4 text-gray-900 mb-4">{{txt('Create an Account')}}!</h1>
              <div class="alert alert-danger" v-if="has_error">{{error_message}}</div>
              <div class="alert alert-success" v-if="has_success">
                {{success_message}} and
                <router-link :to="{name:'Login'}">{{txt('Login')}}</router-link>
              </div>
            </div>
            <form class="user">
              <div class="form-group">
                <input
                  type="email"
                  class="form-control form-control-user"
                  id="exampleInputEmail"
                  :placeholder="txt('Email Address')"
                  v-model="email"
                >
              </div>
              <div class="form-group row">
                <div class="col-sm-6 mb-3 mb-sm-0">
                  <input
                    type="password"
                    class="form-control form-control-user"
                    id="exampleInputPassword"
                    :placeholder="txt('Password')"
                    v-model="password"
                  >
                </div>
                <div class="col-sm-6">
                  <input
                    type="password"
                    class="form-control form-control-user"
                    id="exampleRepeatPassword"
                    :placeholder="txt('Repeat Password')"
                    v-model="repeated_password"
                  >
                </div>
              </div>
              <div class="terms-conditions">
                <input required type="checkbox" name="term" v-model="checked" class="term">
                <p id="terms-conditions">
                  I have read the
                  <a href="/terms_condition">terms and conditions</a> of this company and accepted the
                  <a href="/privacy_policy">privacy policy</a>.
                </p>
              </div>
              <a
                @click="register"
                class="btn btn-primary btn-user btn-block"
              >{{txt('Register Account')}}</a>
            </form>
            <hr>
            <div class="text-center">
              <router-link :to="{name:'ForgotPassword'}" class="small">{{txt('Forgot Password?')}}</router-link>
            </div>
            <div class="text-center">
              <router-link
                class="small"
                :to="{name:'Login'}"
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
  name: "Register",
  data: function() {
    return {
      email: "",
      password: "",
      repeated_password: "",
      checked: false,
      has_error: false,
      error_message: "",

      success_message: "",
      has_success: ""
    };
  },
  computed: {
    /**
     * this will auto compute the full name
     * @author Arsan Gamal
     * @returns {string}
     */
  },
  methods: {
    register: function() {
      const app = this;
      this.has_error = false;
      this.error_message = "";
      // check password confirmation
      if (this.password !== this.repeated_password) {
        this.error_message = "Passwords should match";
        this.has_error = true;
        return false;
      }
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

      if (!this.checked) {
        this.error_message = "Please accept term and condition!";
        this.has_error = true;
        return false;
      }

      // all is successful, send the request
      this.axios
        .post(
          "/account/register",
          {
            password: this.password,
            email: this.email
          })
        .then(function(response) {
          console.log(response);
          app.success_message = response.data.message;
          app.has_success = true;
        })
        .catch(function(error) {
          console.log(error.response);
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
.terms-conditions {
  /* border: 2px red solid; */
  margin-bottom: 20px;
  padding: 10px;
  display: inline-flex;
}

#terms-conditions {
  display: inline;
  font-size: 13px;
  color: black;
  padding: 7px;
  /* border: 2px red solid; */
}
input.term {
  margin-left: 15px;
  margin-top: 10px;
}
</style>
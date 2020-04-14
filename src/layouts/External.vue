<template>
  <div>
    <!-- Navigation -->
    <nav class="navbar navbar-light bg-light static-top">
      <div class="container">
        <a class="navbar-brand" href="/" style="display:inline-flex">
          <div class="sidebar-brand-icon rotate-n-15">
            <img
              src=""
              title="sup"
              width="50"
            >
          </div>
          <div class="sidebar-brand-text mx-3" style="padding-top:10px">sup</div>
        </a>

        <ul class="navbar-nav ml-auto">
          <li class="nav-item" style="padding:15px">
            <select
              class="browser-default custom-select"
              v-model="activeLang"
              @change="changLanguage()"
            >
              <option value="zh_HK">{{txt('繁體中文')}}</option>
              <option value="en_US">{{txt('English')}}</option>
              <!-- <option value="zh_HK">zh_HK</option> -->
            </select>
          </li>
        </ul>
        <a class="btn btn-primary" href="/login" style="margin-right:10px">{{ txt('Sign In') }}</a>
        <a class="btn btn-success" href="/register">{{ txt("Sign Up Free")}}</a>
      </div>
    </nav>
    <div id="content">
      <router-view></router-view>
    </div>
    <!-- Footer -->
    <footer class="footer bg-light">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 h-100 text-center text-lg-left my-auto">
            <ul class="list-inline mb-2">
              <li class="list-inline-item">
                <a href="#">About</a>
              </li>
              <li class="list-inline-item">&sdot;</li>
              <li class="list-inline-item">
                <a href="#">Contact</a>
              </li>
              <li class="list-inline-item">&sdot;</li>
              <li class="list-inline-item">
                <a href="/terms_condition">Terms of Use</a>
              </li>
              <li class="list-inline-item">&sdot;</li>
              <li class="list-inline-item">
                <a href="privacy_policy">Privacy Policy</a>
              </li>
            </ul>
            <p class="text-muted small mb-4 mb-lg-0">Copyright © sup 2019</p>
          </div>
          <div class="col-lg-6 h-100 text-center text-lg-right my-auto">
            <ul class="list-inline mb-0">
              <li class="list-inline-item mr-3">
                <a href="#">
                  <i class="fab fa-facebook fa-2x fa-fw"></i>
                </a>
              </li>
              <li class="list-inline-item mr-3">
                <a href="#">
                  <i class="fab fa-twitter-square fa-2x fa-fw"></i>
                </a>
              </li>
              <li class="list-inline-item">
                <a href="#">
                  <i class="fab fa-instagram fa-2x fa-fw"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "External",
  data: function() {
    return {
      activeLang: localStorage.getItem("activeLang") || "en_US"
    };
  },
  methods: {
    changLanguage: function() {
      localStorage.setItem("activeLang", this.activeLang);
      location.reload();
    }
  }
};
</script>

<style scoped>
.homeHeader {
  min-height: 500px;
  padding-top: 130px;
}
footer {
  padding: 30px;
}
</style>
<template>
  <div>
    <div id="wrapper">
      <ul
        class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <!-- Sidebar - Brand -->
             <router-link class="sidebar-brand d-flex align-items-center justify-content-center" to="/dashboard/profile">
               <div class="sidebar-brand-icon rotate-n-15">
            <img
              src="https://cdn-aws.lncknight.com/sup/logo.png"
              title="sup"
              width="50"
            >
          </div>
          <div class="sidebar-brand-text mx-3">sup</div>
          </router-link>
        <!-- <a class="sidebar-brand d-flex align-items-center justify-content-center" href="/dashboard">
          <div class="sidebar-brand-icon rotate-n-15">
            <img
              src="https://cdn-aws.lncknight.com/sup/logo.png"
              title="sup"
              width="50"
            >
          </div>
          <div class="sidebar-brand-text mx-3">sup</div>
        </a> -->

        <!-- Divider -->
        <hr class="sidebar-divider my-0">

        <!-- Nav Item - Dashboard -->
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'Profile'}">
            <i class="fas fa-fw fa-user"></i>
            <span>{{ txt('Profile') }}</span>
          </router-link>
        </li>
           <li class="nav-item">
          <router-link class="nav-link" :to="{name:'Devices'}">
             <i class="fas fa-mobile-alt"></i>
            <span>{{txt('Devices')}}</span>
          </router-link>
        </li>
             <li class="nav-item">
          <router-link class="nav-link"  to="/dashboard/messages">
               <i class="fas fa-inbox"></i>
            <span>{{txt('Messages')}}</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'Settings'}">
            <i class="fas fa-fw fa-cog"></i>
            <span>{{ txt('Profile Settings')}}</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'Payments'}">
            <i class="fas fa-fw fa-credit-card"></i>
            <span>{{txt('Payments')}}</span>
          </router-link>
        </li>
        <!-- <li class="nav-item">
          <router-link class="nav-link" :to="{name:'EmailHistory'}">
            <i class="fas fa-fw fa-history"></i>
            <span>{{txt('Email History')}}</span>
          </router-link>
        </li> -->
        <li class="nav-item">
          <router-link class="nav-link" :to="{name:'Integration'}">
            <i class="fas fa-fw fa-random"></i>
            <span>{{txt('Integration')}}</span>
          </router-link>
        </li>
          <li class="nav-item">
          <router-link class="nav-link" :to="{name:'Billing'}">
         <i class="fas fa-print"></i>
            <span>{{txt('Billing')}}</span>
          </router-link>
        </li>
        <li class="nav-item">
          <a @click="logout" class="nav-link">
            <i class="fas fa-fw fa-user"></i>
            <span>{{txt('Logout')}}</span>
          </a>
        </li>
      </ul>
      <div id="content-wrapper" class="d-flex flex-column">
        <div id="content">
          <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
              <i class="fa fa-bars"></i>
            </button>

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
              <div class="topbar-divider d-none d-sm-block"></div>
              <li class="nav-item dropdown no-arrow">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span class="mr-2 d-none d-lg-inline text-gray-600 small">{{ email }}</span>
                </a>
                <div
                  class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                  aria-labelledby="userDropdown"
                >
                  <a class="dropdown-item" href="#">
                    <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                    {{txt('Profile')}}
                  </a>
                  <!-- <a class="dropdown-item" href="#">
                                        <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Settings
                  </a>-->
                  <router-link class="dropdown-item" :to="{name:'Settings'}">
                    <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                    <span>{{txt('Profile Settings')}}</span>
                  </router-link>

                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                    <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                    {{txt('Logout')}}
                  </a>
                </div>
              </li>
            </ul>
          </nav>
          <router-view @updateEmail="setCurrentEmail"></router-view>
        </div>
        <footer class="sticky-footer bg-white">
          <div class="container my-auto">
            <div class="copyright text-center my-auto">
              <span>{{txt('Copyright © sup 2019')}}</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
    <a class="scroll-to-top rounded" href="#page-top">
      <i class="fas fa-angle-up"></i>
    </a>
    <div
      class="modal fade"
      id="logoutModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{txt('Ready to Leave?')}}</h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div
            class="modal-body"
          >{{`${txt('Select')} "${txt('Logout')}" ${txt('below if you are ready to end your current session')}.`}}</div>
          <div class="modal-footer">
            <button
              ref="dismiss"
              class="btn btn-secondary"
              type="button"
              data-dismiss="modal"
            >{{txt('Cancel')}}</button>
            <a class="btn btn-primary" @click="logout">{{txt('Logout')}}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Master",
  data: function() {
    return {
      email: "",
      activeLang: localStorage.getItem("activeLang") || "en_US"
    };
  },
  methods: {
    setCurrentEmail: function(email) {
      this.email = email;
    },
    logout: function() {
      this.$refs.dismiss.click();
      localStorage.removeItem("token");
      this.axios.defaults.headers.common["Authorization"] = "";
      this.$router.push({ name: "Login" });
    },
    changLanguage: function() {
      localStorage.setItem("activeLang", this.activeLang);
      location.reload();
    }
  },
  mounted() {
    $("#sidebarToggleTop").on("click", function(o) {
      $("body").toggleClass("sidebar-toggled"),
        $(".sidebar").toggleClass("toggled"),
        $(".sidebar").hasClass("toggled") &&
          $(".sidebar .collapse").collapse("hide");
    });
    $(document).on("scroll", function() {
      100 < $(this).scrollTop()
        ? $(".scroll-to-top").fadeIn()
        : $(".scroll-to-top").fadeOut();
    }),
      $(document).on("click", "a.scroll-to-top", function(o) {
        var e = $(this);
        $("html, body")
          .stop()
          .animate({ scrollTop: 0 }, 1000),
          o.preventDefault();
      });
  }
};
</script>

<style scoped>
</style>
<template>
  <div class="container-fluid">
    <!--        <div class="col-xl-10 col-lg-12 col-md-9">-->
    <div class="row">
      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-success shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div
                  class="text-xs font-weight-bold text-primary text-uppercase mb-1"
                >{{ txt('Balance') }}</div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">USD {{ balance }}</div>
              </div>
              <div class="col-auto">
                <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-success shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div
                  class="text-xs font-weight-bold text-primary text-uppercase mb-1"
                >{{ txt('Settlement Currency') }}</div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">{{ currency }}</div>
              </div>
              <div class="col-auto">
                <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-secondary shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div
                  class="text-xs font-weight-bold text-primary text-uppercase mb-1"
                >{{ txt('Account ID')}}</div>
                <div class="mb-0 font-weight-bold text-gray-800" style="font-size: 13px">{{ id }}</div>
              </div>
              <div class="col-auto">
                <i class="fas fa-user fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-secondary shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div
                  class="text-xs font-weight-bold text-primary text-uppercase mb-1"
                >{{ txt('Email')}}</div>
                <div class="mb-0 font-weight-bold text-gray-800" style="font-size: 13px">{{ email }}</div>
              </div>
              <div class="col-auto">
                <i class="fas fa-user fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-secondary shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div
                  class="text-xs font-weight-bold text-primary text-uppercase mb-1"
                >{{ txt('Creation Date')}}</div>
                <div
                  class="h6 mb-0 font-weight-bold text-gray-800"
                  style="font-size: 13px"
                >{{ created_at }}</div>
              </div>
              <div class="col-auto">
                <i class="fas fa-user fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--        </div>-->
  </div>
</template>

<script>
import store from '../store/store';
export default {
  name: "Profile",
  data: function() {
    return {
      // this is temporary till getting profile attribs
      email: "",
      id: "",
      currency: "",
      balance: 0.0,
      created_at: null
    };
  },
  beforeRouteEnter: function(to, from, next) {
    next(vm => {
      const app = vm;
      vm.getProfile()
    });
  },
  methods: {
   getProfile(){
     const app = this;
      this.axios
        .get("account/me/profile", {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(function(response) {
          store.commit('SET_ACCOUNT_ID',response.data._id);
          app.email = response.data.email;
          app.id = response.data._id;
          app.balance = response.data.balance;
          app.currency = response.data.currency;
          app.created_at = response.data.createdAt;
          app.$emit("updateEmail", response.data.email);
          localStorage.setItem("accountId", app.id);
          localStorage.setItem("email", app.email);
          app.getApiInfo();
        })
        .catch(function(error) {
          console.log(error.response);
        });
   },
   getApiInfo(){
     const app = this;
         this.axios
        .get(`/account/${store.getters.accountID}/apiInfo`)
        .then(function(response) {
          store.commit('SET_API_SECRET',response.data.secret);
        })
        .catch(function(error) {
          // console.log(error.response);
        });
   }
  },
  watch: {}
};
</script>

<style scoped>
</style>
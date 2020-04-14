<template>
  <!-- Begin Page Content -->
  <div class="container-fluid">
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">{{ txt('Integration')}}</h1>
    </div>

    <!-- DataTales Example -->
    <div class="card shadow mb-4">
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <form>
              <div class="form-group row">
                <label for="staticEmail" class="col-md-3 col-form-label">{{ txt('API secret')}}</label>
                <div class="col-md-9">
                  <!-- <input
                    :type="passwordFieldType"
                    id="secret"
                    class="form-control"
                    v-model="secret"
                  >-->
                  <input
                    :type="passwordFieldType"
                    id="password"
                    class="form-control"
                    v-model="secret"
                  >

                  <span
                    toggle="#password-field"
                    class="fa fa-fw fa-eye field-icon toggle-password"
                    v-bind:class="[isActive ? 'fa-eye fa-eye-slash' : 'fa fa-fw fa-eye','fa fa-fw fa-eye']"
                    @click="switchVisibility"
                  ></span>
                </div>
              </div>
              <div class="form-group row">
                <label for="inputPassword" class="col-md-3 col-form-label">{{ txt('Sample Code')}}</label>
                <div class="col-md-9">
                  <select
                    class="browser-default custom-select"
                    v-model="selectedSampleCode"
                    @change="showDetails(selectedSampleCode)"
                  >
                    <option v-for="option in sampleCode" v-bind:value="option">{{ option }}</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
          <div class="col-md-6">
            <div class="form-group row">
              <div class="col-md-12">
                <div class="card shadow mb-4">
                  <div class="card-header py-3 d-flex flex-row justify-content-between">
                    <h6
                      class="m-0 font-weight-bold text-primary"
                    >{{`${(selectedSampleCode!='')?selectedSampleCode:'Code'}`}}</h6>
                  </div>

                  <div class="card-body curl">
                    <pre v-highlightjs="codeDetail"><code v-bind:class="{ php: selectedSampleCode=='php', 'js': selectedSampleCode=='node' }">
                
                      </code></pre>

                    <!-- <code v-if="selectedSampleCode==''">#Empty</code> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /.container-fluid -->
</template>

<script>
export default {
  name: "Integration",
  beforeRouteEnter: function(to, from, next) {
    next(vm => {
      const app = vm;
      app.id = localStorage.getItem("accountId");
      vm.axios
        .get(`/account/${app.id}/apiInfo`, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(function(response) {
          app.secret = response.data.secret;
          app.codeSampleResponse = response.data;
          app.codeResponse = response.data.codes;
          app.sampleCode = Object.getOwnPropertyNames(
            app.codeSampleResponse.codes
          );
          app.sampleCode.pop();
          app.selectedSampleCode = app.sampleCode[0];
          app.codeDetail = app.codeResponse[app.selectedSampleCode];
        })
        .catch(function(error) {
          // console.log(error.response);
        });
    });
  },
  data: function() {
    return {
      // this is temporary till getting profile settings attribs
      passwordFieldType: "password",
      secret: "",
      curl: "",
      splitedCurl: [],
      sampleCode: [],
      id: "",
      isActive: false,
      selectedSampleCode: "",
      codeSampleResponse: {},
      codeDetail: "",
      codeResponse: {}
    };
  },
  methods: {
    switchVisibility() {
      if (this.passwordFieldType === "password") {
        this.passwordFieldType = "text";
        this.isActive = true;
      } else {
        this.passwordFieldType = "password";
        this.isActive = false;
      }
    },
    showDetails(code) {
      this.codeDetail = this.codeResponse[code];
    }
  }
};
</script>

<style scoped>
.field-icon {
  float: right;
  margin-left: -25px;
  margin-top: -25px;
  position: relative;
  z-index: 2;
  margin-right: 5px;
}
img {
  background: #eae8e8;
  height: 50px;
}
p {
  background: #efe9e9;
}
/* .curl.card-body {
  background-color: #273656;
}
pre {
  color: #e83e8c !important;
} */
</style>
<template>
  <div class="container-fluid device">
    <div class="overlay" v-if="!isLoaded">
    <div class="overlay__inner">
        <div class="overlay__content"><span class="spinner"></span></div>
    </div>
   </div>
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">{{txt('Billing')}} {{txt('Info')}}</h1>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card shadow mb-1">
          <div class="card-header py-3 d-flex flex-row justify-content-between">
            <h6 class="m-0 font-weight-bold text-primary">  <i class="fas fa-print"></i> {{txt('Billing')}}</h6>
              <div>
                <label style="top:-7px;position:relative">{{txt('Date')}} </label>&nbsp;&nbsp;
            <select
              class="browser-default custom-select form-control selectTag"
              v-model="billingDate"
              id="billingDate"
              @change="changeBillingDate"
              style="width:150px"
            >
              <option value disabled>{{txt('Select date')}}</option>
              <option
                v-for="(bDate, index) in billingDates"
                v-bind:value="bDate"
                :key="index"
              >{{bDate}}</option>
            </select>
              </div>
          </div>
        <div class="card-body" style="padding:0;">
          <div class="collapse-group">
            <div class="panel panel-default">
              <div class="panel-heading" role="tab" id="headingOne">
                <h5 class="panel-title">
                  <a role="button" data-toggle="collapse" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne" class="trigger">
                    {{`${billingInfo?Object.keys(billingInfo.usageInfo):''}` }}
                  </a>
                </h5>
              </div>
              <div id="collapseOne" class="panel-collapse collapse billing show" role="tabpanel" aria-labelledby="headingOne" >
                <div class="panel-body" v-if="billingInfo">
                   <div class="text-right"><span >{{billingInfo.usageInfo.whatsapp.total | toCurrency}}</span></div>
                    <div class="card mb-3" v-for="(item,index) in billingInfo.usageInfo.whatsapp.items" :key="index">
                         
                          <div class="card-header  d-flex flex-row justify-content-between p-0">
                            {{txt(item.name)}}
                          </div>
                            <div class="card-body p-0" style="color:#747272">
                              <div class="row">
                              <div class="col-md-7">
                                ${{item.unitPrice}} {{`${(item.unit)?'per 1 '+item.unit:''}`}}{{`${item.deviceId?', Device '+ item.deviceId:''}`}}
                              </div>
                               <div class="col-md-3">
                                 {{item.units}} {{`${(item.units>1)?item.unit+'s':(item.unit)?item.unit:''}`}}
                              </div>
                               <div class="col-md-2 text-right">
                                 {{`${item.total?item.total:'0'}` | toCurrency}}
                              </div>
                              </div>
  
                            </div>
                    </div>
                  
                </div>
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
import toast from '../services/toast';
import store from '../store/store';
export default {
  name: "Billing",
  beforeRouteEnter: function(to, from, next) {
    next(vm => {
      const app = vm;
      vm.getBillingDates();
   
    });
  },
  data: function() {
    return {
      billingInfo: '',
      billingDate: '',
      billingDates: '',
      billingDate: '',
      isLoaded: false
    };
  },
  methods: {
   getBillingInfo(customDate){
      const app = this;
      this.axios
        .get(`/account/${store.getters.accountID}/billing?date=${customDate}`)
        .then(response => {
             app.billingInfo = response.data; 
             app.isLoaded = true;
        })
        .catch(function(error) {
           toast.error(error.response.data.message)
        });
   },
   getBillingDates(){
      const app = this;
      this.axios
        .get(`/account/${store.getters.accountID}/billingDates`)
        .then(response => {
             app.billingDates = response.data.dates; 
             if(app.billingDates.length>0)
             {
               app.billingDate = response.data.dates[0];
               app.getBillingInfo(app.billingDate);
             }
         
        })
        .catch(function(error) {
           toast.error(error.response.data.message)
        });
   },
   changeBillingDate(){
     this.getBillingInfo(this.billingDate);
   }
  
  },
  mounted(){

  },
  beforeDestroy() {

  }
};
</script>

<style scoped>

.collapse-group {
  padding: 30px;

}
#collapseOne{
  font-size: 18px;
}
.panel-title .trigger:before {
	content: "\25bc";
  font-family: 'Glyphicons Halflings';
  vertical-align: text-bottom;
}

.panel-title .trigger.collapsed:before {
  content: '\25BA';
}
h5 a{
  text-decoration: none;
}
div.billing .card{
 border: none;
 padding-left: 25px;
}
div.billing .card-header{
   border-bottom: 2px solid #e3e6f0;
   background:#ffff;
}
#billingDate:before{
  content: 'Date';
}
.overlay {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    background: #222222a1;
    z-index: 99;
}

.overlay__inner {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    position: absolute;
}

.overlay__content {
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
}

.spinner {
    width: 75px;
    height: 75px;
    display: inline-block;
    border-width: 2px;
    border-color: rgba(255, 255, 255, 0.05);
    border-top-color: #fff;
    animation: spin 1s infinite linear;
    border-radius: 100%;
    border-style: solid;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
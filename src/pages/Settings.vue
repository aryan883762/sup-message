<template>
  <div class="container-fluid">
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">{{txt('Profile Settings')}}</h1>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card shadow mb-4">
          <div class="card-header py-3 d-flex flex-row justify-content-between">
            <h6 class="m-0 font-weight-bold text-primary">{{txt('Auto charge and email receiving')}}</h6>
          </div>
          <div class="alert alert-danger" v-if="has_error && !has_success">{{error_message}}</div>
          <div class="alert alert-success" v-if="has_success && !has_error">{{success_message}}</div>
          <div class="card-body">
            
            <label>{{txt('*Enable/Disable your options')}}</label>
            <br>
            
                <label>{{txt('Settlement currency')}}</label>
            <select
              class="browser-default custom-select form-control selectTag"
              v-model="currency"
              id="currency"
              @change="currencySettlement"
            >
              <option value disabled>{{txt('Select currency')}}</option>
              <option
                v-for="(currency, index) in settlementCurrencies"
                v-bind:value="currency"
                :key="index"
              >{{currency}}</option>
            </select>
            
                <label>{{txt('Webhook')}}</label>
            <input
              class="browser-default form-control"
              v-model="webhook"
              id="webhook"
              @change="updateWebhook"
              placeholder="https://example.com/hooks"
              type="url"
            >
            <br><br>
            <div class="clearfix"></div>
            <br>

            <label for="autoCharge" class="btn btn-primary">
              {{txt('Auto charge')}}
              <input
                type="checkbox"
                id="autoCharge"
                v-model="autoCharge"
                @change="paymentSetting"
                class="badgebox"
              >
              <span class="badge">&check;</span>
            </label>
            <label for="emailReceive" class="btn btn-primary">
              {{txt('Email')}}
              <input
                type="checkbox"
                id="emailReceive"
                v-model="receiveEmail"
                @change="emailSetting"
                class="badgebox"
              >
              <span class="badge">&check;</span>
            </label>
            <br>

            <label v-if="autoCharge">{{txt('Auto charge Amount')}}</label>
            <input
              type="number"
              v-model="autoChargeAmount"
              class="form-control"
              id="autoChargedAmount"
              placeholder="Enter Auto Charge Amount..."
              v-if="autoCharge"
              @blur="paymentSetting"
            >
            <br>
            <label v-if="autoCharge">{{txt('Select card')}}</label>
            <select
              class="browser-default custom-select form-control selectTag"
              v-model="cardId"
              id="card"
              @change="paymentSetting"
              v-if="autoCharge"
            >
              <option value disabled>{{txt('Select card')}}</option>
              <option
                v-for="(option,index) in paymentCardRecords"
                v-bind:value="option._id"
                :key="index"
              >{{ `XXXX XXXX XXXX ${(option.stripeCustomer.sources)?option.stripeCustomer.sources.data[0].last4:''}(${(option.stripeCustomer.sources)?option.stripeCustomer.sources.data[0].brand:''})` }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Settlement } from '../core/const';
import toast from '../services/toast';
export default {
  name: "Settings",
  beforeRouteEnter: function(to, from, next) {
    next(vm => {
      const app = vm;

      vm.axios
        .get("account/me/profile")
        .then(function(response) {
          app.id = response.data._id;
          app.receiveEmail = response.data.setting.receiveEmail;
          app.webhook = response.data.setting.webhook;
          app.autoCharge = response.data.paymentSetting.autoCharge;
          app.autoChargeAmount = response.data.paymentSetting.autoChargeAmount;
          app.currency = response.data.currency;
          app.cardId = response.data.paymentSetting.cardId;
          app.$emit("updateEmail", response.data.email);
          app.getCards();
        })
        .catch(function(error) {
          console.log(error.response);
        });
    });
  },
  data: function() {
    return {
      // this is temporary till getting profile settings attribs
      has_error: false,
      error_message: "",
      settlementCurrencies: Settlement.currency,
      success_message: "",
      has_success: false,
      receiveEmail: false,
      webhook: "",
      id: "",
      autoCharge: false,
      autoChargeAmount: 0,
      paymentCardRecords: [],
      cardId: "",
      currency: ""
    };
  },
  methods: {

    emailSetting() {
       this.axios.put(
        `account/${this.id}/setting`,
        {
          receiveEmail: this.receiveEmail
        }
      ).then(response => {
                toast.success('Updated successfully.')
        })
        .catch(function(error) {
         toast.error(error.response.data.message)
      });
    },

    paymentSetting() {
       let param = this.autoCharge
        ? {
            autoCharge: this.autoCharge,
            autoChargeAmount: +this.autoChargeAmount,
            cardId: this.cardId
          }
        : {
            autoCharge: this.autoCharge
          }; 
          if((this.autoCharge && this.autoChargeAmount && this.cardId) || !this.autoCharge){
          this.axios.put(`account/${this.id}/paymentSetting`, param
            ).then(response => {
                      toast.success('Updated successfully.')
              })
              .catch(function(error) {
              toast.error(error.response.data.message)
            });
          }
   
    },
    currencySettlement(){
        this.axios.put(`account/${this.id}/paymentSetting`, {currency: this.currency}
            ).then(response => {
                      toast.success('Updated successfully.')
              })
              .catch(function(error) {
              toast.error(error.response.data.message)
            });
    },

    updateWebhook(){
      this.axios.put(`account/${this.id}/setting`, {webhook: this.webhook}
      ).then(response => {
        toast.success('Updated successfully.')
      })
      .catch(function(error) {
        toast.error(error.response.data.message)
      });
    },

    getCards() {
      const app = this;
      this.axios
        .get("/cards")
        .then(response => {
          app.paymentCardRecords = response.data;
        })
        .catch(function(error) {
          console.log(error.response);
        });
    }
  }
};
</script>

<style >
/* Hiding the checkbox, but allowing it to be focused */
.badgebox {
  opacity: 0;
}

.badgebox + .badge {
  text-indent: -999999px;
  width: 27px;
}

.badgebox:focus + .badge {
  box-shadow: inset 0px 0px 5px;
}

.badgebox:checked + .badge {
  text-indent: 0;
}
.btn-primary .badge {
  color: #428bca;
  background-color: #fff;
}
div.card-body {
  text-align: left;
}
label.btn-primary {
  margin-right: 20px;
}
.alert {
  margin: 0 auto;
  width: 95%;
  margin-top: 6px;
}
select.selectTag {
  margin-bottom: 15px;
}
</style>
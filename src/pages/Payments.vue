<template>
  <!-- Begin Page Content -->
  <div class="container-fluid">
    <!-- Page Heading -->

    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">{{ txt('Payments')}}</h1>
    </div>
    <div class="row" style="margin-bottom:10px">
      <div class="col-lg-8 col-md-4"></div>
      <div class="col-lg-2 col-md-4">
        <button class="btn btn-primary w-100 payment" @click="checkout">
          <i class="fas fa-plus fa-sm fa-fw mr-2 text-gray-400"></i>
          {{ txt('Add card')}}
        </button>
      </div>

      <div class="col-lg-2 col-md-4">
        <button class="btn btn-success w-100 payment" data-toggle="modal" data-target="#topupModal">
          <i class="fas fa-arrow-up fa-sm fa-fw mr-2 text-gray-400"></i>
          {{ txt('Top up now')}}
        </button>
      </div>
    </div>
    <!-- Get Payment Cards List-->
    <div class="card shadow mb-4">
      <div class="card-header py-3 d-flex flex-row justify-content-between">
        <h6 class="m-0 font-weight-bold text-primary">{{txt('Payment Cards')}}</h6>
      </div>
      <div class="card-body" style="padding:0">
        <br>
        <PaymentCards :isCardAdded="isCardAdded"></PaymentCards>
      </div>
    </div>
    <!-- End Get Payment Cards List-->
    <!-- Get Payment History Logs -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">{{txt('Payment History')}}</h1>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card shadow mb-4">
          <div class="card-header py-3 d-flex flex-row justify-content-between">
            <h6 class="m-0 font-weight-bold text-primary">{{txt('Payment logs (status)')}}</h6>
          </div>
          <div class="card-body">
            <PaymentHistory :paymentHistoryLogs="paymentRecords"></PaymentHistory>
          </div>
        </div>
      </div>
    </div>
    <!-- End Get Payment History Logs -->

    <!--Top up Model -->
    <div
      class="modal fade"
      id="topupModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{txt('Top up now!')}}</h5>
            <button
              class="close"
              type="button"
              ref="dismiss"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="alert alert-danger" v-if="has_error && !has_success">{{error_message}}</div>
              <div class="alert alert-success" v-if="has_success && !has_error">{{success_message}}</div>
              <div class="form-group row">
                <label for="card" class="col-md-3 col-form-label">{{txt('Select card')}}</label>
                <div class="col-md-9">
                  <select class="browser-default custom-select" v-model="cardId" id="card" required>
                    <option value disabled>Select card</option>
                    <option
                      v-for="option in paymentCardRecords"
                      v-bind:value="option._id"
                    >{{ `XXXX XXXX XXXX ${(option.stripeCustomer.sources)?option.stripeCustomer.sources.data[0].last4:''}(${(option.stripeCustomer.sources)?option.stripeCustomer.sources.data[0].brand:''})` }}</option>
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <label for="pay" class="col-md-3 col-form-label">{{txt('Amount')}}</label>
                <div class="col-md-9">
                  <input type="number" id="pay" class="form-control" v-model="amount" required>
                </div>
              </div>
            </form>
          </div>

          <div class="modal-footer">
            <button
              ref="dismiss"
              class="btn btn-secondary"
              type="button"
              data-dismiss="modal"
            >{{txt('Cancel')}}</button>
            <a class="btn btn-primary" @click="pay">{{txt('Pay Now')}}</a>
          </div>
        </div>
      </div>
    </div>
    <!--End Top up MOdel -->

    <vue-stripe-checkout
      ref="checkoutRef"
      :image="image"
      :name="name"
      :email="email"
      :description="description"
      data-label="Start trial"
      :allow-remember-me="false"
      @done="done"
    ></vue-stripe-checkout>
  </div>
  <!-- /.container-fluid -->
</template>

<script>
import PaymentHistory from "./shared/PaymentHistory";
import PaymentCards from "./shared/PaymentCards";
import { setTimeout } from "timers";
export default {
  name: "Payments",
  components: {
    PaymentHistory,
    PaymentCards
  },

  beforeRouteEnter: function(to, from, next) {
    next(vm => {
      const app = vm;
      app.email = localStorage.getItem("email");
      vm.getCardsAndPaymentHistory();
    });
  },
  data: function() {
    return {
      // this is temporary till getting profile settings attribs
      paymentRecords: [],
      paymentCardRecords: [],
      image: "https://cdn-aws.lncknight.com/sup/logo.png",
      name: "sup",
      description: "",
      email: "",
      currency: "USD",
      amount: 0,
      cardId: "",
      error_message: "",
      has_error: false,
      success_message: "",
      has_success: false,
      isConfirm: false,
      isCardAdded: false
    };
  },
  methods: {
    getCardsAndPaymentHistory() {
      const app = this;
      this.has_error = false;
      this.has_success = false;
      this.error_message = "";
      this.axios
        .all([
          this.getCards(), //or direct the axios request
          this.getPaymentHistory()
        ])
        .then(
          this.axios.spread((cards_response, paymentHistory_response) => {
            app.paymentCardRecords = cards_response.data;
            app.paymentRecords = paymentHistory_response.data;
          })
        )
        .catch(function(error) {
          console.log(error.response);
        });
    },
    getCards() {
      return this.axios.get("/cards", {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });
    },
    getPaymentHistory() {
      const app = this;
      app.accountId = localStorage.getItem("accountId");
      return this.axios.get(`/account/${app.accountId}/payments`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });
    },
    async checkout() {
      // token - is the token object
      // args - is an object containing the billing and shipping address if enabled
      const { token, args } = await this.$refs.checkoutRef.open();
    },
    done({ token, args }) {
      const app = this;
      this.axios
        .post(
          "/cards",
          {
            auth: token
          },
          {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          }
        )
        .then(function(response) {
          console.log(response);
          app.isCardAdded = true;
        })
        .catch(function(error) {
          console.log(error.response);
          app.isCardAdded = false;
        });
      // token - is the token object
      // args - is an object containing the billing and shipping address if enabled
      // do stuff...
    },
    pay() {
      const app = this;
      this.has_error = false;
      this.error_message = "";
      this.has_success = false;
      this.success_message = "";
      // check valid
      if (this.cardId == "") {
        this.error_message = "Select valid card";
        this.has_error = true;
        return false;
      }
      // check amount is not zero
      if (this.amount == 0) {
        this.error_message = "Amount should not be zero";
        this.has_error = true;
        return false;
      }
      this.axios
        .post(
          `/cards/${this.cardId}/charge`,
          {
            amount: this.amount
          },
          {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          }
        )
        .then(function(response) {
          app.success_message = "Thank you! Payment made successfully.";
          app.has_success = true;
          setTimeout(() => {
            app.$refs.dismiss.click();
          }, 5000);
        })
        .catch(function(error) {
          app.error_message = "Error: " + error.response.data.message;
          app.has_error = true;
        });
    }
  }
};
</script>

<style scoped>
td.remove {
  text-align: center;
}
td.remove a {
  cursor: pointer;
}
button.btn.payment {
  margin-bottom: 5px;
}
</style>
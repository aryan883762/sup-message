  <template>
  <div class="changelog">
    <div class="row">
      <div class="container">
        <div class="row" v-for="item in paymentHistoryLogs">
          <div class="col-xs-6 col-md-3 col-lg-2">
            <div class="version badge badge-info">
              {{item.createdAt | MonthDate}}
              <br>
              <small>{{item.createdAt | formatDate}}</small>
            </div>
          </div>
          <div class="col-xs-6 col-md-9 col-lg-10">
            <div class="list-group">
              <a href="javascript:void(0)" class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between paymentHistory">
                  <h5 class="mb-1">{{txt('Amount')}}: {{item.amount}}</h5>
                  <small
                    v-bind:class="{'text-success':item.status=='SUCCESS','text-danger':item.status=='FAILED', 'text-warning':item.status=='PENDING'}"
                  >{{txt(item.status)}}</small>
                </div>
                <h4 class="mb-1">{{txt('Currency')}}: {{item.currency}}</h4>
                <div
                  class="reason badge badge-danger"
                  v-if="item.status=='FAILED'"
                >{{txt('Reason')}}</div>
                <p class="mb-1 failed" v-if="item.status=='FAILED'">{{item.reason}}</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaymentHistory",
  props: ["paymentHistoryLogs"]
};
</script>
<style scoped>
/* Payment History */
.changelog {
  padding: 20px;
}
.changelog .container {
  background-color: #efefef;
  padding: 20px;
}
.changelog .container .row {
  margin-bottom: 20px;
}
.changelog .container .version.badge {
  padding: 10px;
  font-size: 16px;
  margin-bottom: 5px;
}
.changelog .container .reason.badge {
  margin-bottom: 5px;
  display: inline-block;
  padding: 6px;
  font-size: 11px;
}
.changelog .container .list-group h5 {
  font-size: 18px;
  color: #489b98;
}
.changelog .container .list-group h4 {
  font-size: 15px;
  color: #5f3434;
}
.changelog .container .list-group p {
  font-size: 14px;
  color: #e74a3b;
  display: inline-block;
  margin-left: 5px;
}
.changelog .container .list-group .text-muted {
  color: #aaa !important;
}
small {
  font-weight: 600 !important;
}
</style>
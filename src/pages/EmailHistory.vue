<template>
  <!-- Begin Page Content -->
  <div class="container-fluid">
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">{{txt('Email Logs')}}</h1>
    </div>

    <!-- DataTales Example -->
    <div class="card shadow mb-4">
      <div class="card-body">
        <div class="row">
          <div class="col-md-3">
            <label>{{txt('Start Date')}}</label>
            <datepicker
              :placeholder="txt('Select Date')"
              :format="format"
              v-model="dateFrom"
              :language="dLanguages[language]"
              id="sdt"
            ></datepicker>
          </div>
          <div class="col-md-3">
            <label>{{txt('End Date')}}</label>
            <datepicker
              :placeholder="txt('Select Date')"
              v-model="dateTo"
              :format="format"
              :language="dLanguages[language]"
              name="endDate"
              id="edt"
            ></datepicker>
          </div>
          <div class="col-md-3">
            <label>{{txt('Status')}}</label>
            <select class="browser-default custom-select" v-model="status">
              <option selected value="0">{{txt('Any')}}</option>
              <option value="PENDING">{{txt('PENDING')}}</option>
              <option value="FAILED">{{txt('FAILED')}}</option>
              <option value="SUCCESS">{{txt('SUCCESS')}}</option>
            </select>
          </div>
          <div class="col-md-3">
            <label>&ensp;</label>
            <button
              class="btn btn-primary w-100"
              @click="searchRefresh()"
            >{{txt('Search')}}</button>
          </div>
        </div>
        <br>
        <div class="table-responsive">
          <b-table
            ref="table"
            id="table-transition-example"
            :busy.sync="isBusy"
            :items="search"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            :sort-by.sync="mySortBy"
            :sort-desc.sync="mySortDesc"
            striped
            small
            primary-key="identifier"
          ></b-table>
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :perPage="perPage"
            first-text="<<"
            prev-text="<"
            next-text=">"
            last-text=">>"
          ></b-pagination>
        </div>
      </div>
    </div>
  </div>
  <!-- /.container-fluid -->
</template>

<script>
import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker.esm.js";
import * as lang from "vuejs-datepicker/src/locale";
import moment from 'moment';

export default {
  name: "EmailHistory",
  components: {
    Datepicker
  },

  data: function() {
    return {
      // this is temporary till getting profile settings attribs
      format: "yyyy-MM-dd",
      language: localStorage.getItem("activeLang").split("_")[0] || "zh",
      dLanguages: lang,
      emailRecords: [],
      id: "",
      dateFrom: moment().subtract(7, 'day').toDate(),
      dateTo: moment().add(1, 'day').toDate(),
      // items: [],
      fields: [
        {key: "createdAt", sortable: true, label: this.txt("Created At"),
          formatter: v => moment(v).format('YYYY-MM-DD HH:mm:ss')},
        {
          key: "phoneNumber", sortable: true, label: this.txt("Phone Number"),
          formatter: (value, key, item) => {
            return `+${item.phoneCountryCode}${item.phoneNumber}`
          }
        },
        {key: "message", sortable: true, label: this.txt("Message")},
        {key: "price", sortable: true, label: this.txt("Price"), formatter: (value, key, item) => {
            return item.currency ? `${item.currency} ${item.price}` : '-'
          }
        },
        {key: "status", sortable: true, label: this.txt("Status")},
        {key: "test", sortable: true, label: this.txt("Test"),
          formatter: v => {return v ? this.txt('YES') : this.txt('NO')}},
      ],
      isBusy: false,
      totalRows: 1,
      currentPage: 1,
      perPage: 15,
      status: "SUCCESS",
      mySortBy: "",
      mySortDesc: "",
      filter: null,
    };
  },
  beforeRouteEnter: function(to, from, next) {
    next(vm => {

    });
  },
  methods: {
    searchRefresh(){
      this.$refs.table.refresh()
    },
    search(ctx) {
      this.isBusy = true;
      let aId = localStorage.getItem("accountId");
      this.currentPage = 1;

      let params = {}

      let url = `/account/${aId}/messages`;

      let offset =
        this.currentPage === 1 ? 0 : (this.currentPage - 1) * this.perPage;

      params.limit = this.perPage
      params.skip = offset

      if (this.dateTo) {
        params.dateTo = moment(this.dateTo).format('YYYY-MM-DD')
      }
      if (this.dateFrom) {
        params.dateFrom = moment(this.dateFrom).format('YYYY-MM-DD')
      }

      if (ctx.sortBy) {
        params.sort = ctx.sortBy
        params.sortDesc = ctx.sortDesc ? "desc" : "asc"
      }

      if (this.status) {
        params.status = this.status
      }

      return this.axios.get(url, {
        headers: {
          Authorization: localStorage.getItem("token")
        },
        params
      }).then(res => {
          var items = res.data.messages;
          // this.items = res.data.messages;
          this.totalRows = res.data.total;
          this.isBusy = false;
          items.map((x, i) => {
            x.status = this.txt(x.status);
          });

          return items || [];
        }).catch(err => {
          this.isBusy = false;
          return [];
        });
    }
  },
  watch: {

  }
};
</script>

<style >
#sdt,
#edt {
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 1.75rem 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #6e707e;
  background-color: #fff;
  border: 1px solid #d1d3e2;
  border-radius: 0.35rem;
}
</style>
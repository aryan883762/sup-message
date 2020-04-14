<template>
  <div class="">
    <div class="row">
      <div class="col-lg-12">
        <div class="card shadow mb-1">
          <div class="card-header py-3 d-flex flex-row justify-content-between">
            <p class="m-0  text-primary">{{txt('Messages')}} ({{txt('showing')}} {{`${messages.length>0?tOffset+1+'-':'0'}`}}{{messages.length>0?messages.length+tOffset:''}})</p>
    
            <!-- <button
              class="btn btn-primary w-10"
            > <i class="far fa-paper-plane"></i> Send message</button> -->
               <router-link class="btn btn-primary w-10 "  :to="{name:'SendMessage'}">
             <i class="far fa-paper-plane"></i> 
            <span class="p-1">{{txt('Send message')}} </span>
          </router-link>
       
          </div>
        <div class="card-body" style="padding-top: 0;font-size: 15px;">
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

           <div class="table-responsive msg">
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
            small
            primary-key="identifier"
          >

      <!-- A custom formatted column -->
         <template v-slot:cell(_id)="data">
       <i class="fas fa-eye text-primary"></i>
      </template>
      <!-- <template v-slot:cell(phoneNumber)="data">
        <p class="text-primary"><i class="fas fa-fw fa-user" style="color:#858796"></i>{{ data.value }}</p>
      </template> -->
          <template v-slot:cell(phoneNumber)="data">
        <span class="text-primary"><i class="fas fa-fw fa-user" style="color:#858796"></i>{{ data.value }}</span>
      </template>
         <template v-slot:cell(status)="data" >

          <span class="blink running" v-if ="data.value=='SUCCESS'">&nbsp;</span>
          <span class="blink stopped" v-if="data.value=='FAILED'">&nbsp;</span>
          <span class="blink pending" v-if="data.value=='PENDING'">&nbsp;</span>
          <span class="text">{{ txt(data.value) }}</span>

         </template>
            <template v-slot:cell(createdAt)="data">
              {{ data.value }}
         </template>
             <template v-slot:cell(message)="data">
        <p class="text-primary">{{ data.value }}</p>
      </template>
          </b-table>
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
    </div>
    



  </div>
</template>
<script>
import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker.esm.js";
import * as lang from "vuejs-datepicker/src/locale";
import moment from 'moment';

export default {
  name: "messageHome",
  components: {
    Datepicker
  },
  beforeRouteEnter: function(to, from, next) {
  next(vm => {
  });
  },

  data () {
    return {
      format: "yyyy-MM-dd",
      language: localStorage.getItem("activeLang").split("_")[0] || "zh",
      dLanguages: lang,
      id: "",
      dateFrom: moment().subtract(7, 'day').toDate(),
      dateTo: moment().add(1, 'day').toDate(),
      messages: [],
      id: "",
      tOffset: 0,
      fields: [
           {key: "_id", sortable: true, label: '',
          formatter: (value, key, item) => {
            return item._id;
          }
        },
        {key: "phoneNumber", sortable: true, label: this.txt("TARGET"),
          formatter: (value, key, item) => {
            return `+${item.phoneCountryCode}${item.phoneNumber}`
          }
        },
        {
          key: "fromPhone", label: this.txt("FROM PHONE"),
          formatter: (value, key, item) => {
            if(item.fromPhoneCountryCode && item.fromPhoneNumber) {
                return `+${item.fromPhoneCountryCode}${item.fromPhoneNumber}`
              }else {
                 return '-';
              }
          }
        },
        {key: "status", sortable: true, label: this.txt("STATUS")},
        {key: "createdAt", sortable: true, label: this.txt("CREATED"),
      formatter: v => moment(v).format('YYYY-MM-DD HH:mm:ss')},
       {key: "channel", sortable: true, label: this.txt("TYPE")},
        {key: "message", sortable: true, label: this.txt("MESSAGE")}
      ],
      isBusy: false,
      totalRows: 1,
      currentPage: 1,
      perPage: 15,
      status: "SUCCESS",
      mySortBy: "",
      mySortDesc: "",
      filter: null,
    }
  },
 methods: {
    searchRefresh(){
      this.$refs.table.refresh()
    },
    search(ctx) {
      this.isBusy = true;
      let aId = localStorage.getItem("accountId");
      let params = {}

      let url = `/account/${this.$store.getters.accountID}/messages`;

      let offset =
        this.currentPage === 1 ? 0 : (this.currentPage - 1) * this.perPage;

      params.limit = this.perPage
      params.skip = offset
      this.tOffset = offset;
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
        params
      }).then(res => {
          var items = res.data.messages;
          this.messages = res.data.messages;
          this.totalRows = res.data.total;
          this.isBusy = false;
          items.map((x, i) => {
            // x.status = this.txt(x.status);
            x['fromPhone'] = ''
          });

          return items || [];
        }).catch(err => {
          this.isBusy = false;
          return [];
        });
    }
  },
  mounted(){
  
  }
};
</script>

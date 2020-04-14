import Vue from 'vue';

import moment from 'moment'

const formatDate = Vue.filter("formatDate", function (value) {
    if (value) {
        return moment(String(value)).format("MM/DD/YYYY hh:mm");
    }
});
const MonthDate = Vue.filter("MonthDate", function (value) {
    if (value) {
        return moment(String(value)).format("MMM DD");
    }
});
const localDate = Vue.filter("localDate", function (value) {
    if (value) {
     var local_date= moment.utc(value).local().format('YYYY-MM-DD HH:mm:ss');
        return local_date;
    }
});
//e.g 1 sec ago, 1 hr ago ...
const timeAgo = Vue.filter("timeAgo", function(value){
    var result = '';
    if(value){
      var date_now = new Date();
      let date = new Date(value);
      var date_past = date.toLocaleString();
      var delta = Math.abs(new Date(date_past) - date_now) / 1000;
      var days = Math.floor(delta / 86400);
      delta -= days * 86400;
      var hours = Math.floor(delta / 3600) % 24;
      delta -= hours * 3600;
      var minutes = Math.floor(delta / 60) % 60;
      delta -= minutes * 60;
      var seconds = delta % 60;
      if(days == 0 && hours && minutes){
         result = `${hours}h, ${minutes}m ago`;
      } 
      if(days == 0 && hours == 0 && minutes){
        result = `${minutes} min ago`;
      }
      if(days == 0 && hours == 0 && minutes && seconds >= 1){
        result = `${minutes} min, ${Math.round(seconds)} sec ago`;
      }
      if(days == 0 && hours == 0 && minutes == 0 && seconds >=1 ){
        result = `${Math.round(seconds)} sec ago`;
      }
      if(days == 0 && hours == 0 && minutes == 0 && (seconds >= 0 && seconds < 1)){
        result = `just now`;
      }
      if(days > 0){
        result = `${days} days ago`
      }
  
     return result;
    }
  })


const toCurrency = Vue.filter('toCurrency', function (value) {
  // if (typeof value !== "number") {
  //   return value;
  // }
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
  return formatter.format(value);
})

  export default {
    formatDate,
    MonthDate,
    localDate,
    timeAgo,
    toCurrency,
  }
<template>
  <div class="container-fluid device">
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">{{txt('Device status')}}</h1>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card shadow mb-1">
          <div class="card-header py-3 d-flex flex-row justify-content-between">
            <h6 class="m-0 font-weight-bold text-primary">{{txt('Devices')}}</h6>
    
            <button
              class="btn btn-primary w-10"
              @click="resetForm()"
              data-toggle="modal" data-target="#deviceModal"
            ><i class="fas fa-plus-circle"></i> {{txt('Create device')}}</button>
       
          </div>
        <div class="card-body" style="padding:0;font-size:13px" id="no-more-tables" >
          <table class="table" v-if="hasDevices && devices.length>0">
            <thead>
              <tr>
                <th>{{txt('Device')}}</th>
                <th>{{txt('Status')}}</th>
                <th>{{txt('Type')}}</th>
                <th>{{txt('Phone')}}</th>
                <th>{{txt('Create date')}}</th>
                <th></th>
              </tr>
            </thead>
          <tbody>
            <tr v-for="device in devices">
                <td scope="row" data-title="Device" :key="device._id">{{device.deviceId}}</td>
                <td data-title="Status">
                  <span class="blink running" v-if ="device.status=='RUNNING'">&nbsp;</span>
                  <span class="blink stopped" v-if="device.status=='STOPPED'">&nbsp;</span>
                  <span class="blink pending" v-if="device.status=='PENDING'">&nbsp;</span>
                {{txt(device.status)}}</td>
                <td data-title="Type">{{txt(device.type)}}</td>
                <td data-title="Phone">{{device.phoneNumber}}</td>
                <td data-title="Create date">{{device.createdAt | localDate}}</td>
                <td> 
                  <div class="btn-group">
                      <button type="button" class="btn btn-default dropdown-toggle p-0 actions" data-toggle="dropdown">
                        <i class="fas fa-mobile-alt"></i> {{txt('Actions')}} <span class="caret"></span>
                      </button>
                        <ul class="dropdown-menu" role="menu">
                          <li><a href="javascript:void(0)" @click="startDevice(device.deviceId)"><i class="fas fa-play"></i> {{txt('Start')}}</a></li>
                          <li><a href="javascript:void(0)" @click="stopDevice(device.deviceId)"><i class="fas fa-stop"></i> {{txt('Stop')}}</a></li>
                          <li><a href="javascript:void(0)" @click="deleteDevice(device.deviceId)"><i class="fas fa-trash-alt"></i> {{txt('Delete')}}</a></li>
                      </ul>
                    </div>
                </td>
              </tr>
            </tbody>
          </table>
      
          </div>
        </div>
      </div>
    </div>
       <div class="row" v-if="!hasDevices && devices.length==0">
      <div class="col-lg-12">
        <div class="card shadow mb-4">
          <div class="card-body text-center" >
            <div>
                <i class="fas fa-mobile-alt custom"></i>
                <h2>{{txt('Need more devices?')}}</h2>
                <p class="mb-1">{{txt('If you have multiple WhatsApp numbers, you can create multiple devices as well.')}}</p>
                <p class="mb-5">{{txt('Our elastic platform can scale with your needs.')}}</p>
                  <button @click="resetForm()"
              data-toggle="modal" data-target="#deviceModal"
              class="btn btn-primary w-10"
            > <i class="fas fa-mobile-alt"></i> {{txt('Create device')}}</button>
            </div>
          </div>
        </div>
      </div>
    </div>


       <!--New Device Model -->
    <div
      class="modal fade"
      id="deviceModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="deviceModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deviceModalLabel">{{txt('New device')}} <small>({{txt('Enter device information')}})</small></h5>
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
                <div class="alert alert-danger" v-if="has_error">{{error_message}}</div>
              <div class="form-group row">
                <label for="country" class="col-md-4 col-form-label">{{txt('Country Alias')}}<span style="color:red">*</span></label>
                <div class="col-md-8 txt-left">
                  <select class="browser-default custom-select" v-model="countryCode" id="country" required>
                    <option value disabled>{{txt('Select country')}}</option>
                    <option  value="HK"
                    >Hong Kong</option>
                  </select>
                  <p>{{txt('Enter an alias for your personal reference that can help you to identify the device.')}}</p>
                </div>
              </div>
              <div class="form-group row">
                <label for="deviceType" class="col-md-4 col-form-label">{{txt('Type')}} ({{txt('Optional')}})</label>
                <div class="col-md-8">
                  <select class="browser-default custom-select" v-model="deviceType" id="deviceType">
                    <option value disabled>{{txt('Select type')}}</option>
                    <option  value="whatsapp"
                    >WhatsApp</option>
                  </select>
                </div>
              </div>
              <div class="row">
                <label  class="col-md-4 col-form-label"></label>
                <div class="col-md-8 txt-left">
                <div class="terms-conditions">
                <input required type="checkbox" name="term" id="whatsAppTerms" v-model="whatsAppTerms"  class="term">
               <label for="whatsAppTerms" id="terms-conditions"> {{txt('I undersatand the rist of violating')}} <a href="https://sup.com/terms-and-conditions/">WhatsApp API {{txt('terms')}}</a>, {{txt('such as sending spam or unsolicited marketing messages')}}.</label>
              </div>
                </div>
              </div>
               <div class="row">
                <label  class="col-md-4 col-form-label"></label>
                <div class="col-md-8 txt-left">
                <div class="terms-conditions">
                <input required type="checkbox" id="serviceTerms" name="term" v-model="serviceTerms"  class="term" >
                <label for="serviceTerms" id="terms-conditions">
                 {{txt('I agree the')}} <a href="https://sup.com/terms-and-conditions/">{{txt('service terms')}}</a> {{txt('and')}} <a href="https://sup.com/our-privacy-policy/">{{txt('data privacy')}}</a> {{txt('policy')}}.
                </label>
              </div>
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
            <a class="btn btn-primary" @click="createDevice()">{{txt('Create')}}</a>
          </div>
        </div>
      </div>
    </div>
    <!--End Top up MOdel -->
  </div>
</template>

<script>
import toast from '../services/toast';
export default {
  name: "Devices",
  beforeRouteEnter: function(to, from, next) {
    next(vm => {
      const app = vm;
      vm.getDevices();
    });
  },
  data: function() {
    return {
      countryCode: '',
      deviceType: 'whatsapp',
      devices:[],
      hasDevices: false,
      serviceTerms: false,
      whatsAppTerms: false,
      has_error: false,
      error_message: '',
      deviceTimer: null
    };
  },
  methods: {
  getDevices(){
   const app = this;
      this.axios
        .get("/devices")
        .then(response => {
             app.devices = response.data;
             if(response.data.length>0){
              app.hasDevices = true;
             }
          
        })
        .catch(function(error) {
           toast.error(error.response.data.message)
        });
   },
   createDevice(){
      const app = this;
      this.has_error = false;
      this.error_message = "";
      // check country
      if (this.countryCode == "") {
        this.error_message = "Field required: Please select country.";
        this.has_error = true;
        return false;
      }
      // check term and condition
      if (!this.whatsAppTerms || !this.serviceTerms) {
        this.error_message = "Please accept terms and conditions!";
        this.has_error = true;
        return false;
      }
      this.axios
        .post(`/devices/create`, { countryCode: app.countryCode, type: app.deviceType })
        .then(response => {
             app.has_error = false;
             app.error_message = '';
             app.getDevices();
             toast.success('Device created successfully!');
             app.$refs.dismiss.click();

        })
        .catch(function(error) {
           toast.error(error.response.data.message)
        });
   },
  startDevice(_deviceID){
      const app = this;
      this.axios
        .post(`/devices/${_deviceID}/start`)
        .then(response => {
             app.getDevices();
             toast.success(response.data.status)
        })
        .catch(function(error) {
           toast.error(error.response.data.message)
        });
   },
  stopDevice(_deviceID){
      const app = this;
      this.axios
        .post(`/devices/${_deviceID}/stop`)
        .then(response => {
              app.getDevices();
              toast.success(response.data.status)
        })
        .catch(function(error) {
             toast.error(error.response.data.message)
        });
   },
  deleteDevice(_deviceID){
     const app = this;
      this.axios
        .delete(`/devices/${_deviceID}`)
        .then(response => {
           app.getDevices();
           toast.success(response.data.status)
        })
        .catch(function(error) {
             toast.error(error.response.data.message);
        });
      },
      resetForm(){
       this.has_error = false;
       this.error_message = ''
      }
  },
  mounted(){
    const app = this;
   this.deviceTimer = setInterval(function(){ 
    app.getDevices();
     }, 10000);
  },
    beforeDestroy() {
     clearInterval(this.deviceTimer);
    }
};
</script>

<style scoped>
@import "../assets/devices.css";
</style>
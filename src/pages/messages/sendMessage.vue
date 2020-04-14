<template>
  <div class="device">
    <div class="row">
      <div class="col-lg-12">
        <div class="card shadow mb-1">
          <div class="card-header py-3 d-flex flex-row justify-content-between">
            <h6 class="m-0 font-weight-bold text-primary"> {{txt('Send Messages')}}</h6>
          </div>
           <div class="card-body" style="padding:15px;font-size:13px" id="no-more-tables" >
    <div class="row">
           <div class="col-lg-4 col-md-12 col-xs-12 text-center">
            
               <img src="../../assets/images/messageIcon.png" style="height:100px">
           </div>
     <div class="col-lg-8 col-md-12 col-xs-12">
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                <label for="device">{{txt('Device')}}<span>*</span></label>
                    <select class="form-control" v-model="device" required>
                        <option value disabled>{{txt('Select device')}}</option>
                        <option   v-for="device in devices" 
                      v-bind:value="device.phoneNumber" :key="device._id" v-if="device.status=='RUNNING'">{{device.phoneNumber}}</option>
                     </select>
                   
                </div>
            </div>
        </div>
         <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                        <label>{{txt('Target')}}</label>
                          <div class="form-group">
                     <div class="custom-control custom-radio custom-control-inline">
                       <br>
      <input type="radio" class="custom-control-input" id="customRadio1" name="example1" checked>
      <label class="custom-control-label" for="customRadio1" checked>{{txt('Phone')}}</label>
    </div>
                          </div>
                </div>
          
            </div>
             <div class="col-md-6">
                <div class="form-group">
                <label for="device">{{txt('Phone Number')}}</label>
                  <input type="text" class="form-control" required v-model="targetNumber" placeholder="+85212345678">
                </div>
            </div>
        </div>
         <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                <label for="device">{{txt('Message')}}</label>
                 <textarea class="form-control" v-model="messageText" required rows="5" id="comment" placeholder="Type message..."></textarea>
                </div>
            </div>
        </div>
          <div class="row">
                <div class="col-md-12">
                <div>
                <label>
              {{txt(`Maximum 4000 charaters, Multiple lines are allowed. Message text can be empty if there is a mdeia file attached.
                    WhatsApp rich text syntax is allowed.`)}}
                </label>
              </div>
                </div>
              </div>
              <div class="row">
              <div class="col-md-12">
                 <button
              class="btn btn-primary w-10"
              @click="sendMessage()"
            > <i class="far fa-paper-plane"></i> {{txt('Send message')}}</button>
              </div>
              </div>
              <div class="row">
         
                   <div class="alert alert-danger" v-if="has_error">{{error_message}}</div>
            
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
import toast from '../../services/toast';
import store from '../../store/store';
export default {
  name: "sendMessage",
    beforeRouteEnter: function(to, from, next) {
  next(vm => {
    const app = vm;
    vm.getDevices();

   
  });
  },

  data () {
    return {
      messages: [],
      devices: [],
      device: '',
      targetNumber: '',
      messageText: '',
      has_error: false,
      error_message: ''
    }
  },
  methods: {
      getDevices(){
   const app = this;
      this.axios
        .get("/devices")
        .then(response => {
             app.devices = response.data; 
        })
        .catch(function(error) {
           toast.error(error.response.data.message)
        });
   },
   onDeviceChange(device){
console.log(device);
   },
   sendMessage(){
     const vm = this;
      this.has_error = false;
      this.error_message = "";
      // check country
      if (this.device == "") {
        this.error_message = "Field required: Please select device.";
        this.has_error = true;
        return false;
      }
     if (this.targetNumber == "") {
        this.error_message = "Field required: Please enter target phone number.";
        this.has_error = true;
        return false;
      }
      if (this.messageText == "") {
      this.error_message = "Field required: Message should not be empty.";
      this.has_error = true;
      return false;
    }
    let data = {
      	"secret": store.getters.secret,
        "fromPhone": vm.device,
        "phone": vm.targetNumber,
        "message": vm.messageText
    }
   this.axios
        .post(`/whatsapp/send`,data)
        .then(response => {
        console.log(response)
          app.has_error = false;
             app.error_message = '';
           toast.success('Message send succesfully.')
        })
        .catch(function(error) {
           toast.error(error.response.data.message)
        });
   }
  }
};
</script>
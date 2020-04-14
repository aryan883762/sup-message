<template>
    <div class="container-fluid">
          <nav class="navbar navbar-expand navbar-light bg-white topbar mb-1 static-top">
                <div class="collapse navbar-collapse" id="navbarSupportedContent-5">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item b-r-1" >
                              <router-link class="nav-link" active-class="active" :to="{name:'MessageHome'}">
         <i class="fas fa-inbox"></i>
            <span class="p-1">{{txt('Messages')}}</span>
          </router-link>
                       
                        </li>
                        <li class="nav-item">
                          <router-link class="nav-link" active-class="active" :to="{name:'SendMessage'}">
          <i class="fas fa-paper-plane"></i>
         
            <span class="p-1">{{txt('Send message')}}</span>
          </router-link>
                            
                        </li>
                    </ul>
                    <ul class="navbar-nav ml-auto nav-flex-icons">
                        <li class="nav-item">
                            <a class="nav-link waves-effect waves-light"> <i class="fa fa-envelope"></i></a>
                        </li>
                    </ul>
                </div>
            </nav>  
      <router-view></router-view>
    </div>
</template>
<script>
export default {
  name: "MessageLayout"
};
</script>
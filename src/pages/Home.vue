<template>
  <div>
    <!-- Header -->
    <header class="mb-5 homeHeader">
      <div class="container h-100">
        <div class="row h-100 align-items-center">
          <div class="col-lg-12">
            <div class="sidebar-brand-icon rotate-n-15">
              <img
                src="https://cdn-aws.lncknight.com/sup/logo.png"
                title="sup"
                width="50"
              >
            </div>
            <h1 class="display-4 text-white mt-5 mb-2">Welcome to sup!</h1>
            <!-- <p
              class="lead mb-5 text-white-50"
            >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non possimus ab labore provident mollitia. Id assumenda voluptate earum corporis facere quibusdam quisquam iste ipsa cumque unde nisi, totam quas ipsam.</p>-->
          </div>
        </div>
      </div>
    </header>

    <!-- Page Content -->

    <div class="container">
      <!-- <div class="row">
        <div class="col-md-8 mb-5">
          <h2>What We Do</h2>
          <hr>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A deserunt neque tempore recusandae animi soluta quasi? Asperiores rem dolore eaque vel, porro, soluta unde debitis aliquam laboriosam. Repellat explicabo, maiores!</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis optio neque consectetur consequatur magni in nisi, natus beatae quidem quam odit commodi ducimus totam eum, alias, adipisci nesciunt voluptate. Voluptatum.</p>
          <a class="btn btn-primary btn-lg" href="#">Call to Action &raquo;</a>
        </div>
        <div class="col-md-4 mb-5">
          <h2>Contact Us</h2>
          <hr>
          <address>
            <strong>Start Bootstrap</strong>
            <br>3481 Melrose Place
            <br>Beverly Hills, CA 90210
            <br>
          </address>
          <address>
            <abbr title="Phone">P:</abbr>
            (123) 456-7890
            <br>
            <abbr title="Email">E:</abbr>
            <a href="mailto:#">name@example.com</a>
          </address>
        </div>
      </div>-->
      <!-- /.row -->

      <!-- <div class="row">
        <div class="col-md-4 mb-5">
          <div class="card h-100">
            <img class="card-img-top" src="http://placehold.it/300x200" alt>
            <div class="card-body">
              <h4 class="card-title">Card title</h4>
              <p
                class="card-text"
              >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente esse necessitatibus neque sequi doloribus.</p>
            </div>
            <div class="card-footer">
              <a href="#" class="btn btn-primary">Find Out More!</a>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-5">
          <div class="card h-100">
            <img class="card-img-top" src="http://placehold.it/300x200" alt>
            <div class="card-body">
              <h4 class="card-title">Card title</h4>
              <p
                class="card-text"
              >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente esse necessitatibus neque sequi doloribus totam ut praesentium aut.</p>
            </div>
            <div class="card-footer">
              <a href="#" class="btn btn-primary">Find Out More!</a>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-5">
          <div class="card h-100">
            <img class="card-img-top" src="http://placehold.it/300x200" alt>
            <div class="card-body">
              <h4 class="card-title">Card title</h4>
              <p
                class="card-text"
              >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente esse necessitatibus neque.</p>
            </div>
            <div class="card-footer">
              <a href="#" class="btn btn-primary">Find Out More!</a>
            </div>
          </div>
        </div>
      </div>-->
      <!-- /.row -->
    </div>
    <!-- /.container -->

    <!-- Testimonials -->
    <section class="testimonials text-center bg-light">
      <div class="container">
        <h2 class="mb-5">What people are saying...</h2>
        <div class="row">
          <div class="col-lg-4">
            <div class="testimonial-item mx-auto mb-5 mb-lg-0">
              <img
                class="img-fluid rounded-circle mb-3"
                src="../assets/images/testimonials-1.jpg"
                alt
              >
              <h5>Margaret E.</h5>
              <p class="font-weight-light mb-0">"This is fantastic! Thanks so much guys!"</p>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="testimonial-item mx-auto mb-5 mb-lg-0">
              <img
                class="img-fluid rounded-circle mb-3"
                src="../assets/images/testimonials-2.jpg"
                alt
              >
              <h5>Fred S.</h5>
              <p
                class="font-weight-light mb-0"
              >"Supermeteror is amazing. I've been using it to access lots of email features."</p>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="testimonial-item mx-auto mb-5 mb-lg-0">
              <img
                class="img-fluid rounded-circle mb-3"
                src="../assets/images/testimonials-3.jpg"
                alt
              >
              <h5>Sarah W.</h5>
              <p
                class="font-weight-light mb-0"
              >"Thanks so much for making these free resources available to us!"</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Call to Action -->
    <section class="call-to-action text-white text-center">
      <div class="overlay"></div>
      <div class="container">
        <div class="row">
          <div class="col-xl-9 mx-auto">
            <h2 class="mb-4">Ready to get started? Sign up now!</h2>
          </div>
          <div class="col-md-10 col-lg-8 col-xl-7 mx-auto">
            <form>
              <div class="form-row">
                <div class="col-12 col-md-9 mb-2 mb-md-0">
                  <input
                    type="email"
                    class="form-control form-control-lg"
                    placeholder="Enter your email..."
                  >
                </div>
                <div class="col-12 col-md-3">
                  <a href="/register" class="btn btn-block btn-lg btn-primary">Sign up!</a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Home",
  data: function() {
    return {
      activeLang: localStorage.getItem("activeLang") || "en_US"
    };
  },
  methods: {
    changLanguage: function() {
      localStorage.setItem("activeLang", this.activeLang);
      location.reload();
    }
  }
};
</script>

<style scoped>
.homeHeader {
  min-height: 500px;
  padding-top: 130px;
  background-color: #222d4b !important;
}
.testimonials {
  /* padding-top: 7rem; */
  padding-bottom: 7rem;
}

.testimonials .testimonial-item {
  max-width: 18rem;
}

.testimonials .testimonial-item img {
  max-width: 12rem;
  -webkit-box-shadow: 0px 5px 5px 0px #adb5bd;
  box-shadow: 0px 5px 5px 0px #adb5bd;
}
.call-to-action {
  position: relative;
  background-color: #343a40;
  /* background: url("../img/bg-masthead.jpg") no-repeat center center; */
  background-size: cover;
  padding-top: 7rem;
  padding-bottom: 7rem;
}

.call-to-action .overlay {
  position: absolute;
  background-color: #212529;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  opacity: 0.3;
}

footer.footer {
  padding-top: 4rem;
  padding-bottom: 4rem;
}
</style>
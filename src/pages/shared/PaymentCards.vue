  <template>
  <div class="row">
    <div class="container" style="text-align:center">
      <div class="panel payment" v-for="(item,index) in paymentCardRecords" :key="index" >
        <div class="card card--front test" title="Click to set the card to default card."   @click="confirmationDialog(item._id,setToDefaultCard,'Please confirm that you want to set default card.')"  id="test" :class="{
      'active': item.default}">
          <div
            class="card__number"
          >XXXX XXXX XXXX {{ (item.stripeCustomer.sources)?item.stripeCustomer.sources.data[0].last4:''}}</div>
          <!--<div class="card__expiry-date">10/17</div>-->
          <div
            class="card__owner"
          >
            <!--{{(item.stripeCustomer.name)?item.stripeCustomer.name:'Jane Doe'}}-->
          </div>
          <div
            class="card__logo"
          >{{ (item.stripeCustomer.sources)?item.stripeCustomer.sources.data[0].brand:''}}</div>
         
  
           <span class="defaultCard" v-if="item.default">Default</span>
        </div>
                  <a class="remImage" id="delete" @click="confirmationDialog(item._id,removeCard,'Please confirm that you want to delete.') && removeCard(item._id)">
            <img
              src="https://image.flaticon.com/icons/svg/261/261935.svg"
              style="width:40px;height:40px;"
            >
          </a>
      </div>
    </div>
  </div>
</template>

<script>
import toast from '../../services/toast';
export default {
  name: "PaymentCards",
  props: ["configLang", "isCardAdded"],
  data: function() {
    return {
      cardId: "",
      paymentCardRecords: [],
      isConfirm: false
    };
  },
  methods: {
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
    },
    removeCard(_id) {
      const app = this;
      this.axios
        .delete(`/cards/${_id}`)
        .then(function(response) {
          toast.success('Card removed successfully.')
          app.getCards();
        })
        .catch(function(error) {
          app.error_message = "Error: " + error.response.data.message;
          toast.error(error.response.data.message)
        });
    },
     confirmationDialog(_id,methodC,msg) {
      this.isConfirm = false;
      this.$bvModal
        .msgBoxConfirm(msg, {
          title: "Please Confirm",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "YES",
          cancelTitle: "NO",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          this.isConfirm = value;
          if (this.isConfirm) {
            methodC(_id);
          }
        })
        .catch(err => {
          // An error occurred
        });
    },
    setToDefaultCard(_id){
       console.log(_id)
         const app = this;
      this.axios
        .put(`/cards/${_id}`,{
          default: true
        })
        .then(function(response) {
          toast.success('Card updated successfully.')
          app.getCards();
        })
        .catch(function(error) {
          app.error_message = "Error: " + error.response.data.message;
          toast.success(error.response.data.message)
        });
    }
  },
  mounted: function() {
    this.getCards();
  },
  watch: {
    isCardAdded: function(newVal, oldVal) {
      if (newVal == true) {
        this.getCards();
      }
    }
  }
};
</script>
<style scoped>
.panel.payment {
  /* margin-right: 24px; */
  margin-bottom: 25px;
  display: inline-flex;
  cursor: pointer;
}

.payment .card {
  font: 16px/1.5 "Helvetica Neue", Helvetica, sans-serif;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 100%;
  max-width: 275px;
  min-width: 150px;
  height: 165px;
  text-align: left;
  padding: 30px;
  color: #fff;
  border-radius: 20px;
  box-sizing: border-box;
  background: url(data:image/jpg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABGAAD/7gAmQWRvYmUAZMAAAAABAwAVBAMGCg0AAAWlAAAFyQAACgMAAA1W/9sAhAAEAwMDAwMEAwMEBgQDBAYHBQQEBQcIBgYHBgYICggJCQkJCAoKDAwMDAwKDAwNDQwMEREREREUFBQUFBQUFBQUAQQFBQgHCA8KCg8UDg4OFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wgARCAEOAakDAREAAhEBAxEB/8QAggABAQEBAQEBAAAAAAAAAAAAAAECBQQDBwEBAQEBAAAAAAAAAAAAAAAAAAECAxABAAAAAAAAAAAAAAAAAAAAoBEBAAAAAAAAAAAAAAAAAAAAoBIBAAAAAAAAAAAAAAAAAAAAoBMBAQEBAQEBAQADAQAAAAAAABEBECAwQFBwgKCQ/9oADAMBAAIRAxEAAAH8078BAQAAAhIhAAUFABapTRpLQoKUpSmqppKarRaqCKIAUHK5alCEAKAQEiAApaoAAKaKaspQCgpSlrRpNGqpqhSAhAQHM56hCCAFUEBIAFqlKACFKU1ZopQACgpa0aTRqtVSoUkWEJEIc7GoQkBSFAAQQLVNFKhSRQKaspo0AAAClrRpNGq1VKVBCLkkZIeDGoZIICgABAUpopUtASALWjRotEpFRAClqmk3WjVUpUEIuTMZIeLFysIQFAiUIClKU0lqgEEKpo0WtIUEiogBa0aTVaNVopUEIuTMZIeLFysIAAEiiApSmi2aABAUpTRqqhQSLIAFrRU0brRa0UJFhmMkIeDFiwIUCAgIUFKaS1SgEKCmi1pBQRUSkQorRU0arRqtFQRYZiEBzsagCAFgIQApSmktUFABSlLVKgLBEABS1TSU3Wq0UJFhIyBXM5aChQQEIICqDRSpaoBQUpS1UKJAAgAKWqaNpqtVoEISIQVyuWqUVQCEECVYFoaKVBaoKUpSggABAAAUtaNJutGqAzEIAcnlu1UoqkAiAAAtUpSpS1SlKAAQAAgABSmjVbTVUpCEiChyeXSpaqCggAAAKUtUoKlLWigEBAAAQAFKU2arSUpAQigcnlu1UtCgIAIAUFKWqUFNJRVIIgCkKIAEoLVNGjVUIWCJQHK5bpaqCgAUAAKEpSgtUpQUgBAAACgApUtaKUAEABzOe6C0ABUAAApaFKEoKUCkCAAAoqgFBSlSirECiAHOxupQAAKoAAKVBQWgKCgAgABQVBQWgKUFAIAAeDnu0AQpABQAC1QUAoCChRAAAVKKpQgoBQAAFAHixqgEFAAAUIKCgtAACgEAgBVKUqC0ABQABAKB5M0ACAAAFFCgFAQpKAAAsBQlBapQAUAAAAAp5c6IIAQAAoABQKFAAKAQAAoKVKBVAAAKAIAHmzoAQAAUACCgAAoAAAAAKKpQUAAAoAAKAefNAgAIAACigABQACoUQAoQUFAqgAAAoAi0EfCUQAEAAAABQAAKoAAAAKAVAAKAAAUAoB8c0QUBAAAAAACgAAoBACgCqAAUAAAFAKCnxzQSAKQSgAAAAKAAAAAAUAAoAAABQAUAp8pSFAiFAAAIAoAFIAAAABQAAAUAAAFAKAYlAgAIEAAKAAsAFAAAAAAAABQAAAUAFBmUCAEAAAAICgAAUCFAAAIAAKFBAAKoBEtFSBACAAEAAABQAAALIABAFACgKAogAACgARKAgAIAAAACgAgAAAAAAABQAAAAUAogShAAQAAAAAoBAAAAAAAAAAAUAAAoBYgoQAEAAAABQCAAAAAAAAAAAAAAoBQWBKEABAAAAAUAgAAAAAAAAAAAAAC1AKf/2gAIAQEAAQUCZZ//2gAIAQIAAQUCZZ//2gAIAQMAAQUCZZ//2gAIAQICBj8CZZ//2gAIAQMCBj8CZZ//2gAIAQEBBj8CZZ//2gAIAQEDAT8h/FET+DfxxET+BfxxET8eM/q4xn9TGfLf5eMZ8Nb/AC8Yz+rjGf1cYz5X+TWazWb8qv8AGqqzWazWaq+6v7r8Kqs1ms1VVVVVVfFX8tVVVVXxfFVms1VVVVVXzVVftVVVVVVVVVVV81VVVVVVV8VVX61VVVVVVVVVVV9VVVVVVVV8VVVVVfhVVVVVVVVVVVVfVVVVVVVVfFVVVVVVXl5VVVVVVVVVVVVVVVVVVVVVVVVfFXlVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVfjVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVflVVeVVVVVVVVVVVVVVVVVVVVVVVVVVX71VVVVVVV5VVVXlVVVVVVVVVVVVX8dVV7VVVVfFVVVVVVVVVVVVX8t/BVVVVVVVVVVeX+PVVVXtVeXt/k363/ef//aAAgBAgMBPyH/ALLP/9oACAEDAwE/If8Ass//2gAMAwEAAhEDEQAAEIIJJJAW+3322ycmaaStgH7oTBJFtBJIJIX2/wAkQGRa0ym7aBtYQQCCCSTvQCDtsiLZQLFpJbLaBtCHGSJKSZnySCf2JPPLI3LbZLKBtCYmiIECT+SSCSRb23/0pCmLJITlCYmyalgCQBSSADO2mu0qGQxJaR3wYuya1ySSQySSZU220nYHQzJaD8qJMBYHyEBQQQSZ23im5Q0mKLKC+6BuDIAQG1QSSQZk0kULSEiLZJAPkDeRbRIQLCTeCBMk0/bQgbJZLKTPQCBLStwASd14RJ8m7bJbJLJJZSc4Qa39huCB9t/yTdklLbLbMyk0pRmCX+0MPt/ttvtgLf0hKm2km20nIPvt5JDiAEk20/8AIEzdNfaaW27ZrQFEUAej7bQAAAv78gWWgkAkgCy9O2xpJL4kkLbf7Eg77fvf7f7pEESbr6W2lf8A34ABJH/zIIABIBBH3yZBABCScJKCf23+BBMl+0tgBm5B+32/+0kOksABJAe++STYALe/ZE+TJAJb2lrW323/AJCCQD7tv9rZd+wbZJbbSSkE0m22tv8AesAEgAkkgmb9JJtpJb/2y2SQAFpL/wC3/wD/AP8A+7BEttsltoJKVslttsgJJABIQJID326AABIBObybSbbf/wD9JLaACAASAQv/ALbb/b7/AG/Sbbbbbb+2/wDpP/paASQAASQSCBJ9pu22222kl/8A/wD/ANv/AKS222S2Wy3SXSSSTbJJBtttttJP/wD22/8A9vt9AZIbttpJI20kkkkkkm20km20m0kAIBJABJbJJJAEAAAE22kA22gA5AAAYADJJJIBJJI22/8AbaSEgSSSyWCAAAAAAASwAGSSSSSSS2SSSW2SySAgAgAAACwAySSSSSSSW/2SS/4SWAgAAAAAAAGSSSAAAAAD/wD/AP8A5PASAAAAAAAEAGSSAAAAAAB//wD/AOwnj//aAAgBAQMBPxBebvL51rW8iIzoiIzGYzGYzGYiIzGYxjGMYxjGd3PFZvhu8vb41vIiMxngIjMZjMZjMZiIiMxjGMYxjGMREbnNVeN7vL293sRmMxhnRERmMxmMxmIiInMYxnTGM8bjWtbqta3m+98ZjMZjMREREZjMZjMZiInjOYzwMYzuta1qtxvy3xmMxmMxE5ucjMZjMZjMRE5ueMZ0xjGd1reN5rWtxETzvMYxjMZ3c5OZjMZjGed7jGeBjGd1vTUa1vw3xjGMZ6zGMYz1vjGNNNM1msXm61rW83W9iJzebzOYxjGeYxjGM7ebvKqs1ms1pppms3u63Wt5G6vvW+cYxms1VXuMYxiqq8vjNZrNZrTTTNZqt1ut1u+FXlXm7zfGaxms1ms1V5jGMZyqqqqryqzWazwAzWardbrdVV3jCs1VVVVVVWazWazWaqqxjGcqqqqqqqrxhnkAZw3W63VVWGGazVVVXlVVZrNZrNZrNVms1ms1VVVXiqqqq8YZ4AYZw003wGGazWb0qqqqqqzWazWazWazWazWavxAKq8VVYZ0GGdGm+AzWazV8hVVVVWazWazWazWGGGfYAAqs1msMMMc7984zWazfIVVVVVWazWazWdGGGfUABVVWawwwz4//NZrN+IBVVVZrNZ4DPuXMKqqrDDDPj/qzV+gAKwzfyAAAM/EAP5VXpfmAGfiAAAwwwz8IAEKqqqqv6wAAADDDDPwgAAqqqqqr5C/lAAAMMMM/CAACqqqqqqqqr9QAL7ArOGfiAAAqqqqqqqqqqqr5Cr8AFVfygAAFVVVVXFVVVVVVVeKqqqqqqqqq/hAAC8VVVVVVVVVVVVVVVVVVVVVVVVVfYFXwLxV4vKqqqqqqqqqqqquqqqqqqqqqqqq8VVVVVVVV8qvaqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr2r+Gqqqqqqqqqqqqqqqqqqqqr43fFVVVfdVV9VVXtVVVVXtVVVVVV7vi/Cqv4qqqq+Kqqvavne75v4Kqqqqqr6qrnqr27+PPNX7VV9VVXtXzvjflnjd/JVVfrv4d/Xm/Lfrnjf4P//aAAgBAgMBPxD/ABDf94L/AMVf/9oACAEDAwE/EP8Az5if4En/ALXf/9k=)
    no-repeat 0 0 #141819;
  background-size: cover;
}
.payment .card.active {
   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.73), 0 1px 2px rgba(0, 0, 0, 0.76);
}
.card__number {
  font-size: 17px;
  padding: 39px 0 5px;
  text-align: center;
}
.card__expiry-date {
  font-size: 11px;
  padding-bottom: 13px;
  text-align: center;
}
.card__owner {
  text-align: left;
}
.card__logo {
  position: absolute;
  right: 20px;
  bottom: 20px;
}
.card__strip {
  background: #000;
  height: 50px;
  margin-bottom: 30px;
}
.card__signature {
  float: left;
  width: 65%;
  height: 40px;
  margin-left: 10px;
  background: #999;
}
.card__ccv {
  float: left;
  margin-top: 5px;
  padding: 7px;
  background: #fff;
  color: #111;
  line-height: 1;
}
.card--front {
  font-size: 16px;
  font-family: "Source Code Pro";
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.6);
}
.card--back {
  padding-left: 0;
  padding-right: 0;
  text-align: left;
}
a#delete {
   cursor: pointer;
   position: absolute;
}
a.remImage img {
  box-shadow: none;
  position: absolute;
  margin-top: 4px;
  opacity: 0;
  display: block;
  transition: all 0.5s ease-in-out;
}
div.panel.payment:hover a.remImage img {
  opacity: 1;
  z-index: 99;
  position: absolute;
}
.test:after {
  content: "";
  width: 275px;
  height: 165px;
  position: absolute;
  display: block;
  background: rgba(0, 0, 0, 0.6);
  top: 0px;
  z-index: 0;
  opacity: 0;
  transition: all 0.5s ease-in-out;
}
</style>
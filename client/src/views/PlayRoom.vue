<template>  
  <section id="playroom">
    <div class="title-area bg-dark">
        <h1>
          Welcome to the TYPING RACE, IkhsanGama!. Your goal is to duplicate the provided
          text, EXACTLY, in the field below. Good Luck!
        </h1>
    </div><br>

    <div class="test-area">
      <div class="badge badge-primary text-wrap">
        <p>{{ this.testText }}</p>
      </div>
    </div>
        <center><textarea name="input" form="input" cols="50" rows="4">Type here...</textarea></center>
            <form id="input">
              <!-- <input type="textarea" v-model="testAreaInput" placeholder="type here" class="center"><br><br> -->
              <button @click="reset" class="btn btn-warning flex-parent jc-center">Submit</button>
            </form>
    <div>
      <!-- <section id="clock">
        <div class="timer">00:00:00</div>
        </section> -->
    </div>
       
        <!-- .test-area -->
  </section>
</template>

<script>
export default {
  name: "PlayRoom",
  data() {
    return {
      testText: "",
      testAreaInput: "",
      spellCheck: false,
      borderColor: "grey",
    };
  },
  methods: {
    reset() {
      this.testAreaInput = "";
    },
  },
  computed: {},
  watch: {
    testAreaInput() {
      console.log(this.testAreaInput);

      let originTextMatch = this.testText.substring(
        0,
        this.testAreaInput.length
      );

      if (this.testAreaInput == this.testText) {
        console.log("finish");
        this.borderColor = "green";
        // clearInterval(interval);
      } else {
        if (this.testAreaInput == originTextMatch) {
          console.log("true");
          this.borderColor = "blue";
        } else {
          console.log("false");
          this.borderColor = "red";
        }
      }
    },
  },
};
</script>

<style>
/* Typography */

input,
select,
p {
  font-family: 'Balsamiq Sans', cursive;
  text-align: center;
}
/* textarea {
  font-family: 'Balsamiq Sans', cursive;
  font-size: 18px;
  line-height: 1.5;
} */

h1 {
  text-align: center;
  font-size: 20px;
  font-family: 'Balsamiq Sans', cursive;
}

p {
  text-align: center;
  margin-bottom: 1.5em;
}

/* Layout */
body {
  background: cornflowerblue;
}

.title-area {
  padding: 1em 0.5em;
  background-color: #0d1b2e;
  color: white;
}

.test-area {
  margin: auto;
  max-width: 550px;
  margin-bottom: 3em;
  padding: 2 2em;
}

#origin-text {
  margin: 1em 0;
  padding: 1em 1em 0;
  background-color: #ededed;
}

.center {
   margin: 0 auto;
    width: 100%
}

#origin-text p {
  margin: 0;
  padding-bottom: 1em;
}

.timer {
  font-size: 3em;
  font-weight: bold;
}

form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 30%;
    margin-left: 30em;
}
.flex-parent {
  display: flex;
}

.jc-center {
  justify-content: center;
}
</style>
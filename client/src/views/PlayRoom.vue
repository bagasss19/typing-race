<template>
  <section id="playroom">
    <body>
      <header class="masthead">
        <h1>Test Your Typing Speed</h1>
      </header>
      <main class="main">
        <div class="intro">
          <h1>Hello IkhsanGama</h1>
          <p>
            Welcome to the TYPING RACE. Your goal is to duplicate the provided
            text, EXACTLY, in the field below. Good Luck!
          </p>
        </div>
        <!-- .intro -->
        <section class="test-area">
          <div id="origin-text">
            <p>The text to test.</p>
          </div>
          <!-- #origin-text -->

          <div class="test-wrapper">
            <textarea
              id="test-area"
              name="textarea"
              rows="6"
              placeholder="Type fast!."
            ></textarea>
          </div>
          <!-- .test-wrapper -->

          <div class="meta">
            <section id="clock">
              <div class="timer">00:00:00</div>
            </section>

            <button id="reset">Start over</button>
          </div>
          <!-- .meta -->
        </section>
        <!-- .test-area -->
      </main>
    </body>
  </section>
</template>

<script>
export default {};
</script>

<style>
</style>
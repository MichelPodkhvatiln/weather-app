<template>
  <div id="app">
    <main class="main">
      <sidebar />
    </main>
  </div>
</template>

<script>
import Sidebar from "@/components/sidebar/Sidebar";

export default {
  name: "App",

  components: {
    Sidebar
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
  padding: 0;
}

.main {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 4fr;
  margin: auto;
  height: 100vh;
  max-height: 100vh;
  //overflow-y: scroll;
}
</style>

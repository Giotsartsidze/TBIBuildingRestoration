
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* Global CSS Variables */
:root {
  --primary-blue: #003366;
  --secondary-orange: #f26522;
  --white: #ffffff;
  --light-gray: #f7f7f7;
  --dark-gray: #333333;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
}

body {
  overflow-x: hidden;
}

/* Global styles that should apply across all pages */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}
</style>
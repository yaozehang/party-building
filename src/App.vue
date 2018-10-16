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
 *{
  margin: 0;
  padding:0;
}

.w750 {
  width: 7.5rem;
}

.fll {
  float: left;
}

.flr {
  float: right;
}

.clear::after {
  content:'';
  display: block;
  clear: both;
}

a {
    text-decoration:none; 
    color: #fff;
}

li {
  list-style: none;
}
</style>

<script setup>
import { RouterLink, RouterView } from 'vue-router'


</script>

<template>
  <div class="flex min-h-[100vh]">
    <div id="container" class="w-[320px] bg-gray-900 flex flex-col">
      <div class="heading p-8 bg-green-900">
        <h1 class="text-2xl text-green-200 text-center">
          Cellan Library
        </h1>
        <div class="text-xl text-gray-300 text-center">final Project</div>
      </div>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/products">Authors</RouterLink>
        <RouterLink to="/category">Books</RouterLink>
        <RouterLink to="/transaction">Copies</RouterLink>
      </nav>
      <div class="p-8 bg-gray-800 text-gray-500 text-center">
        This is a laboratory file intended for training students in the use of
        VueJS 3 created by Benjie B. Lenteria for the students of Mater Dei
        College <br />
        Copyright &copy; 2023.<br />All rights reversed.
      </div>
    </div>
    <div class="main-content bg-green-200 flex-1"><RouterView /></div>
  </div>
</template>

<style scoped>
nav {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 10px 0 10px 0;
  gap: 10px;
}

.main-content {
  margin-left: 320px;
  background-color: white;
}

nav a {
  background-color: white;
  padding: 10px;
  width: 90%;
  margin: 0 auto;
  box-shadow: rgb(255, 255, 255) 0px 1px 3px, rgb(255, 255, 255) 0px 1px 2px;
  transition: transform 0.2s;
  border-radius: 50px;
}

nav a:hover, a:active {
  background-color: lightgreen;
}

a:focus {
  background-color: lightgreen;
}

#container {
  position: fixed;
  z-index: 1;
  height: 10000px;
}

.home-page{
  margin-top: 20%;
}
</style>

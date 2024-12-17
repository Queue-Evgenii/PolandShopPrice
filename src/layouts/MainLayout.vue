<template>
  <q-layout class="page" view="hhh lpr fff">
    <q-header class="header">
      <div class="_container flex justify-center">
        <a href="https://polandgroups.pl/" target="_blank" class="logo _img">
          <img src="assets/logo.jpg" alt="" />
        </a>
      </div>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
defineOptions({
  name: "MainLayout",
});
</script>
<style>
.page {
  background: url("./background.jpg") center / cover no-repeat;
}
</style>

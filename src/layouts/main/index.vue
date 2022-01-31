<template>
  <AsideMenu />

  <router-view />
</template>

<script setup>
import { watch } from "vue";
import { ElNotification } from "element-plus";
import { error } from "@/composables/useApi";
import AsideMenu from "./_components/AsideMenu";

watch(error, () => {
  ElNotification({
    title: "Error",
    message: "Api error",
    type: "error",
  });
});
</script>

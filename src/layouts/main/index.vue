<template>
  <AsideMenu />

  <router-view />
</template>

<script>
import AsideMenu from "@/components/layout/AsideMenu";

export default {
  name: "MainLayout",

  components: {
    AsideMenu,
  },
};
</script>

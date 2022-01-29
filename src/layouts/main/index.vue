<template>
  <AsideMenu />

  <router-view />
</template>

<script>
import AsideMenu from "./_components/AsideMenu";

export default {
  name: "MainLayout",

  components: {
    AsideMenu,
  },
};
</script>

<template>
  <el-menu
    :default-active="activeItem"
    mode="horizontal"
    class="menu"
    router
    background-color="#EFF6FF"
  >
    <el-menu-item
      v-for="(item, index) in menuItems"
      :key="index"
      :route="item.route"
      :index="String(index)"
    >
      <template #title>
        {{ item.label }}
      </template>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { ElMenu, ElMenuItem } from "element-plus";
import { ref } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "AsideMenu",
  components: {
    ElMenu,
    ElMenuItem,
  },

  setup() {
    const menuItems = [
      {
        label: "Currency List",
        route: { name: "CurrencyList" },
      },
      {
        label: "Base currency",
        route: { name: "CurrencyBase" },
      },
      {
        label: "Converter",
        route: { name: "CurrencyConverter" },
      },
    ];

    const activeItem = ref("");
    const { name: currentRouteName } = useRoute();

    const index = menuItems.findIndex(
      (item) => item.route.name === currentRouteName
    );

    activeItem.value = String(index);

    return {
      menuItems,
      activeItem,
    };
  },
};
</script>

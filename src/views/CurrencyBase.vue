<template>
  <div class="base-currency">
    <h2>Base currency</h2>

    <el-select
      v-model="baseCurrencyCode"
      placeholder="Select currency"
      size="large"
    >
      <el-option
        v-for="(code, index) in displayedCurrencies"
        :key="index"
        :label="code"
        :value="code"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { baseCurrencyCode, displayedCurrencies } from "@/config/currency";
import { ElSelect, ElOption } from "element-plus";

export default {
  name: "CurrencyBase",

  components: {
    ElSelect,
    ElOption,
  },

  setup() {
    return {
      baseCurrencyCode,
      displayedCurrencies,
    };
  },
};
</script>

<style lang="scss" scoped>
.base-currency {
  padding: 1.5rem;
}
</style>

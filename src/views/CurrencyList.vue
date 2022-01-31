<template>
  <div class="currencies">
    <h2>Currency list</h2>

    <div class="currencies-base">
      <span>Base currency:</span>

      <span class="currencies-base-rate">
        {{ baseCurrencyCode }}
      </span>
    </div>

    <el-table :data="filteredCurrencies" border class="currencies-table">
      <el-table-column prop="currency" label="Currency" />
      <el-table-column prop="rate" label="Rate" />
    </el-table>
  </div>
</template>

<script>
import { onMounted, computed } from "vue";
import axios from "@/plugins/axios";
import { baseCurrencyCode, displayedCurrencies } from "@/config/currency";
import { useApi } from "@/composables/useApi";

import { ElTable, ElTableColumn } from "element-plus";

export default {
  name: "CurrencyList",

  components: {
    ElTable,
    ElTableColumn,
  },

  setup() {
    const { callApi, response: rateList } = useApi(async () => {
      const { rates } = await axios.get(
        `/exchange-rates?currency=${baseCurrencyCode.value}`
      );

      return rates;
    });

    onMounted(callApi);

    const filteredCurrencies = computed(() => {
      return Object.entries(rateList.value || {})
        .filter(([key]) => {
          const isBaseCurrency = baseCurrencyCode.value === key;
          const isDisplayedCurrency = displayedCurrencies.includes(key);

          return !isBaseCurrency && isDisplayedCurrency;
        })
        .map(([currency, rate]) => {
          const transformedRate = (1 / parseFloat(rate)).toFixed(4);

          return {
            currency,
            rate: transformedRate,
          };
        });
    });

    return {
      baseCurrencyCode,
      filteredCurrencies,
    };
  },
};
</script>

<style lang="scss" scoped>
.currencies {
  padding: 1.5rem;

  &-base {
    padding-bottom: 1rem;

    &-rate {
      margin-left: 0.5rem;
      color: #374151;
      font-weight: 700;
    }
  }

  .currencies-table {
    min-width: 16rem;
    width: 25%;
  }
}
</style>

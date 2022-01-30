<template>
  <div>CurrencyList</div>
  <div>{{ filteredCurrencies }}</div>
</template>

<script>
import { computed } from "vue";
import axios from "@/plugins/axios";
import useApi from "@/composables/useApi";
import {
  baseCurrencyCode,
  displayedCurrencies,
} from "@/config/currency.config";

export default {
  name: "CurrencyList",

  setup() {
    const { callApi, response: rateList } = useApi(async () => {
      const { rates } = await axios.get(
        `/exchange-rates?currency=${baseCurrencyCode.value}`
      );

      return rates;
    });

    callApi();

    console.log(rateList.value);

    const filteredCurrencies = computed(() => {
      return Object.entries(rateList.value ?? {}).reduce(
        (acc, [currency, rate]) => {
          if (displayedCurrencies.includes(currency)) {
            acc[currency] = rate;

            return acc;
          }
        },
        {}
      );
    });

    console.log(filteredCurrencies.value);

    return {
      rateList,
      filteredCurrencies,
    };
  },
};
</script>

<style scoped></style>

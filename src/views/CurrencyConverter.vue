<template>
  <div class="currency-converter">
    <h2>Currency converter</h2>

    <div class="form">
      <div class="input-block">
        <span class="input-label">From currency</span>

        <el-input v-model="fromCurrency" clearable />

        <span v-if="!fromCurrency" class="input-error"> Enter currency </span>

        <span v-else-if="rateList && !isExistFromCurrency" class="input-error">
          Entered currency doesn't exist
        </span>
      </div>

      <div class="input-block">
        <span class="input-label">Amount</span>

        <el-input-number v-model="amount" :min="1" />
      </div>

      <div class="input-block">
        <span class="input-label">To currency</span>

        <el-input v-model="toCurrency" clearable />

        <span v-if="!toCurrency" class="input-error"> Enter currency </span>

        <span v-else-if="rateList && !isExistToCurrency" class="input-error">
          Entered currency doesn't exist
        </span>
      </div>

      <div class="result">
        <span class="result-title"> Conversion result: </span>

        <span class="result-amount">
          {{ result }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, computed, watch } from "vue";
import useApi from "@/composables/useApi";
import axios from "@/plugins/axios";
import { baseCurrencyCode } from "@/config/currency";

import { ElInput, ElInputNumber } from "element-plus";

export default {
  name: "CurrencyConverter",

  components: {
    ElInput,
    ElInputNumber,
  },

  setup() {
    const fromCurrency = ref(baseCurrencyCode.value);
    const toCurrency = ref("USD");
    const amount = ref(1);
    const result = ref(0);

    const { callApi, response: rateList } = useApi(async () => {
      const { rates } = await axios.get(
        `/exchange-rates?currency=${fromCurrency.value.toUpperCase()}`
      );

      return rates;
    });

    onMounted(callApi);

    result.value = computed(() => {
      const toRate = +rateList.value?.[toCurrency.value.toUpperCase()] || 0;
      const conversionResult = toRate * amount.value;

      return parseFloat(conversionResult.toFixed(4));
    });

    const isExistFromCurrency = computed(() => {
      return Object.keys(rateList.value || {}).some(
        (currency) => currency === fromCurrency.value.toUpperCase()
      );
    });

    const isExistToCurrency = computed(() => {
      return Object.keys(rateList.value || {}).some(
        (currency) => currency === toCurrency.value.toUpperCase()
      );
    });

    watch(fromCurrency, () => {
      if (isExistFromCurrency.value) callApi();
    });

    return {
      fromCurrency,
      toCurrency,
      amount,
      result,
      isExistFromCurrency,
      isExistToCurrency,
      rateList,
    };
  },
};
</script>

<style lang="scss" scoped>
.currency-converter {
  padding: 1.5rem;

  .form {
    display: flex;
    flex-direction: column;
    width: 25%;

    .input-block {
      display: flex;
      flex-direction: column;

      &:not(:first-child) {
        margin-top: 1rem;
      }

      .input-label {
        font-size: 0.75rem;
        padding-bottom: 0.5rem;
        color: #838b97;
      }

      .input-error {
        color: #e11d48;
        font-size: 0.75rem;
        padding-top: 0.25rem;
      }
    }

    .result {
      padding: 1rem;

      &-title {
        font-weight: 500;
      }

      &-amount {
        font-weight: 700;
        font-size: 1.2rem;
      }
    }
  }
}
</style>

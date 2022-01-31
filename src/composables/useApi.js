import { ref } from "vue";

export const loading = ref(false);
export const error = ref(false);

export function useApi(getApiData) {
  const response = ref();

  const callApi = async () => {
    loading.value = true;

    try {
      response.value = await getApiData();
    } catch (e) {
      error.value = true;
    } finally {
      loading.value = false;
    }
  };

  return { callApi, loading, error, response };
}

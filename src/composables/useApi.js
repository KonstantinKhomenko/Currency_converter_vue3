import { ref } from "vue";

export default function useApi(getApiData) {
  const loading = ref(false);
  const error = ref(false);
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

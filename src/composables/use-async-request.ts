import { Ref, ref } from "vue";

export default function (fetch: () => Promise<void>) {
  const isLoading: Ref<boolean> = ref(false);
  const errorMessage: Ref<string | null> = ref(null);

  const requestHandler = async (): Promise<void> => {
    try {
      isLoading.value = true;
      errorMessage.value = null;
      await fetch();
    } catch (error) {
      errorMessage.value =
        error instanceof Error ? error.message : "Unknown error";
    } finally {
      isLoading.value = false;
    }
  };

  return { isLoading, errorMessage, requestHandler };
}

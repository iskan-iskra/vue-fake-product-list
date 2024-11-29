import { Ref, ref } from "vue";

export default function <T, K extends keyof T>(
  uniKey: K,
  multiSelectRestrictionCount: number
) {
  const selectedList: Ref<T[]> = ref([]);

  const addItem = (value: T): void => {
    if (isAvailable(value)) {
      selectedList.value.push(value);
    }
  };

  const removeItem = (uniKeyValue: T[K]): void => {
    selectedList.value = selectedList.value.filter(
      (item) => item[uniKey] !== uniKeyValue
    );
  };

  const clearSelected = (): void => {
    selectedList.value = [];
  };

  const isInSelectedList = (value: T): boolean =>
    !!selectedList.value.find((item) => item[uniKey] === value[uniKey]);

  const isRestrictionCountReached = (): boolean =>
    multiSelectRestrictionCount === selectedList.value.length;

  const isAvailable = (value: T): boolean =>
    !isInSelectedList(value) && !isRestrictionCountReached();

  return {
    selectedList,
    addItem,
    removeItem,
    clearSelected,
    isAvailable,
    selectRestrictionCount: multiSelectRestrictionCount,
  };
}

import { Ref, ref } from "vue";

export default function <T, K extends keyof T>(uniKey: K) {
  const selectedList: Ref<T[]> = ref([]);

  const addItem = (value: T): void => {
    const keyValue = value[uniKey];

    if (!selectedList.value.find((item) => item[uniKey] === keyValue)) {
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

  const isAvailable = (value: T): boolean =>
    !selectedList.value.find((item) => item[uniKey] === value[uniKey]);

  return { selectedList, addItem, removeItem, clearSelected, isAvailable };
}

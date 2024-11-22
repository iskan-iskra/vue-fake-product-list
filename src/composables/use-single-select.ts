import { ref } from "vue";

export default function <T, K extends keyof T>(uniKey: K) {
  const selected = ref<T | null>(null);

  const addItem = (value: T): void => {
    selected.value = value;
  };

  const removeItem = (): void => {
    selected.value = null;
  };

  const isAvailable = (value: T): boolean =>
    selected.value ? !(selected.value[uniKey] === value[uniKey]) : true;

  return { selected, addItem, removeItem, isAvailable };
}

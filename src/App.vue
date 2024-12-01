<template>
  <header>
    <AppProductList>
      <template #title>
        <h3>selected:</h3>
      </template>
      <template #list v-if="selectedProduct">
        <AppProductCard :product="selectedProduct">
          <template #actions>
            <AppButton @click="unselectProduct"> remove </AppButton>
          </template>
        </AppProductCard>
      </template>
    </AppProductList>

    <AppProductList>
      <template #title>
        <h3>selectedList:</h3>
      </template>
      <template #list v-if="selectedProductList.length">
        <AppProductCard
          v-for="item in selectedProductList"
          :key="item.id"
          :product="item"
        >
          <template #actions>
            <AppButton @click="removeFromSelectedProductList(item.id)">
              remove
            </AppButton>
          </template>
        </AppProductCard>
      </template>
      <template #list-actions v-if="selectedProductList.length">
        <h4 v-if="selectedProductListCount">
          {{ selectedProductListCount }}
        </h4>
        <AppButton @click="clearSelectedProductList"> clear </AppButton>
      </template>
    </AppProductList>
  </header>

  <template v-if="!isLoading">
    <AppError v-if="errorMessage">
      {{ errorMessage }}
    </AppError>

    <main v-else>
      <AppProductList>
        <template #title>
          <h3>Items single-select:</h3>
        </template>
        <template #list>
          <AppProductCard
            v-for="item in productCatalog.singleSelect"
            :key="item.id"
            :product="item"
          >
            <template #actions>
              <AppButton
                @click="selectProduct(item)"
                :disabled="!isAvailableProduct(item)"
              >
                select
              </AppButton>
            </template>
          </AppProductCard>
        </template>
      </AppProductList>

      <AppProductList>
        <template #title>
          <h3>Items multi-select:</h3>
        </template>
        <template #list>
          <AppProductCard
            v-for="item in productCatalog.multiSelect"
            :key="item.id"
            :product="item"
          >
            <template #actions>
              <AppButton
                @click="addToSelectedProductList(item)"
                :disabled="!isAvailableForAddToSelectedProductList(item)"
              >
                add to list
              </AppButton>
            </template>
          </AppProductCard>
        </template>
      </AppProductList>
    </main>
  </template>
  <AppLoader v-else />
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from "vue";
import { TiCatalog, TiProduct, TiProductListsDic } from "@types";
import { fetchJson, measureExecutionTime, withDelay } from "@utils";
import {
  useAsyncRequest,
  useMultipleSelect,
  useSingleSelect,
} from "@composables";
import {
  AppButton,
  AppLoader,
  AppProductCard,
  AppProductList,
  AppError,
} from "@components";

const productCatalog = reactive<TiCatalog<TiProductListsDic, TiProduct[]>>({
  singleSelect: [],
  multiSelect: [],
});

const fetchJsonWithDelay = withDelay<TiProduct[]>(fetchJson);

const getProductCatalog = async () => {
  const [data1, data2] = await Promise.all([
    fetchJsonWithDelay("/mockData.json"),
    fetchJsonWithDelay("/mockData2.json"),
  ]);
  productCatalog.multiSelect = data1;
  productCatalog.singleSelect = data2;
};

const getProductCatalogWithTimeMeasure =
  measureExecutionTime(getProductCatalog);

const {
  selectedList: selectedProductList,
  selectRestrictionCount: selectedProductListRestrictionCount,
  addItem: addToSelectedProductList,
  removeItem: removeFromSelectedProductList,
  clearSelected: clearSelectedProductList,
  isAvailable: isAvailableForAddToSelectedProductList,
} = useMultipleSelect<TiProduct, "id">("id", 6);

const {
  selected: selectedProduct,
  addItem: selectProduct,
  removeItem: unselectProduct,
  isAvailable: isAvailableProduct,
} = useSingleSelect<TiProduct, "id">("id");

const { errorMessage, isLoading, requestHandler } = useAsyncRequest(
  getProductCatalogWithTimeMeasure
);

const selectedProductListCount = computed<string | null>(() =>
  selectedProductList.value.length
    ? `selected: ${selectedProductList.value.length} / ${selectedProductListRestrictionCount}`
    : null
);

onMounted(requestHandler);
</script>

<style scoped>
header {
  display: flex;
  gap: 8px;
  background-color: white;
  position: sticky;
  top: 0;
  left: 0;
  padding-bottom: 8px;
  margin-bottom: 8px;
  border-bottom: 1px solid black;
  flex-direction: row-reverse;
}

header > * {
  max-width: 50%;
  width: 50%;
}

main {
  display: flex;
  gap: 8px;
  flex-direction: row-reverse;
}

main > * {
  max-width: 50%;
  width: 50%;
}

@media screen and (max-width: 600px) {
  header > * {
    max-width: 100%;
    width: 100%;
  }
  main > * {
    max-width: 100%;
    width: 100%;
  }
  main {
    flex-direction: column-reverse;
  }
  header {
    flex-direction: column-reverse;
  }
}
</style>

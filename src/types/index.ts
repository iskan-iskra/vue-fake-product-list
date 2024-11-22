export type TiProduct = {
  id: number;
  name: string;
};

export type TiProductListsDic = "list1" | "list2";

export type TiCatalog<T extends string, K> = Record<T, K>;

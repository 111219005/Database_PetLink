import { useQuery } from '@tanstack/react-query';
import { getProductById, getProducts, getProductsByCategory } from "../api/fireStore";

// 取得所有商品
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5, // 5分鐘內不重新 fetch
    refetchOnWindowFocus: false,
  });
};

// 依分類取得商品
export const useProductsByCategory = (category) => {
  return useQuery({
    queryKey: ['products', 'category', category],
    queryFn: () => getProductsByCategory(category),
    enabled: !!category, // 避免 category 為 undefined 時自動執行
  });
};

// 依 id 取得單一商品
export const useProductById = (productId) => {
  return useQuery({
    queryKey: ['products', 'id', productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId, // 避免 productId 為 undefined 時自動執行
  });
};
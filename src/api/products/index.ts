import { supabase } from "@/src/lib/supabase";
import { Product, Tables } from "@/src/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

export const useProductList = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*");

      if (error) {
        Alert.alert(`${error.message}`);
      }
      return data;
    },
  });
};

export const useProduct = (id: number) => {
  return useQuery<Tables<'products'>>({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useInsertProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: Omit<Tables<'products'>, "id">) {
      const { error } = await supabase.from("products").insert({
        name: data.name,
        price: data.price,
        image: data.image,
      });

      if (error) {
        throw error;
      }
    },
    async onSuccess() {
      // @ts-ignore
      await queryClient.invalidateQueries(["products"]);
    },
    onError(error) {
      console.log(error);
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn({ id, ...update }: Tables<'products'>) {
      const { error, data } = await supabase
        .from("products")
        .update(update)
        .eq("id", id)
        .select();

      if (error) {
        throw error;
      }
      return data;
    },
    async onSuccess(_, { id }) {
      // @ts-ignore
      await queryClient.invalidateQueries(["products"]);
      // @ts-ignore
      await queryClient.invalidateQueries(["product", id]);
    },
    onError(error) {
      console.log(error);
    },
  });
};

export const useDeleteProduct = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(data: any) {
      await supabase.from("products").delete().eq("id", id).single();
    },
    async onSuccess(){
      //  @ts-ignore
      queryClient.invalidateQueries(['products'])
    }
  });
};

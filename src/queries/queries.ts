import { fetchJson, fetchMakes } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

export type Make = {
  MakeId: number;
  MakeName: string;
  VehicleTypeId: number;
  VehicleTypeName: string;
};

export type MakeResult = {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
};

export const useMakesQuery = () => {
  return useQuery<Make[]>({
    queryKey: ["makes"],
    queryFn: fetchMakes,
    initialData: [],
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export const useResultQuery = (makeId: string, year: string) => {
  return useQuery({
    queryKey: ["result", makeId, year],

    queryFn: async (): Promise<MakeResult[]> => {
      const data = await fetchJson(
        `vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
      );
      return data.Results;
    },
    initialData: [],
    enabled: !!makeId && !!year,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

import { Make } from "@/queries/queries";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchJson(url: string) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const response = await fetch(`${BASE_URL}/${url}`, { headers });
  if (response.status !== 200) {
    throw new Error("Error response from server");
  }
  return await response.json();
}

export async function fetchMakes(): Promise<Make[]> {
  const data = await fetchJson(
    "vehicles/GetMakesForVehicleType/car?format=json"
  );
  return data.Results;
}

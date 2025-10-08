import type { DrinkDto } from "@/models/drink";
import { http } from "@/logic/plugins/http";

class DrinkService {
  async getAll(): Promise<DrinkDto[]> {
    const { data } = await http.get<DrinkDto[]>("/drinks/get/all");
    return data;
  }

  async getById(id: number): Promise<DrinkDto> {
    const { data } = await http.get<DrinkDto>(`/drinks/${id}`);
    return data;
  }

  async create(payload: Partial<DrinkDto>) {
    const { data } = await http.post("/drinks", payload);
    return data;
  }

  async replace(id: number, payload: DrinkDto) {
    const { data } = await http.put(`/drinks/${id}`, payload);
    return data;
  }

  async update(id: number, payload: Partial<DrinkDto>) {
    const { data } = await http.patch(`/drinks/${id}`, payload);
    return data;
  }

  async delete(id: number): Promise<void> {
    await http.delete(`/drinks/${id}`);
  }
}

export const drinkService = new DrinkService();

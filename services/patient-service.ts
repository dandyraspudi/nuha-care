import { mockPatients } from "@/lib/mock-data";

export const getPatients = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockPatients;
};

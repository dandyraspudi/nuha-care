import { create } from "zustand";
import { Patient } from "@/types/patient";
import { mockPatients } from "@/lib/mock-data";

interface PatientStore {
  patients: Patient[];

  addPatient: (data: Patient) => void;
  deletePatient: (id: string) => void;
}

export const usePatientStore = create<PatientStore>((set) => ({
  patients: mockPatients,

  addPatient: (data) =>
    set((state) => ({
      patients: [data, ...state.patients],
    })),

  deletePatient: (id) => {
      set((state) => ({
        patients: state.patients.filter((item) => item.id !== id),
      }))
  }
}));

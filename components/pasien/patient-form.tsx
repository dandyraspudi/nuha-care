"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Save, RotateCcw, CircleAlert } from "lucide-react";
import { usePatientStore } from "@/store/patient-store";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const schema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  nik: z.string().length(16, "NIK harus 16 digit"),
  diagnosis: z.string().min(3),
  admissionDate: z.string().min(1),
  doctor: z.string().min(1),
  room: z.string().min(1),
});

type FormData = z.infer<typeof schema>;

export default function PatientForm() {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { addPatient } = usePatientStore();

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 800));

    addPatient({
      id: crypto.randomUUID(),
      ...data,
    });

    reset();
  };

  const openConfirmDialog = async () => {
    const isValid = await trigger();

    if (isValid) {
      setIsConfirmOpen(true);
    }
  };

  const savePatient = handleSubmit(async (data) => {
    await onSubmit(data);
    toast.success("Data pasien berhasil disimpan");
    setIsConfirmOpen(false);
  });

  return (
    <form className="border rounded-md p-5 shadow-sm bg-white dark:bg-zinc-900">
      <div>
        <h1 className="text-xl font-bold">Formulir Pasien Masuk</h1>

        <p className="text-muted-foreground text-sm">
          Lengkapi data pasien baru untuk proses pendaftaran rawat inap.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2 mt-5">
        <div className="rounded-md border p-6 dark:bg-zinc-900">
          <h3 className="mb-5 text-lg font-semibold text-blue-600">
            Data Pasien
          </h3>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                {...register("name")}
                className="w-full rounded-md border px-4 py-2"
                placeholder="Masukan nama lengkap pasien"
              />
              <p className="mt-1 text-sm text-red-500">
                {errors.name?.message}
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                NIK <span className="text-red-500">*</span>
              </label>
              <input
                {...register("nik")}
                className="w-full rounded-md border px-4 py-2"
                placeholder="Masukan NIK (16 digit)"
              />
              <p className="mt-1 text-sm text-red-500">{errors.nik?.message}</p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Diagnosa Masuk <span className="text-red-500">*</span>
              </label>
              <input
                {...register("diagnosis")}
                className="w-full rounded-md border px-4 py-2"
                placeholder="Masukan diagnosa masuk pasien"
              />
              <p className="mt-1 text-sm text-red-500">
                {errors.diagnosis?.message}
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Tanggal Masuk <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                placeholder="Pilih tanggal masuk"
                {...register("admissionDate")}
                className="w-full rounded-md border px-4 py-2"
              />
            </div>
          </div>
        </div>

        <div className="rounded-md border p-6 dark:bg-zinc-900">
          <h3 className="mb-5 text-lg font-semibold text-blue-600">
            Informasi Perawatan
          </h3>

          <div className="space-y-4 flex justify-between flex-col">
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Dokter Penanggung Jawab{" "}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("doctor")}
                  className="w-full rounded-md border px-4 py-2"
                >
                  <option value="" className="text-muted-foreground">
                    Pilih dokter penanggung jawab
                  </option>
                  <option>dr. Budi</option>
                  <option>dr. Anisa</option>
                  <option>dr. Citra</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Ruangan <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("room")}
                  className="w-full rounded-md border px-4 py-2"
                >
                  <option value="" className="text-muted-foreground">
                    Pilih ruangan
                  </option>
                  <option>VIP 1</option>
                  <option>VIP 2</option>
                  <option>Kelas 1A</option>
                  <option>Kelas 2B</option>
                </select>
              </div>

              <div className="bg-blue-100 rounded-sm p-3 flex items-center gap-2 dark:bg-slate-700">
                <CircleAlert size={30} className="text-blue-500" />
                <label className="block text-sm font-medium text-muted-foreground">
                  Pastikan data yang diinput sudah benar sebelum disimpan
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
              <button
                className="flex items-center gap-1 justify-center rounded-sm bg-white px-4 py-2 font-medium text-slate-700 cursor-pointer transition hover:bg-gray-100 border"
                type="button"
                onClick={() => reset()}
              >
                <RotateCcw size={18} className="inline-block mr-1" />
                Reset
              </button>
              <AlertDialog
                open={isConfirmOpen}
                onOpenChange={setIsConfirmOpen}
              >
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={openConfirmDialog}
                  className="flex items-center gap-1 justify-center rounded-sm bg-blue-600 px-4 py-2 font-medium text-white cursor-pointer transition hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <Save size={18} className="inline-block mr-1" />
                  Daftarkan Pasien
                </button>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Simpan Data Pasien?</AlertDialogTitle>

                    <AlertDialogDescription>
                      Data pasien akan disimpan ke dalam sistem.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel className={"cursor-pointer"}>
                      Batal
                    </AlertDialogCancel>

                    <AlertDialogAction
                      onClick={() => void savePatient()}
                      className={"cursor-pointer"}
                      disabled={isSubmitting}
                      type="button"
                    >
                      {isSubmitting ? "Menyimpan..." : "Ya, Simpan"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

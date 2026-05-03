"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Save, RotateCcw, CircleAlert } from "lucide-react";

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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 800));

    console.log(data);

    alert("Pasien berhasil didaftarkan");
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border rounded-md p-5 shadow-sm bg-white dark:bg-zinc-900"
    >
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
                  Dokter Penanggung Jawab <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("doctor")}
                  className="w-full rounded-md border px-4 py-2"
                >
                  <option value="">Pilih Dokter</option>
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
                  <option value="">Pilih Ruangan</option>
                  <option>VIP 1</option>
                  <option>VIP 2</option>
                  <option>Kelas 1A</option>
                  <option>Kelas 2B</option>
                </select>
              </div>

              <div className="bg-blue-100 rounded-sm p-3 flex items-center gap-2">
                <CircleAlert size={30} className="text-blue-500" />
                <label className="block text-sm font-medium text-muted-foreground">
                  Pastikan data yang diinput sudah benar sebelum disimpan
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <button
                className="flex items-center gap-1 justify-center rounded-sm bg-white px-4 py-2 font-medium text-slate-700 cursor-pointer transition hover:bg-gray-100 border"
                type="button"
                onClick={() => reset()}
              >
                <RotateCcw size={18} className="inline-block mr-1" />
                Reset
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-1 justify-center rounded-sm bg-blue-600 px-4 py-2 font-medium text-white cursor-pointer transition hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <Save size={18} className="inline-block mr-1" />
                {isSubmitting ? "Menyimpan..." : "Daftarkan Pasien"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

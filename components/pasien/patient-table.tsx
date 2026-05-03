"use client";

import { useEffect, useMemo, useState } from "react";
import { usePatientStore } from "@/store/patient-store";
import { Trash } from "lucide-react";
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDebounce } from "@/hooks/use-debounce";
import Loading from "@/components/ui/loading";
import LoadingSkeleton from "./patient-skeleton";

const perPage = 5;

export default function PatientTable() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const [sortBy, setSortBy] = useState("name");
  const [page, setPage] = useState(1);
  const { patients, deletePatient } = usePatientStore();
  const isSearching = search !== debouncedSearch;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    let data = [...patients];
    const keyword = debouncedSearch.trim().toLowerCase();

    if (keyword) {
      data = data.filter(
        (item) =>
          item.name.toLowerCase().includes(keyword) ||
          item.nik.toLowerCase().includes(keyword)
      );
    }

    data.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }

      return (
        new Date(b.admissionDate).getTime() -
        new Date(a.admissionDate).getTime()
      );
    });

    return data;
  }, [patients, debouncedSearch, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginated = filtered.slice(startIndex, endIndex);
  const startItem = filtered.length === 0 ? 0 : startIndex + 1;
  const endItem = Math.min(endIndex, filtered.length);
  const pageNumbers =
    filtered.length === 0
      ? []
      : Array.from({ length: totalPages }, (_, i) => i + 1);

  if (loading) {
    return (
      <div className="rounded-md border bg-card p-10 text-card-foreground">
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="space-y-1">
          <input
            placeholder="Cari nama / NIK..."
            className="rounded-md border bg-background px-4 py-2 text-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <select
          className="rounded-md border bg-background px-4 py-2 text-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setPage(1);
          }}
        >
          <option value="name">Sort Nama</option>
          <option value="date">Sort Tanggal</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-md border bg-card text-card-foreground">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted text-muted-foreground">
            <tr>
              <th className="p-4 text-left">No</th>
              <th className="p-4 text-left">Nama</th>
              <th className="p-4 text-left">NIK</th>
              <th className="p-4 text-left">Dokter</th>
              <th className="p-4 text-left">Ruangan</th>
              <th className="p-4 text-left">Tanggal</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {isSearching ? (
              <tr>
                <td colSpan={7} className="p-8 text-center">
                  <Loading size="sm" label="Mencari pasien..." />
                </td>
              </tr>
            ) : paginated.length > 0 ? (
              paginated.map((item, idx) => (
                <tr
                  key={item.id}
                  className="border-b transition last:border-0 hover:bg-muted/60"
                >
                  <td className="p-4">{startIndex + idx + 1}</td>
                  <td className="p-4">{item.name}</td>
                  <td className="p-4">{item.nik}</td>
                  <td className="p-4">{item.doctor}</td>
                  <td className="p-4">{item.room}</td>
                  <td className="p-4">{item.admissionDate}</td>
                  <td className="p-4">
                    <AlertDialog>
                      <AlertDialogTrigger className="rounded-sm bg-red-500 px-3 py-2 text-white cursor-pointer transition hover:bg-red-600 flex items-center gap-1">
                        <Trash size={18} className="inline" /> Hapus
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Hapus Data Pasien?
                          </AlertDialogTitle>

                          <AlertDialogDescription>
                            Data pasien akan dihapus permanen dari daftar aktif.
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel className={"cursor-pointer"}>
                            Batal
                          </AlertDialogCancel>

                          <AlertDialogAction
                            onClick={() => {
                              deletePatient(item.id);

                              toast.success("Data pasien berhasil dihapus");
                            }}
                            className={"cursor-pointer"}
                          >
                            Ya, Hapus
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="p-6 text-center text-muted-foreground"
                >
                  Data tidak ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-muted-foreground">
          Menampilkan {startItem}-{endItem} dari {filtered.length} pasien
        </p>

        <div className="flex flex-wrap justify-end gap-2">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setPage(Math.max(1, currentPage - 1))}
            className="font-semibold cursor-pointer rounded-xl border bg-background px-4 py-2 text-sm transition hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            Sebelumnya
          </button>

          {pageNumbers.map((pageNumber) => (
            <button
              type="button"
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              aria-current={currentPage === pageNumber ? "page" : undefined}
              className={`cursor-pointer rounded-xl px-4 py-2 text-sm transition ${
                currentPage === pageNumber
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "border bg-background hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {pageNumber}
            </button>
          ))}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
            className="font-semibold cursor-pointer rounded-xl border bg-background px-4 py-2 text-sm transition hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            Berikutnya
          </button>
        </div>
      </div>
    </div>
  );
}

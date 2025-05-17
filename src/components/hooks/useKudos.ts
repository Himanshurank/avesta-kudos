import { useState, useEffect } from "react";
import { GetKudosUseCase } from "@/core/application/useCases/kudos/GetKudosUseCase";
import { KudosRepositoryImpl } from "@/core/infrastructure/repositories/KudosRepositoryImpl";
import { Kudos } from "@/core/domain/entities/Kudos";
import {
  KudosFilter,
  Pagination,
} from "@/core/domain/interfaces/IKudosRepository";

// Simple DI for the use case
const kudosRepository = new KudosRepositoryImpl();
const getKudosUseCase = new GetKudosUseCase(kudosRepository);

interface KudosState {
  kudos: Kudos[];
  loading: boolean;
  error: Error | null;
  pagination: Pagination | null;
}

export function useKudos(initialFilter: KudosFilter = {}) {
  const [state, setState] = useState<KudosState>({
    kudos: [],
    loading: true,
    error: null,
    pagination: null,
  });
  const [filter, setFilter] = useState<KudosFilter>(initialFilter);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const fetchKudos = async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const result = await getKudosUseCase.execute(filter, page, limit);
      setState({
        kudos: result.data,
        loading: false,
        error: null,
        pagination: result.pagination,
      });
    } catch (error) {
      setState({
        kudos: [],
        loading: false,
        error:
          error instanceof Error
            ? error
            : new Error("An unknown error occurred"),
        pagination: null,
      });
    }
  };

  useEffect(() => {
    fetchKudos();
  }, [filter, page, limit]);

  const updateFilter = (newFilter: Partial<KudosFilter>) => {
    setFilter((prev) => ({ ...prev, ...newFilter }));
    setPage(1); // Reset to first page when filter changes
  };

  const updatePage = (newPage: number) => {
    setPage(newPage);
  };

  const updateLimit = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // Reset to first page when limit changes
  };

  return {
    ...state,
    filter,
    page,
    limit,
    updateFilter,
    updatePage,
    updateLimit,
    refreshKudos: fetchKudos,
  };
}

import axios from "axios";
import { useState } from "react";
import { Response, TableResponse } from "../types/response.type";

export default function useQuery<T>(endpoint: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<T | Array<T> | null>(null);
  const [pagination, setPagination] = useState<{ pageCount: number } | null>(
    null
  );
  const [isSuccess, setIsSuccess] = useState(false);

  const fetch = async (params?: Record<string, string | string[]>) => {
    setIsLoading(true);
    axios
      .get(`api/${endpoint}`, {
        params,
      })
      .then((res) => {
        const response: Response<T> | TableResponse<T> = res.data;
        if (response.meta.isError) {
          setIsError(true);
        } else {
          setData(response.data);
          setPagination({
            pageCount: (response as TableResponse<T>).meta.total,
          });
          setIsSuccess(true);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { pagination, isLoading, isError, data, isSuccess, fetch };
}

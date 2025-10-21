type AxiosBaseQueryError = {
  status?: number;
  data?: { message?: string } | string;
};

export function getErrorMessage(err: AxiosBaseQueryError | unknown): string {
  if (!err) return "Error desconocido";

  if (typeof err === "object" && "data" in err) {
    const data = (err as AxiosBaseQueryError).data;
    if (typeof data === "string") return data;
    if (typeof data === "object" && data?.message) return data.message;
  }

  return "Error de conexión o servidor";
}

export interface Response<T> {
    type: "response"
    data: T | null;
    meta: {
        isError: boolean;
        errorMessage?: string;
    }
}

export interface TableResponse<T> {
    type: "tableResponse"
    data: Array<T>;
    meta: {
        isError: boolean;
        total: number;
        errorMessage?: string;
    }
}

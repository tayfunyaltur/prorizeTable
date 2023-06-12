import { Response, TableResponse } from "../types/response.type";

export const mapToResponse = <T>(data: T): Response<T> => {
    return {
        data,
        meta: {
            isError: false,
        }
    };
}

export const mapToTableResponse = <T>(data: Array<T>, total: number): TableResponse<T> => {
    return {
        data,
        meta: {
            total,
            isError: false,
        }
    };
}

export const mapToErrorResponse = <T>(errorMessage: string): Response<T> => {
    return {
        data: null,
        meta: {
            isError: true,
            errorMessage,
        }
    };
}

export const mapToTableErrorResponse = <T>(errorMessage: string): TableResponse<T> => {
    return {
        data: [],
        meta: {
            total: 0,
            isError: true,
            errorMessage,
        }
    };
}

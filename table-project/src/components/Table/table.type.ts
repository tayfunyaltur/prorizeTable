export interface TableProps {
    rows: Array<any>
    totalPages: number;
    isLoading?: boolean;
    onFetchData: (params: Record<string, string | string[]>) => void;
    columns: Array<{
        header: string;
        accessor: string;
        cell?: (data: string) => React.ReactNode
        filterType: "TEXT" | "NUMBER"
    }>,
}


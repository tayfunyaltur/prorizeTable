export const SortArray = <T>(array: T[], sortKey: keyof T, sortDirection: string) => {
    return array.sort((a, b) => {
        if (sortDirection === "asc") {
            return a[sortKey] < b[sortKey] ? 1 : -1;
        }
        if (sortDirection === "decs") {
            return a[sortKey] < b[sortKey] ? -1 : 1;
        }
        return 0
    }) as T[];
}

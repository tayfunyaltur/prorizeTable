import { ReactNode, createContext, useReducer } from "react";

type TableState = {
    filters: Record<string, string[] | string> 
    sort: Record<string, string>,
    page: number,
    itemsPerPage: number,
}

type ActionName = "SORT" | "PAGE" | "ITEMS_PER_PAGE" | "FILTER"


type Action = { name: ActionName, payload: string | Record<string, string> | Record<string, string[]> | string[] | number }


const initialState: TableState = {
    filters: {},
    sort: {},
    page: 1,
    itemsPerPage: 10
}

const handleSortings = (sortOptions: string[], prevValue: Record<string, string>) => {
    const [sortName, sortDirection] = sortOptions
    if (sortOptions.length < 2) {
        delete prevValue[sortName]
    }
    else {
        prevValue[sortName] = sortDirection
    }
    return prevValue
}

export const TableContext = createContext([initialState, () => { }] as [TableState, React.Dispatch<Action>]);

const reducer = (state: TableState, action: Action) => {
    switch (action.name) {
        case 'SORT':
            return {
                ...state,
                sort: handleSortings(action.payload as string[], state.sort)
            }
        case 'PAGE':
            return {
                ...state,
                page: action.payload as number
            }
        case 'FILTER':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    ...action.payload as Record<string, string[]> | Record<string, string>
                }
            }
        default:
            return state
    }
}

const TableProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <TableContext.Provider value={[state, dispatch]}>
            {children}
        </TableContext.Provider>
    )
}

export default TableProvider
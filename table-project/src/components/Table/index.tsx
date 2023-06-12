import { FC, Fragment, useContext, useLayoutEffect } from "react";
import { TableProps } from "./table.type";
import Loading from "../Loading";
import If from "../If";
import Sort from "./Sort";
import TableProvider, { TableContext } from "./Context";
import Pagination from "./Pagination";
import { convertFilterObjects, convertObjetToSortQS } from "./utils";
import Filter from "./Filter";
import _ from "lodash";
import MobileHeader from "./MobileHeader";

//TODO: Add filter and sort for mobile
//TODO: on Page change scroll to top

const Table = ({
  rows,
  columns,
  totalPages,
  onFetchData,
  isLoading,
}: TableProps) => {
  const [tableStates] = useContext(TableContext);

  useLayoutEffect(() => {
    const { page, sort, filters } = tableStates;
    const convertedFilters = convertFilterObjects(filters);
    onFetchData({
      ...convertedFilters,
      page: page.toString(),
      sort: convertObjetToSortQS(sort),
    });
  }, [tableStates]);

  return (
    <Fragment>
      <div className="relative flex flex-col w-full rounded-md overflow-hidden border border-orange-400 min-h-[25rem]">
        <MobileHeader columns={columns} />
        <If test={!!isLoading}>
          <Loading />
        </If>
        <div className=" overflow-x-auto max-sm:overflow-y-auto max-sm:max-h-[40rem]">
          <table className="w-full">
            <thead className="py-4 max-sm:hidden">
              <tr className="bg-orange-400 text-white font-medium text-sm">
                {columns.map(({ header, accessor, filterType }) => (
                  <th key={accessor} className="py-2 px-1">
                    <div className="flex items-center">
                      <Sort name={accessor} />
                      {header}
                      <Filter
                        type={filterType}
                        accessor={accessor}
                        name={header}
                      />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className="odd:bg-orange-100 h-fit">
                  {columns.map(({ header, accessor, cell }) => (
                    <td
                      className={[
                        "py-2 px-2 text-sm  ",
                        "max-sm:block max-sm:px-1 max-sm:py-1 max-sm:[&]:before:content-[attr(data-label)]",
                        "max-sm:[&]:before:font-medium max-sm:[&]:before:text-orange-400 max-sm:[&]:before:mr-2",
                      ].join(" ")}
                      data-label={header}
                      key={accessor}
                    >
                      {cell ? cell(row[accessor]) : row[accessor]}
                    </td>
                  ))}
                </tr>
              ))}
              {rows.length === 0 && !isLoading && (
                <tr className="text-center pt-10">
                  <td colSpan={columns.length}>There is no data to display</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination maxPage={totalPages} />
      </div>
    </Fragment>
  );
};

const withProvider = (Component: FC<any>) => (props: any) =>
  (
    <TableProvider>
      <Component {...props} />
    </TableProvider>
  );

export default withProvider(Table);

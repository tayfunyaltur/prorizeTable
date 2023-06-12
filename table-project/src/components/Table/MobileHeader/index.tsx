import { Fragment, useState } from "react";
import If from "../../If";
import Filters from "../Filter";
import Sort from "../Sort";

const MobileHeader = ({
  columns,
}: {
  columns: Array<{
    header: string;
    accessor: string;
    cell?: (data: string) => React.ReactNode;
    filterType: "TEXT" | "NUMBER";
  }>;
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  return (
    <Fragment>
      <div className="flex bg-orange-400 text-white font-medium text-sm sm:hidden border-b border-orange-400 ">
        <button
          onClick={() => setShowFilters((prev) => !prev)}
          className=" px-4 py-2 text-center flex-1 border-r-2 border-white hover:bg-white/90 hover:text-orange-400"
        >
          Filters
        </button>
        <button
          className=" px-4 py-2 text-center flex-1 hover:bg-white/90 hover:text-orange-400"
          onClick={() => {
            setShowSort((prev) => !prev);
          }}
        >
          Sort
        </button>
      </div>
      <If test={showFilters || showSort}>
        <div
          className="absolute inset-0 bg-gray-200/50 flex items-center justify-center"
          onClick={() => {
            setShowFilters(false);
            setShowSort(false);
          }}
        >
          <div
            className="bg-white rounded-md  border border-orange-400 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {columns.map((column) => (
              <div className="flex items-center justify-between px-4 py-2 border-b border-orange-400">
                <div>{column.header}</div>
                <div>
                  <If test={showFilters}>
                    <Filters
                      indicatorColor="orange-400"
                      accessor={column.accessor}
                      name={column.header}
                      type={column.filterType}
                    />
                  </If>
                  <If test={showSort}>
                    <Sort name={column.accessor} />
                  </If>
                </div>
              </div>
            ))}
          </div>
        </div>
      </If>
    </Fragment>
  );
};

export default MobileHeader;

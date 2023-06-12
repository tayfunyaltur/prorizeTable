import { useContext, useState } from "react";
import NumberFilter from "./NumberFilter";
import TextFilter from "./TextFilter";
import { AiOutlineFilter } from "react-icons/ai";
import If from "../../If";
import { TableContext } from "../Context";

const FilterWrapper = ({
  type,
  name,
  accessor,
  indicatorColor = "white",
}: {
  indicatorColor?: string;
  type: "TEXT" | "NUMBER";
  name: string;
  accessor: string;
}) => {
  const [tableContext] = useContext(TableContext);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button
        className="p-1  ml-1 hover:bg-white/50 rounded-md relative"
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        <If
          test={
            !!tableContext.filters[accessor]?.length ||
            !!tableContext.filters[`min${accessor}`] ||
            !!tableContext.filters[`max${accessor}`]
          }
        >
          <div
            className={`w-[.5rem] h-[.5rem] rounded-full bg-${indicatorColor} absolute right-1`}
          />
        </If>
        <AiOutlineFilter />
      </button>
      <If test={isOpen}>
        <div
          className="absolute inset-0 flex items-center justify-center bg-gray-200/50 z-20"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false);
          }}
        >
          <div
            className="rounded-md overflow-hidden bg-white border border-orange-400 drop-shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className=" font-medium bg-orange-400 py-2 text-white px-4">
              {name} Filters
            </div>
            <If test={type === "TEXT"}>
              <TextFilter
                accessor={accessor}
                name={name}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            </If>
            <If test={type === "NUMBER"}>
              <NumberFilter
                accessor={accessor}
                name={name}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            </If>
          </div>
        </div>
      </If>
    </div>
  );
};

export default FilterWrapper;

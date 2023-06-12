import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { TableContext } from "../Context";

const TextFilter = ({
  name,
  accessor,
  setIsOpen,
}: {
  name: string;
  accessor: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [tableContext, dispatch] = useContext(TableContext);
  const [filter, setFilter] = useState(
    (tableContext.filters[accessor] as string[]) || []
  );

  useEffect(() => {
    if (!!inputRef.current) inputRef.current!.value = "";
    const container = document.getElementById("itemsContainer");
    if (container) {
      container?.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [filter]);

  const handleOnAdd = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    if (!inputRef.current) return;
    if (!inputRef.current?.value.trim()) {
      inputRef.current.style.border = "1px solid red";
      inputRef.current.value = "";
      return;
    }
    if (
      filter.filter(
        (f) => f.toLowerCase() === inputRef.current?.value.trim().toLowerCase()
      ).length
    ) {
      const element = document.getElementById(inputRef.current?.value.trim());
      const container = document.getElementById("itemsContainer");
      if (element && container) {
        container?.scrollTo({
          top: element.offsetTop - 120,
          behavior: "smooth",
        });
        element.classList.add("ring-2", "ring-blue-400");
        setTimeout(() => {
          element.classList.remove("ring-2", "ring-blue-400");
        }, 1000);
      }
      return;
    }

    setFilter((prev) => [inputRef.current?.value.trim() || "", ...prev]);
    inputRef.current.focus();
  };

  const handleOnInpuFocus = () => {
    if (!inputRef.current) return;
    inputRef.current.style.border = "1px solid #ccc";
  };

  return (
    <Fragment>
      <div className="filterContent__card__body">
        <div className="flex gap-2 mt-4 px-4">
          <input
            data-testid="filter-input"
            className="border border-orange-400 px-4 py-2 rounded-md w-full text-gray-400 font-normal text-sm"
            type="text"
            ref={inputRef}
            onFocus={handleOnInpuFocus}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleOnAdd();
            }}
          />
          <button
            name="+"
            className="border border-orange-400 text-orange-400  py-2 px-4 rounded-md hover:bg-orange-400 hover:text-white transition duration-300 text-sm leading-none"
            onClick={handleOnAdd}
          >
            +
          </button>
        </div>
        <span className="text-[.5rem] text-gray-400 font-light ml-4">
          {`Type ${name} and press the Enter or + button`}{" "}
        </span>
        <div
          id="itemsContainer"
          className="flex flex-col px-4 max-h-[7rem] overflow-y-auto"
        >
          {filter.map((item, index) => {
            return (
              <div
                id={item.toLocaleLowerCase().trim()}
                key={index}
                className="transition duration-300 last:mb-2 text-xs text-gray-400 font-light flex gap-2 items-center justify-between px-4 py-2 border border-gray-400 rounded-md mt-2"
              >
                <span>{item}</span>
                <button
                  name="-"
                  onClick={() => {
                    setFilter((prev) => prev.filter((i) => i !== item));
                  }}
                >
                  -
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex gap-2 items-center justify-center mt-4 mb-4 px-4">
        <button
          name="clear"
          className="border border-orange-400 text-orange-400 px-4 py-2 rounded-md w-full text-sm"
          onClick={() => {
            setFilter([]);
          }}
        >
          Clear
        </button>
        <button
          name="apply"
          className="bg-orange-400 text-white px-4 py-2 rounded-md w-full  border border-orange-400 text-sm"
          onClick={() => {
            dispatch({ name: "FILTER", payload: { [accessor]: filter } });
            dispatch({ name: "PAGE", payload: 1 });
            setIsOpen(false);
          }}
        >
          Apply
        </button>
      </div>
    </Fragment>
  );
};

export default TextFilter;

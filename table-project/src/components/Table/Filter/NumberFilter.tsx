import { useContext, useLayoutEffect, useState } from "react";
import { TableContext } from "../Context";

const NumberFilter = ({
  name,
  accessor,
  isOpen,
  setIsOpen,
}: {
  name: string;
  accessor: string;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) => {
  const [min, setMin] = useState<string>("");
  const [max, setMax] = useState<string>("");
  const [tableContext, dispatch] = useContext(TableContext);

  useLayoutEffect(() => {
    const min = (tableContext.filters[`min${accessor}`] as string) || "";
    const max = (tableContext.filters[`max${accessor}`] as string) || "";
    setMin(min);
    setMax(max);
  }, [tableContext.filters, isOpen]);

  return (
    <div>
      <div className="pt-4 px-4 flex gap-2 text-gray-500 max-md:flex-col">
        <input
          className="p-1 border border-orange-400 rounded-md text-md"
          name="min"
          type="number"
          placeholder={`Min ${name}`}
          value={min}
          onChange={(e) => {
            setMin(e.target.value);
          }}
        />
        <input
          className="p-1 border border-orange-400 rounded-md text-md"
          name="max"
          type="number"
          placeholder={`Max ${name}`}
          value={max}
          onChange={(e) => {
            setMax(e.target.value);
          }}
        />
      </div>
      <div className="flex gap-2 items-center justify-center mt-4 mb-4 px-4">
        <button
          className="border border-orange-400 text-orange-400 px-4 py-2 rounded-md w-full text-sm"
          onClick={() => {
            setMin("");
            setMax("");
          }}
        >
          Clear
        </button>
        <button
          className="bg-orange-400 text-white px-4 py-2 rounded-md w-full  border border-orange-400 text-sm"
          onClick={() => {
            dispatch({
              name: "FILTER",
              payload: {
                [`min${accessor}`]: min,
                [`max${accessor}`]: max,
              },
            });
            dispatch({ name: "PAGE", payload: 1 });
            setIsOpen(false);
          }}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default NumberFilter;

import React, { useContext } from "react";
import { BiSort, BiSortDown, BiSortUp } from "react-icons/bi";
import { TableContext } from "../Context";

const Sort = ({ name }: { name: string }) => {
  const [tableContext, dispatch] = useContext(TableContext);

  const handleOnClick = () => {
    if (tableContext.sort[name] === "asc") {
      dispatch({ name: "SORT", payload: [name, "desc"] });
    } else if (tableContext.sort[name] === "desc") {
      dispatch({ name: "SORT", payload: [name] });
    } else {
      dispatch({ name: "SORT", payload: [name, "asc"] });
    }
  };

  const SortIcon = ({ children }: { children?: React.ReactNode }) => {
    const { sort } = tableContext;
    if (sort[name] === "asc") {
      return <BiSortUp data-testid="sort-up">{children} </BiSortUp>;
    } else if (sort[name] === "desc") {
      return <BiSortDown data-testid="sort-down"> {children}</BiSortDown>;
    } else {
      return <BiSort data-testid="sort-default">{children} </BiSort>;
    }
  };

  return (
    <button
      data-testid="sort"
      onClick={handleOnClick}
      className="p-1  mr-1 hover:bg-white/50 rounded-md"
    >
      <SortIcon />
    </button>
  );
};

export default Sort;

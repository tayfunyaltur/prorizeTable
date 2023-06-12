import { useContext } from "react";
import { TableContext } from "../Context";

const buttonClass = [
  " px-4 py-2 ",
  "text-sm font-medium",
  "border border-orange-400 rounded - md",
  "hover:bg-orange-400 disabled:hover:bg-white",
  "disabled:opacity-50 disabled:cursor-not-allowed",
  "text-orange-400  hover:text-white disabled:hover:text-orange-400",
].join(" ");

const Pagination = ({ maxPage }: { maxPage: number }) => {
  const [{ page }, dispatch] = useContext(TableContext);

  const nextPage = () => {
    if (page < maxPage) dispatch({ name: "PAGE", payload: page + 1 });
  };

  const prevPage = () => {
    if (page > 1) {
      dispatch({ name: "PAGE", payload: page - 1 });
    }
  };

  const goToPage = (page: number) => {
    if (page > 0 && page <= maxPage) dispatch({ name: "PAGE", payload: page });
  };

  return (
    <div className="flex-1 flex items-end py-4 px-4 w-full">
      <div className="flex items-center w-full justify-between">
        <button
          disabled={page === 1}
          onClick={prevPage}
          className={buttonClass}
        >
          Previous
        </button>
        <span className="text-sm font-medium">
          Page{" "}
          {maxPage > 0 ? (
            <select
              data-testid="page-select"
              className="text-orange-400"
              value={page.toString()}
              onChange={(e) => goToPage(Number(e.target.value))}
            >
              {Array.from(Array(maxPage).keys()).map((_, index) => (
                <option key={index}>{index + 1}</option>
              ))}
            </select>
          ) : (
            maxPage
          )}{" "}
          of {maxPage}
        </span>
        <button
          disabled={page >= maxPage}
          onClick={nextPage}
          className={buttonClass}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;

import { BiSort, BiSortDown, BiSortUp } from "react-icons/bi";
import Sort from "../Sort";
import { TableContext } from "../Context";
import { describe, expect, test, vitest } from "vitest";
import { fireEvent, render } from "@testing-library/react";

describe("Sort", () => {
  const mockDispatch = vitest.fn();
  const mockSort = {
    name: "asc",
  };

  test('renders Sort component with BiSortUp icon when sort is "asc"', () => {
    const container = render(
      <TableContext.Provider
        value={[
          { filters: {}, sort: mockSort, page: 1, itemsPerPage: 10 },
          mockDispatch,
        ]}
      >
        <Sort name="name" />
      </TableContext.Provider>
    );

    expect(container.getByTestId("sort")).not.toBeNull();
    expect(container.getByTestId("sort-up")).not.toBeNull();
  });

  test('renders Sort component with BiSortDown icon when sort is "desc"', () => {
    const mockSortDesc = {
      name: "desc",
    };
    const container = render(
      <TableContext.Provider
        value={[
          { filters: {}, sort: mockSortDesc, page: 1, itemsPerPage: 10 },
          mockDispatch,
        ]}
      >
        <Sort name="name" />
      </TableContext.Provider>
    );

    expect(container.getByTestId("sort")).not.toBeNull();
    expect(container.getByTestId("sort-down")).not.toBeNull();
  });

  test('renders Sort component with BiSort icon when sort is neither "asc" nor "desc"', () => {
    const container = render(
      <TableContext.Provider
        value={[
          { filters: {}, sort: {}, page: 1, itemsPerPage: 10 },
          mockDispatch,
        ]}
      >
        <Sort name="name" />
      </TableContext.Provider>
    );

    expect(container.getByTestId("sort")).not.toBeNull();
    expect(container.getByTestId("sort-default")).not.toBeNull();
  });

  test("dispatches the SORT action on button click", () => {
    const container = render(
      <TableContext.Provider
        value={[
          { filters: {}, sort: { name: "asc" }, page: 1, itemsPerPage: 10 },
          mockDispatch,
        ]}
      >
        <Sort name="name" />
      </TableContext.Provider>
    );

    const applyButton = container.getByTestId("sort");

    fireEvent.click(applyButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      name: "SORT",
      payload: ["name", "desc"],
    });
  });
});

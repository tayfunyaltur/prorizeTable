import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Pagination from "./";
import { describe, expect, it, vitest } from "vitest";
import { TableContext } from "../Context";

describe("Pagination", () => {
  it("should render the component", () => {
    const maxPage = 5;
    const { getByText } = render(<Pagination maxPage={maxPage} />);

    // Assert that the component is rendered
    expect(getByText("Previous")).not.toBeNull();
    expect(getByText("Next")).not.toBeNull();
  });

  it("should disable the Previous button when on the first page", () => {
    const maxPage = 5;
    const { getByText } = render(<Pagination maxPage={maxPage} />);
    const previousButton = getByText("Previous") as HTMLButtonElement;

    // Assert that the Previous button is disabled
    expect(previousButton.disabled).toBe(true);
  });

  it("should disable the Next button when on the last page", () => {
    const maxPage = 1;
    const { getByText } = render(<Pagination maxPage={maxPage} />);
    const nextButton = getByText("Next") as HTMLButtonElement;

    // Assert that the Next button is disabled
    expect(nextButton.disabled).toBe(true);
  });

  it("should call the appropriate functions when buttons are clicked", () => {
    const maxPage = 5;
    const mockDispatch = vitest.fn();
    const { getByText, getByLabelText, getByTestId } = render(
      <TableContext.Provider
        value={[
          { filters: {}, sort: {}, page: 3, itemsPerPage: 10 },
          mockDispatch,
        ]}
      >
        <Pagination maxPage={maxPage} />
      </TableContext.Provider>
    );
    const previousButton = getByText("Previous");
    const nextButton = getByText("Next");
    const selectElement = getByTestId("page-select");

    // Click the Previous button
    fireEvent.click(previousButton);
    expect(mockDispatch).toHaveBeenCalledWith({
      name: "PAGE",
      payload: 2,
    });

    // Click the Next button
    fireEvent.click(nextButton);
    expect(mockDispatch).toHaveBeenCalledWith({
      name: "PAGE",
      payload: 4,
    });

    // Change the page using the select element
    fireEvent.change(selectElement, { target: { value: "3" } });
    expect(mockDispatch).toHaveBeenCalledWith({
      name: "PAGE",
      payload: 3,
    });
  });
});

import { render, fireEvent } from "@testing-library/react";
import NumberFilter from "./NumberFilter";
import { describe, expect, test, vitest } from "vitest";
import { TableContext } from "../Context";

describe("NumberFilter", () => {
  test("renders without errors", () => {
    render(
      <NumberFilter
        name="Test Filter"
        accessor="test"
        isOpen={true}
        setIsOpen={() => {}}
      />
    );
  });

  test("updates the min and max values on input change", () => {
    const { getByPlaceholderText } = render(
      <NumberFilter
        name="Test Filter"
        accessor="test"
        isOpen={true}
        setIsOpen={() => {}}
      />
    );

    const minInput = getByPlaceholderText("Min Test Filter");
    const maxInput = getByPlaceholderText("Max Test Filter");

    fireEvent.change(minInput, { target: { value: "10" } });
    fireEvent.change(maxInput, { target: { value: "20" } });

    expect(minInput.value).toBe("10");
    expect(maxInput.value).toBe("20");
  });

  test("clears the min and max values on clear button click", () => {
    const { getByText, getByPlaceholderText } = render(
      <NumberFilter
        name="Test Filter"
        accessor="test"
        isOpen={true}
        setIsOpen={() => {}}
      />
    );

    const minInput = getByPlaceholderText(
      "Min Test Filter"
    ) as HTMLInputElement;
    const maxInput = getByPlaceholderText(
      "Max Test Filter"
    ) as HTMLInputElement;
    const clearButton = getByText("Clear");

    fireEvent.change(minInput, { target: { value: "10" } });
    fireEvent.change(maxInput, { target: { value: "20" } });
    fireEvent.click(clearButton);

    expect(minInput.value).toBe("");
    expect(maxInput.value).toBe("");
  });

  test("dispatches filter and page actions on apply button click", () => {
    const dispatchMock = vitest.fn();
    const setIsOpenMock = vitest.fn();

    const { getByText } = render(
      <TableContext.Provider
        value={[
          { itemsPerPage: 10, filters: {}, page: 1, sort: {} },
          dispatchMock,
        ]}
      >
        <NumberFilter
          name="Test Filter"
          accessor="test"
          isOpen={true}
          setIsOpen={setIsOpenMock}
        />
      </TableContext.Provider>
    );

    const applyButton = getByText("Apply");

    fireEvent.click(applyButton);

    expect(dispatchMock).toHaveBeenCalledWith({
      name: "FILTER",
      payload: { mintest: "", maxtest: "" },
    });

    expect(dispatchMock).toHaveBeenCalledWith({ name: "PAGE", payload: 1 });
    expect(setIsOpenMock).toHaveBeenCalledWith(false);
  });
});

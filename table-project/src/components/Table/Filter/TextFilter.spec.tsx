import { beforeEach, describe, expect, it, vitest } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TextFilter from "./TextFilter";
import { TableContext } from "../Context";

vitest.mock("pg", () => {});

describe("TextFilter", () => {
  const mockDispatch = vitest.fn();
  const mockSetIsOpen = vitest.fn();

  beforeEach(() => {
    vitest.clearAllMocks();
  });

  it("should render input field and buttons", () => {
    render(
      <TextFilter
        name="Test Filter"
        accessor="testAccessor"
        isOpen
        setIsOpen={mockSetIsOpen}
      />
    );

    expect(screen.getByRole("button", { name: "+" })).not.toBeNull();
    expect(screen.getByRole("button", { name: "Clear" })).not.toBeNull();
    expect(screen.getByRole("button", { name: "Apply" })).not.toBeNull();
  });

  it('should add a filter item on clicking the "+" button', () => {
    render(
      <TableContext.Provider
        value={[
          {
            itemsPerPage: 10,
            filters: {},
            page: 1,
            sort: {},
          },
          mockDispatch,
        ]}
      >
        <TextFilter
          name="Test Filter"
          accessor="testAccessor"
          isOpen
          setIsOpen={mockSetIsOpen}
        />
      </TableContext.Provider>
    );

    const inputField = screen.getByTestId("filter-input") as HTMLInputElement;
    const addButton = screen.getByRole("button", { name: "+" });
    const applyButton = screen.getByRole("button", { name: "Apply" });

    fireEvent.change(inputField, { target: { value: "Test Item" } });
    fireEvent.click(addButton);
    fireEvent.click(applyButton);

    expect(inputField.value).toBe("");
    expect(mockDispatch).toHaveBeenCalledWith({
      name: "FILTER",
      payload: { testAccessor: ["Test Item"] },
    });
  });

  it('should remove a filter item on clicking the "-" button', () => {
    render(
      <TableContext.Provider
        value={[
          {
            itemsPerPage: 10,
            filters: {},
            page: 1,
            sort: {},
          },
          mockDispatch,
        ]}
      >
        <TextFilter
          name="Test Filter"
          accessor="testAccessor"
          isOpen
          setIsOpen={mockSetIsOpen}
        />
      </TableContext.Provider>
    );

    const addItemButton = screen.getByRole("button", { name: "+" });
    const applyButton = screen.getByRole("button", { name: "Apply" });

    fireEvent.change(screen.getByTestId("filter-input"), {
      target: { value: "Test Item" },
    });
    fireEvent.click(addItemButton);

    const removeItemButton = screen.getByRole("button", { name: "-" });
    fireEvent.click(removeItemButton);

    fireEvent.click(applyButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      name: "FILTER",
      payload: { testAccessor: [] },
    });
  });

  it('should clear all filter items on clicking the "Clear" button', () => {
    render(
      <TableContext.Provider
        value={[
          {
            itemsPerPage: 10,
            filters: {},
            page: 1,
            sort: {},
          },
          mockDispatch,
        ]}
      >
        <TextFilter
          name="Test Filter"
          accessor="testAccessor"
          isOpen
          setIsOpen={mockSetIsOpen}
        />
      </TableContext.Provider>
    );

    const addItemButton = screen.getByRole("button", { name: "+" });
    const clearButton = screen.getByRole("button", { name: "Clear" });
    const applyButton = screen.getByRole("button", { name: "Apply" });

    fireEvent.change(screen.getByTestId("filter-input"), {
      target: { value: "Test Item" },
    });
    fireEvent.click(addItemButton);

    fireEvent.click(clearButton);

    fireEvent.click(applyButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      name: "FILTER",
      payload: { testAccessor: [] },
    });
  });

  it('should call dispatch and setIsOpen on clicking the "Apply" button', () => {
    render(
      <TableContext.Provider
        value={[
          {
            itemsPerPage: 10,
            filters: {},
            page: 1,
            sort: {},
          },
          mockDispatch,
        ]}
      >
        <TextFilter
          name="Test Filter"
          accessor="testAccessor"
          isOpen
          setIsOpen={mockSetIsOpen}
        />
      </TableContext.Provider>
    );

    const applyButton = screen.getByRole("button", { name: "Apply" });

    fireEvent.click(applyButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      name: "FILTER",
      payload: { testAccessor: [] },
    });
    expect(mockDispatch).toHaveBeenCalledWith({ name: "PAGE", payload: 1 });
    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
  });
});

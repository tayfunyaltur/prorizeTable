import React from "react";
import { render, screen, within } from "@testing-library/react";
import Table from "./";
import { beforeEach, describe, expect, test, vitest } from "vitest";

// Mock the onFetchData function
const mockFetchData = vitest.fn();

const mockData = {
  rows: [
    { id: 1, name: "John Doe", age: 30 },
    { id: 2, name: "Jane Smith", age: 25 },
  ],
  columns: [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Age", accessor: "age" },
  ],
  totalPages: 2,
  onFetchData: mockFetchData,
  isLoading: false,
};

describe("Table", () => {
  beforeEach(() => {
    render(<Table {...mockData} />);
  });

  test("renders table headers", () => {
    const headers = screen.getAllByRole("columnheader");
    expect(headers).toHaveLength(mockData.columns.length);
    expect(headers[0].textContent).toBe("ID");
    expect(headers[1].textContent).toBe("Name");
    expect(headers[2].textContent).toBe("Age");
  });

  test("renders table rows with data", () => {
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(mockData.rows.length + 1); // +1 for the header row

    const rowData = mockData.rows[0];
    const firstRowCells = within(rows[1]).getAllByRole("cell");
    expect(firstRowCells).toHaveLength(mockData.columns.length);

    expect(firstRowCells[0].textContent).toBe(rowData.id.toString());
    expect(firstRowCells[1].textContent).toBe(rowData.name);
    expect(firstRowCells[2].textContent).toBe(rowData.age.toString());
  });

  test("displays 'No data' message when rows are empty", () => {
    render(<Table {...mockData} rows={[]} />);
    const noDataMessage = screen.getByText("There is no data to display");
    expect(noDataMessage).not.toBeNull();
  });
});

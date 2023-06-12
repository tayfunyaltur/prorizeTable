import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Loading from ".";

describe("Loading component", () => {
  it("renders the loading spinner", () => {
    const { container } = render(<Loading />);

    const spinner = container.querySelector(".animate-spin");
    expect(spinner).not.toBeNull();
  });
});

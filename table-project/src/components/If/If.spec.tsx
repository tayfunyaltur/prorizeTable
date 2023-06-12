import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import If from "./";

describe("If component", () => {
  it("renders children when the test is true", () => {
    const { getByText } = render(
      <If test={true}>
        <div>Children content</div>
      </If>
    );

    expect(getByText("Children content")).not.toBeNull();
  });

  it("does not render children when the test is false", () => {
    const { container } = render(
      <If test={false}>
        <div>Children content</div>
      </If>
    );

    expect(container.firstChild).toBeNull();
  });
});

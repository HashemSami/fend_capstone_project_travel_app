import { resultComponent } from "resultComponent";

describe("resultComponent", () => {
  it("should be able to return an empty paragraph when there an empty object passed", () => {
    const result = "<p></p>";
    expect(resultComponent({})).toBe(result);
  });
});

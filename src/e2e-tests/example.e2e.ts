import { functionOne } from "@this-package";

describe("function One", () => {
  it("returns Foo", () => {
    const result = functionOne();
    expect(result).toEqual("Foo");
  });
});

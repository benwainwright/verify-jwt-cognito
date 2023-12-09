import { parseHeader } from "./parse-header.js";

describe("parse header", () => {
  it("should return the header if the token is valid", () => {
    const result = parseHeader(
      "eyJraWQiOiAiZm9vIiwgImFsZyI6ICJiYXIifQ==.YXNkZmFzZGY="
    );
    expect(result).toEqual({ kid: "foo", alg: "bar" });
  });

  it("should throw an error if the token contains no separators", () => {
    expect(() => parseHeader("asdgdafas")).toThrow("Token is invalid");
  });

  it("should throw an error if the decoded header string isn't JSON", () => {
    expect(() => parseHeader("ZHNmYXNmZA==.YXNkZmFzZGY=")).toThrow(
      "Token is invalid"
    );
  });

  it("should throw an error if the decoded header is JSON but isn't the right format", () => {
    expect(() =>
      parseHeader("eyJpZCI6ICJmb28iLCAiYWxnIjogImJhciJ9.YXNkZmFzZGY=")
    ).toThrow("Token is invalid");
  });
});

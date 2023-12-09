import { verifyJwtToken } from "@this-package";

describe("verify-jwt", () => {
  it("should return a failure when passed a nonsense token", async () => {
    const result = await verifyJwtToken({
      awsRegion: "us-east-1",
      awsPoolId: "us-east-1_nfWupeuVh",
      token: "string",
    });

    expect(result.isValid).toEqual(false);
  });
});

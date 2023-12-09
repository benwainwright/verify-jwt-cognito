import { mock } from "vitest-mock-extended";
import jsonwebtoken from "jsonwebtoken";
import type { Secret } from "jsonwebtoken";

import { PublicKeyMeta } from "@types";

import { verify } from "./verify.js";
import { vi } from "vitest";

vi.mock("jsonwebtoken");

afterEach(() => {
  vi.resetAllMocks();
});

type VerifyFunc = (
  token: string,
  secretOrPublicKey: Secret | jsonwebtoken.GetPublicKeyOrSecret,
  callback?: jsonwebtoken.VerifyCallback
) => void;

describe("verify", () => {
  it("rejects the promise if the callback returns an error", async () => {
    const error = new jsonwebtoken.TokenExpiredError(
      "expired",
      new Date(Date.now())
    );

    vi.mocked<VerifyFunc>(jsonwebtoken.verify).mockImplementation(
      (_token, _key, callback) => {
        callback?.(error, undefined);
      }
    );

    const keyMeta = mock<PublicKeyMeta>();

    await expect(verify("foo", keyMeta)).rejects.toBe(error);
  });
});

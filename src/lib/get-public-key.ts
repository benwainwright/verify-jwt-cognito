import { TokenHeader } from "@types";
import { getPublicKeys } from "./get-public-keys.js";

export const getPublicKey = async (
  header: TokenHeader,
  awsRegion: string,
  awsPoolId: string
) => {
  const keys = await getPublicKeys(awsRegion, awsPoolId);
  const key = keys[header.kid];
  if (typeof key === "undefined") {
    throw new Error("claim made for unknown kid");
  }
  return key;
};

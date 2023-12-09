import jwkToPem from "jwk-to-pem";
import { getIssuer } from "./get-issuer.js";

import { PublicKey, PublicKeyMeta } from "@types";

interface PublicKeys {
  keys: PublicKey[];
}

interface MapOfKidToPublicKey {
  [key: string]: PublicKeyMeta | undefined;
}

let cacheKeys: MapOfKidToPublicKey | undefined;
export const getPublicKeys = async (
  region: string,
  poolId: string
): Promise<MapOfKidToPublicKey> => {
  if (!cacheKeys) {
    const issuer = getIssuer(region, poolId);
    const url = `${issuer}/.well-known/jwks.json`;
    const response = await fetch(url);
    const publicKeys = (await response.json()) as PublicKeys;
    cacheKeys = publicKeys.keys.reduce<MapOfKidToPublicKey>(
      (agg: MapOfKidToPublicKey, current: PublicKey) => {
        const pem = jwkToPem(current);
        agg[current.kid] = { instance: current, pem };
        return agg;
      },
      {}
    );
    return cacheKeys;
  } else {
    return cacheKeys;
  }
};

import jsonwebtoken, { JwtPayload } from "jsonwebtoken";

import { Claim, PublicKeyMeta } from "@types";

type Payload = {
  "cognito:username": string;
  sub: string;
  token_use: string;
  auth_time: number;
  client_id: string;
  given_name: string;
  family_name: string;
  exp: number;
} & JwtPayload;

export const verify = async (
  token: string,
  key: PublicKeyMeta
): Promise<Claim> => {
  return new Promise<Claim>((resolve, reject) => {
    jsonwebtoken.verify(token, key.pem, (error, payload) => {
      if (error) {
        reject(error);
      } else {
        if (typeof payload === "string") {
          reject(new Error("verify did not return claim details"));
          return;
        }
        if (!payload) {
          reject(new Error("claim returned no data"));
          return;
        }

        const data = payload as Payload;

        const claim = {
          tokenUse: data.token_use,
          authTime: data.auth_time,
          clientId: data.client_id,
          username: data["cognito:username"],
          ...data,
        };
        resolve(claim);
      }
    });
  });
};

import { VerifyConfig, VerifyJwtResult } from "@types";
import { getIssuer } from "./get-issuer.js";
import { parseHeader } from "./parse-header.js";
import { verify } from "./verify.js";
import { getPublicKey } from "./get-public-key.js";

/**
 * @public
 *
 * Verify a JWT token originating from a specific AWS Cognito user pool. This implementation was adapted from
 * https://github.com/awslabs/aws-support-tools/blob/master/Cognito/decode-verify-jwt/decode-verify-jwt.ts
 *
 * @param config - configuration object
 */
export const verifyJwtToken = async (
  config: VerifyConfig
): Promise<VerifyJwtResult> => {
  try {
    const { token, awsRegion, awsPoolId } = config;
    const header = parseHeader(token);
    const key = await getPublicKey(header, awsRegion, awsPoolId);
    const claim = await verify(token, key);
    if (claim.iss !== getIssuer(awsRegion, awsPoolId)) {
      throw new Error("claim issuer is invalid");
    }

    const { authorisedGroups } = config;

    const returnVal = {
      userName: claim.username,
      firstName: claim.given_name,
      surname: claim.family_name,
      groups: claim["cognito:groups"] ?? [],
    };

    if (authorisedGroups && authorisedGroups.length > 0) {
      const isValid = (claim["cognito:groups"] ?? []).some((group) =>
        authorisedGroups.includes(group)
      );
      return isValid
        ? { ...returnVal, isValid: true }
        : {
            isValid: false,
            error: new Error(`User is not part of an authorised group`),
          };
    }

    return {
      ...returnVal,
      isValid: true,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error : new Error(String(error)),
      isValid: false,
    };
  }
};

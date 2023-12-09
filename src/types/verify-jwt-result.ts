import { VerifyJwtResultFailure } from "./verify-jwt-result-failure.js";
import { VerifyJwtResultSuccess } from "./verify-jwt-result-success.js";

/**
 * @public
 * The result of a JWT verification
 */
export type VerifyJwtResult = VerifyJwtResultSuccess | VerifyJwtResultFailure;

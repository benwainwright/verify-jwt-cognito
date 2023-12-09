/**
 * @public
 * The result of a failed JWT verification
 */
export interface VerifyJwtResultFailure {
  /**
   * Whether the token is valid
   */
  isValid: false;

  /**
   * The error that occurred
   */
  error: Error;
}

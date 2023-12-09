/**
 * The result of a successful JWT verification
 * @public
 */
export interface VerifyJwtResultSuccess {
  /**
   * The username attached to the JWT token
   */
  readonly userName: string;

  /**
   * The first name of the user attached to the JWT token
   */
  readonly firstName: string;

  /**
   * The surname of the user attached to the JWT token
   */
  readonly surname: string;

  /**
   * Whether the token is valid
   */
  readonly isValid: true;

  /**
   * The groups the user is a member of
   */
  readonly groups: string[];
}

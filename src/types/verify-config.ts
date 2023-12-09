/**
 * Configuration object for verifying a JWT token
 *
 * @public
 */
export interface VerifyConfig {
  /**
   * The token to verify
   */
  token: string;

  /**
   * If supplied, the function call will result in a failure if the user is not in one of the specified groups
   */
  readonly authorisedGroups?: string[];

  /**
   * If supplied, the function call will result in a failure if the user is not one of the specified users
   */
  readonly authorisedUser?: string[];

  /**
   * The AWS region in which the user pool is located
   */
  readonly awsRegion: string;

  /**
   * The AWS Cognito user pool ID which issued the token
   */
  readonly awsPoolId: string;
}

export const getIssuer = (region: string, poolId: string): string =>
  `https://cognito-idp.${region}.amazonaws.com/${poolId}`;

# verify-jwt-cognito

Verify a JWT token supplied by AWS Cognito

## Install

`npm install verify-jwt-cognito`

## Usage

```typescript
import { verifyJwtToken } from "jwt-verify-cognito";

const yourCode = async (token: string) => {
  const result = await verifyJwtToken({
    awsRegion: "<region>",
    awsPoolId: "<poolId>",
    token,
  });

  if (result.isValid) {
    // Do something
  }
};
```

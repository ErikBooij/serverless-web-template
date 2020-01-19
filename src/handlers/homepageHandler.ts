import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import assetPath                                       from '../core/assetPath';

export default async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  return {
    body: `<!doctype html>
<html lang="en">
<head>
    <title>Serverless Web Template</title>
    <link rel="icon" type="image/x-icon" href="${assetPath('favicon.ico')}">
</head>
<body>
    <h1>Homepage</h1>
</body>
</html>
`,
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html'
    }
  }
}

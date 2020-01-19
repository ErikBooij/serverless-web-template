import { APIGatewayProxyResult } from 'aws-lambda';
import { readFileSync }          from 'fs';

export default async (assetLocation: string): Promise<APIGatewayProxyResult> => {
  const contents = readFileSync(assetLocation);

  return {
    body: contents.toString('base64'),
    statusCode: 200,
    headers: {
        'Content-Type': 'image/png'
    },
    isBase64Encoded: true
  };
};

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export default async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  return {
    body: '<h1>Homepage</h1>',
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html'
    }
  }
}

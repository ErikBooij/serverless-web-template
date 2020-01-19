import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export default async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 404,
    body: '<h1>Sorry, not found</h1>',
    headers: {
      'Content-Type': 'application/json'
    }
  }
}

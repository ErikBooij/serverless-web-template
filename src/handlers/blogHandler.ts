import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export default async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const suffix = (event.pathParameters && event.pathParameters.name) ? ` ${event.pathParameters.name}` : '';

  return {
    body: `<h1>Blog${suffix}</h1>`,
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html'
    }
  }
}

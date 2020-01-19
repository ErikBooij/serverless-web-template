import { APIGatewayProxyEvent } from 'aws-lambda';

export default (event: APIGatewayProxyEvent, header: string): string|undefined => {
  for (const [ key, value ] of Object.entries(event.headers)) {
    if (key.toLowerCase() === header.toLowerCase()) {
      return value;
    }
  }
}

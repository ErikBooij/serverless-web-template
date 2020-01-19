import { APIGatewayProxyEvent } from 'aws-lambda';
import headerValue              from './headerValue';

export default (event: APIGatewayProxyEvent): any => {
  if (headerValue(event, 'Content-Type') !== 'application/json') {
    return;
  }

  try {
    return JSON.parse(event.body || '');
  } catch (e) {
    return undefined;
  }
}

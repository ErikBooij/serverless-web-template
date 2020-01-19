import { resolve } from 'path';

import { APIGatewayProxyEvent } from 'aws-lambda';

import Router, { RouteType } from './core/router/Router';
import homepageHandler       from './handlers/homepageHandler';
import blogHandler           from './handlers/blogHandler';

const assetPath = (relativePath: string) => resolve(__dirname, '..', 'assets', relativePath);

export const entry = async (event: APIGatewayProxyEvent) => {
  const router = new Router();

  router.registerStatic('/', homepageHandler);
  router.registerStatic('/blog', blogHandler);

  router.registerRegex(/^\/blog\/(?<name>\[a-z]+)$/, blogHandler);

  router.registerAsset('/icon.png', assetPath('png/icon-inverted.png'));
  router.registerAsset('/png/', assetPath('png/'));

  return router.handle(event);
};

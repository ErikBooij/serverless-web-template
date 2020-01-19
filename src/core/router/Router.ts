import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { existsSync, statSync } from 'fs';
import { resolve }              from 'path';

import assetHandler    from './assetHandler';
import notFoundHandler from './notFoundHandler';

export type Handler = (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>;

type StandardRoute = {
  handler: Handler
  path: string
}

type RegexRoute = {
  handler: Handler
  path: RegExp
}

type AssetRoute = {
  resourceLocation: string
  path: string
}

export enum RouteType {
  REGEX,
  STANDARD,
}

export default class Router {
  private staticRoutes: StandardRoute[] = [];
  private regexRoutes: RegexRoute[] = [];
  private assetRoutes: AssetRoute[] = [];

  public registerAsset(path: string, resourceLocation: string): void {
    this.assetRoutes.push({ path, resourceLocation });
  }

  public registerStatic(path: string, handler: Handler): void {
    this.staticRoutes.push({ path, handler });
  }

  public registerRegex(path: RegExp, handler: Handler): void {
    this.regexRoutes.push({ path, handler });
  }

  public handle(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    // STATIC ROUTES
    for (const route of this.staticRoutes) {
      if (route.path === event.path) {
        return route.handler(event);
      }
    }

    // ASSET ROUTES
    for (const route of this.assetRoutes) {
      if (route.path === event.path) {
        return this.isFile(route.resourceLocation) ? assetHandler(route.resourceLocation) : notFoundHandler(event);
      }

      if (event.path.indexOf(route.path) === 0 && this.isFolder(route.resourceLocation)) {
        const nestedPath = resolve(route.resourceLocation, event.path.replace(new RegExp(`^${route.path}`), ''));

        if (this.isFile(nestedPath)) {
          return assetHandler(nestedPath);
        }
      }
    }

    // REGEX ROUTES
    for (const route of this.regexRoutes) {
      const match = new RegExp(route.path).exec(event.path);

      if (match) {
        event.pathParameters = match.groups as { [ name: string ]: string };

        return route.handler(event);
      }
    }

    return notFoundHandler(event);
  }

  private isFile(location: string): boolean {
    return existsSync(location) && statSync(location).isFile();
  }

  private isFolder(location: string): boolean {
    return existsSync(location) && statSync(location).isDirectory();
  }
}

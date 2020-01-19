process.env.ASSET_HOST = process.env.ASSET_HOST || 'http://127.0.0.1/assets';

const assetHost = process.env.ASSET_HOST.trim().replace(/\/+$/, '');

export default (path: string): string => `${assetHost}/${path.trim().replace(/^\/+/, '')}`;

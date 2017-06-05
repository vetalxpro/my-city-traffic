import { Configuration, HotModuleReplacementPlugin, SourceMapDevToolPlugin } from 'webpack';
import { webpackConfig } from './webpack-common.config';
import { serverPort } from './main.config';

export function webpackDevServerConfig(): Configuration {
  const devServerConfig = webpackConfig();

  devServerConfig.plugins.unshift(
    new HotModuleReplacementPlugin(),
    new SourceMapDevToolPlugin({
      filename: null, // if no value is provided the sourcemap is inlined
      test: /\.(ts|js)$/i, // process .js and .ts files only
      exclude: [ /node_modules/ ]
    })
  );

  devServerConfig.entry[ 'main' ] = [
    'webpack/hot/dev-server',
    `webpack-dev-server/client?http://localhost:${serverPort}/`,
    devServerConfig.entry[ 'main' ]
  ];

  return devServerConfig;
}

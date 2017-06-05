import { Configuration, optimize } from 'webpack';
import { webpackConfig } from './webpack-common.config';
import * as CleanWebpackPlugin from 'clean-webpack-plugin';
import { distDir, rootDir } from './main.config';

export function webpackProductionConfig(): Configuration {

  const productionPlugins = [
    new CleanWebpackPlugin(distDir, {
      root: rootDir,
      verbose: true,
      dry: false,
      exclude: []
    }),
    new optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    })
  ];

  const config: Configuration = webpackConfig();
  config.plugins.unshift(...productionPlugins);

  return config;
}

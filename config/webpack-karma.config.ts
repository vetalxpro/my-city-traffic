import { Configuration } from 'webpack';
import { webpackConfig } from './webpack-common.config';

export function karmaWebpackConfig(): Configuration {
  return webpackConfig(true);
}

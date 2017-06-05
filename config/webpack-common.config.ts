import { Configuration } from 'webpack';
import { loadersConfig } from './webpack-loaders.config';
import { pluginsConfig } from './webpack-plugins.config';
import { srcDir, distDir, entries, outputJsName, publicPath, resolveExtensions } from './main.config';

export function webpackConfig( karma: boolean = false ): Configuration {
  const entryConfig = {
    main: entries.main,
    polyfills: entries.polyfills
  };
  const config: Configuration = {
    output: {
      filename: outputJsName,
      path: distDir,
      publicPath: publicPath
    },
    plugins: pluginsConfig(karma),
    module: {
      rules: loadersConfig(karma)
    },
    resolve: {
      extensions: resolveExtensions
    }
  };
  if ( karma ) {
    return config;
  } else {
    config.context = srcDir;
    config.entry = entryConfig;
    return config;
  }
}

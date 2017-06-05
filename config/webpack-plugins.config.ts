import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import {
  Plugin,
  NoEmitOnErrorsPlugin,
  DefinePlugin,
  optimize,
  ProvidePlugin,
  ProgressPlugin,
  SourceMapDevToolPlugin
} from 'webpack';

import { assetsDir, distDir, entryOrder, env, favicon, htmls, outputCssName } from './main.config';
import { keys } from './keys.config';


export function pluginsConfig( karma: boolean = false ): Plugin[] {

  const corePlugins = [
    new NoEmitOnErrorsPlugin(),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env)
      }
    }),
    new ProvidePlugin({})
  ];

  // common webpack plugins
  const commonPlugins = [
    ...corePlugins,
    new ProgressPlugin(),
    new optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ( module ) => module.resource && (/node_modules/).test(module.resource),
      chunks: [
        'main'
      ]
    }),
    new CopyWebpackPlugin([
      {
        from: assetsDir.srcPath,
        to: assetsDir.distPath
      },
      {
        from: favicon,
        to: distDir
      }
    ]),
    new HtmlWebpackPlugin({
      template: htmls.index,
      title: 'AngularJS',
      inject: 'body',
      chunksSortMode: ( left, right ) => {
        const leftIndex = entryOrder.indexOf(left.names[ 0 ]);
        const rightIndex = entryOrder.indexOf(right.names[ 0 ]);
        return leftIndex - rightIndex;
      },
      google: keys.google
    }),
    new ExtractTextPlugin({
      filename: outputCssName,
      disable: env !== 'production'
    })
  ];

  // webpack plugins for karma
  const karmaPlugins = [
    new SourceMapDevToolPlugin({
      filename: null, // if no value is provided the sourcemap is inlined
      test: /\.(ts|js)$/i, // process .js and .ts files only
      exclude: [ /node_modules/ ]
    }),
    ...corePlugins
  ];

  if ( !karma ) {
    return commonPlugins;
  } else {
    return karmaPlugins;
  }
}

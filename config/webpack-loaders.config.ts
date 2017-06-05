import { Rule } from 'webpack';
import { env, srcDir, outputFilesName } from './main.config';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';


export function loadersConfig( karma: boolean = false ): Rule[] {

  const styleLoaders = [
    {
      loader: 'css-loader'
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: () => {
          return [
            require('autoprefixer')({
              browsers: [ 'last 2 versions', 'ie 9' ]
            })
          ];
        },
        sourceMap: true
      }
    },
    {
      loader: 'resolve-url-loader',
      options: {
        keepQuery: true
      }
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
        includePaths: [
          srcDir
        ]
      }
    }
  ];

  return [
    {
      test: /\.ts$/,
      include: srcDir,
      loaders: karma ? [
        'istanbul-instrumenter-loader',
        'awesome-typescript-loader'
      ] : [ 'awesome-typescript-loader' ]

    },
    /*{
     test: /\.ts$/,
     include: mainConfig.srcDir,
     enforce: 'pre',
     use: [
     { loader: 'tslint-loader' }
     ]
     },*/
    {
      test: /\.(css|scss|sass)$/,
      use: karma ? styleLoaders : ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: styleLoaders
      })
    },
    {
      test: /\.json$/,
      loader: 'json-loader',
    },
    {
      test: /\.(jpg|png|gif|otf|cur|ani|ttf|eot|svg|woff|woff2)$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: outputFilesName
      }
    },
    {
      test: /\.html$/,
      use: [
        {
          loader: 'html-loader',
          options: {
            minimize: env === 'production'
          }
        }
      ]
    },
    {
      test: /\.pug$/,
      use: [
        {
          loader: 'pug-loader',
          options: {
            pretty: env !== 'production'
          }
        }
      ]
    }
  ];
}

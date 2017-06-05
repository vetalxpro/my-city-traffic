import { Options } from 'webpack';

export const statsConfig: Options.Stats = {
  // Add asset Information
  assets: true,
  // Sort assets by a field
  assetsSort: 'field',
  // Add information about cached (not built) modules
  cached: true,
  // Add children information
  children: true,
  // Add chunk information (setting this to `false` allows for a less verbose output)
  chunks: false,
  // Add built modules information to chunk information
  chunkModules: true,
  // Add the origins of chunks and chunk merging info
  chunkOrigins: true,
  // Sort the chunks by a field
  chunksSort: 'field',
  // `webpack --colors` equivalent
  colors: true,
  // Add errors
  errors: true,
  // Add details to errors (like resolving log)
  errorDetails: true,
  // Add the hash of the compilation
  hash: true,
  // Add built modules information
  modules: false,
  // Sort the modules by a field
  modulesSort: 'field',
  // Add public path information
  publicPath: true,
  // Add information about the reasons why modules are included
  reasons: false,
  // Add the source code of modules
  source: true,
  // Add timing information
  timings: true,
  // Add webpack version information
  version: true,
  // Add warnings
  warnings: false
};

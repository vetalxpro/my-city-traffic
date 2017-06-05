import { join } from 'path';

/*
 ===============
 ENV
 ===============
 */
export const env = process.env.NODE_ENV || 'development';

/*
 ===============
 Names
 ===============
 */
export const staticDirName = 'assets';
export const outputJsName = `${staticDirName}/js/[name].bundle.js`;
export const outputCssName = `${staticDirName}/css/styles.css`;
export const outputFilesName = `${staticDirName}/[name].[hash:8].[ext]`;
export const assetsPathPattern = '[name].[ext]';

/*
 ===============
 Paths
 ===============
 */
export const rootDir = process.cwd();
export const srcDir = join(rootDir, 'src');
export const appDir = join(srcDir, 'app');
export const docsDir = join(rootDir, 'docs');
export const reportsDir = join(rootDir, 'reports');
export const distDir = join(rootDir, 'dist');
export const favicon = join(srcDir, 'favicon.ico');
export const assetsDir = {
  srcPath: join(srcDir, staticDirName),
  distPath: join(distDir, staticDirName)
};
export const htmls = {
  index: join(srcDir, 'index.pug')
};

/*
 ===============
 Entry Points
 ===============
 */
export const entries = {
  main: './main.ts',
  polyfills: './polyfills.ts'
};

/*
 ===============
 Others
 ===============
 */
export const publicPath = '/';
export const entryOrder = [ 'polyfills', 'vendor', 'main' ];
export const exclude = [ /node_modules/, /\.spec\.ts$/ ];
export const resolveExtensions = [ '.ts', '.tsx', '.js', '.json' ];


export const serverPort = 3000;
export const isDevServerHot = true;

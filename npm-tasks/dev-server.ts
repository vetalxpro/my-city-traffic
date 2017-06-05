import * as webpack from 'webpack';
import * as WebpackDevServer from 'webpack-dev-server';
import { statsConfig } from '../config/webpack-stats.config';
import { webpackDevServerConfig } from '../config/webpack-dev-server.config';
import { isDevServerHot, serverPort } from '../config/main.config';

function task() {
  const config = webpackDevServerConfig();
  const compiler = webpack(config);

  const server = new WebpackDevServer(compiler, {
    publicPath: config.output.publicPath,
    stats: statsConfig,
    historyApiFallback: true,
    hot: isDevServerHot
  });

  server.listen(serverPort);
}

task();

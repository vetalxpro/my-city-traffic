import * as webpack from 'webpack';
import { statsConfig } from '../config/webpack-stats.config';
import { webpackProductionConfig } from '../config/webpack-production.config';

function task() {
  const compiler = webpack(webpackProductionConfig());

  compiler.run(( err, stats ) => {
    if ( err ) {
      return console.error(err);
    }
    console.log(stats.toString(statsConfig));
  });

}

task();

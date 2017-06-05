import { remove } from 'fs-extra';
import { distDir } from '../config/main.config';

remove(distDir, ( err ) => {
  if ( err ) {
    throw err;
  }
  console.log('Dist Directory cleaned');
});

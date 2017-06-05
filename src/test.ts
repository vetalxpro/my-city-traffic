import './main.ts';
import 'angular-mocks';

const context = require.context('./', true, /\.spec\.ts$/);
context.keys().map(context);
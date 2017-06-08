import { IComponentOptions, IController } from 'angular';

export const dashboardComponentSelector = 'dashboard';

class DashboardController implements IController {
  constructor() {
  }

}

export const DashboardComponent: IComponentOptions = {
  controller: DashboardController,
  template: require('./dashboard.html')
};

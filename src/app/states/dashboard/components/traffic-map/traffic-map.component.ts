import {IComponentOptions} from 'angular';
import './traffic-map.scss';


export const trafficMapSelector = 'trafficMap';

class TrafficMapController {
    constructor() {
    }

}

export const TrafficMapComponent: IComponentOptions = {
    controller: TrafficMapController,
    template: require('./traffic-map.html')
};

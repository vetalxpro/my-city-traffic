import {
  AuthService, GeoService, ToastService, StorageService,
  FirebaseRequestService
} from './core/providers/services';
import { User } from './core/models';


export class AppService {
  static $inject = [ 'AuthService', 'GeoService', 'ToastService', 'StorageService', 'FirebaseRequestService' ];

  constructor( private authService: AuthService,
               private geoService: GeoService,
               private toastService: ToastService,
               private storageService: StorageService,
               private requestService: FirebaseRequestService<User> ) {
  }

  public findCoordinates() {
    this.geoService.getCurrentCoordinates()
      .then(( position ) => this.geoService.getPlace(position))
      .then(( place: google.maps.GeocoderResult ) => {
        const latLng = place.geometry.location;
        // const sw = place.geometry.bounds.getSouthWest();
        // const ne = place.geometry.bounds.getNorthEast();
        const updates = {
          location: {
            position: {
              lat: latLng.lat(), lng: latLng.lng()
            }
            // bounds: {
            //   sw: { lat: sw.lat(), lng: sw.lng() },
            //   ne: { lat: ne.lat(), lbg: ne.lng() }
            // }
          },
          placeId: place.place_id
        };
        this.authService.currentUser = Object.assign(this.authService.currentUser, updates);
        this.storageService.saveUser(this.authService.currentUser);
        this.requestService.patch(`users/${this.authService.currentUser.id}`, updates);
        // TODO: update user in firebase
        return place;
      })
      .then(( place ) => {
        this.toastService.showSimple(place.formatted_address);
      })
      .catch(( err ) => {
        this.toastService.showSimple(err.message || 'Ошибка геосервиса. Проверьте настройки браузера.');
      });
  }

  public auth() {
    this.authService.authenticate()
      .then(( user ) => {
        this.toastService.showSimple(`Привет, ${user.username}`);
      })
      .catch(( err ) => {
        this.toastService.showSimple(err.message || 'Ошибка аутентификации');
      });
  }

  public logout() {
    this.authService.logout()
      .then(() => {
        this.toastService.showSimple('Вы разлогинились');
      })
      .catch(( err ) => {
        this.toastService.showSimple(err.message || 'Ошибка');
      });
  }

  public getUser(): User {
    return this.authService.currentUser;
  }
}

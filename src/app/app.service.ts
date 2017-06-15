import { AuthService, GeoService, ToastService, StorageService } from './core/modules/providers-module/services';
import { User } from './core/models';


export class AppService {
  static $inject = [ 'AuthService', 'GeoService', 'ToastService', 'StorageService' ];

  constructor( private authService: AuthService,
               private geoService: GeoService,
               private toastService: ToastService,
               private storageService: StorageService ) {
  }

  public findCoordinates() {
    this.geoService.getCurrentCoordinates()
      .then(( pos: Position ) => this.geoService.getCity(pos))
      .then(( city: google.maps.GeocoderResult ) => {
        const latLng = city.geometry.location;
        const sw = city.geometry.bounds.getSouthWest();
        const ne = city.geometry.bounds.getNorthEast();
        const updates = {
          location: {
            position: {
              lat: latLng.lat(), lng: latLng.lng()
            },
            bounds: {
              sw: { lat: sw.lat(), lng: sw.lng() },
              ne: { lat: ne.lat(), lbg: ne.lng() }
            }
          },
          placeId: city.place_id
        };
        this.authService.currentUser = Object.assign(this.authService.currentUser, updates);
        this.storageService.saveUser(this.authService.currentUser, true);
        // TODO: update user in firebase
        this.toastService.showSimple(city.formatted_address);
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

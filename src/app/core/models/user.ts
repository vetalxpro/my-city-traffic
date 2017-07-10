import { LocationWithBounds } from './location-with-bounds';

export interface IUser {
  id?: number | string;
  providerId?: string;
  username?: string;
  email?: string;
  image?: string;
  token?: string;
  lastLogin?: Date;
  location?: LocationWithBounds;
  online?: boolean;
  placeId?: string;
}

export class User implements IUser {
  public id: number | string;
  public providerId: string;
  public username: string;
  public email: string;
  public image: string;
  public token: string;
  public lastLogin: Date;
  public online: boolean;
  public placeId: string;
  public location = new LocationWithBounds({});

  constructor( user: IUser ) {
    this.id = user.id || null;
    this.providerId = user.providerId || null;
    this.username = user.username || null;
    this.email = user.email || null;
    this.image = user.image || null;
    this.token = user.token || null;
    this.lastLogin = user.lastLogin || null;
    this.online = user.online || null;
    this.location = new LocationWithBounds(user.location);
    this.placeId = user.placeId || null;
  }
}

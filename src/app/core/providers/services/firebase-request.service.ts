import { IPromise, IQService } from 'angular';


export class FirebaseRequestService<T> {
  static $inject = [ 'firebase', '$firebaseArray', '$firebaseObject', '$q' ];
  private firebaseRef: any;

  constructor( private firebase,
               private $firebaseArray,
               private $firebaseObject,
               private $q: IQService ) {
    this.firebaseRef = this.firebase.database().ref();
  }

  public get( url: string, options: any = {} ): IPromise<T | T[]> {
    const { ref, id, idList } = this.parseUrl(url);
    const firebaseProvider = id && !options.asArray ? this.connectToFirebaseObject(ref, idList) : this.connectToFirebaseArray(ref, idList, id);
    return firebaseProvider.$loaded()
      .then(( newRef ) => {
        if ( id && !options.asArray ) {
          const index = firebaseProvider.$indexFor(newRef.key);
          return firebaseProvider[ index ];
        } else {
          return firebaseProvider;
        }
      });
  }

  public post( url: string, data: any, options: any = {} ): IPromise<T | T[]> {
    const { ref, id, idList } = this.parseUrl(url);
    const firebaseProvider = id && !options.asArray ? this.connectToFirebaseObject(ref, idList) : this.connectToFirebaseArray(ref, idList, id);
    return this.$q(( resolve, reject ) => {
      if ( id && !options.asArray ) {
        firebaseProvider[ id ] = data;
        firebaseProvider.$save();
        resolve(firebaseProvider[ id ]);
      } else {
        firebaseProvider.$add(data)
          .then(( newRef ) => {
            const index = firebaseProvider.$indexFor(newRef.key);
            resolve(firebaseProvider[ index ]);
          });
      }
    });
  }

  public patch( url: string, data: any ): IPromise<T | T[]> {
    const { ref, id, idList } = this.parseUrl(url);
    const obj = this.connectToFirebaseObject(ref, idList);
    return obj.$loaded()
      .then(() => {
        obj[ id ] = Object.assign({}, obj[ id ], data);
        obj.$save();
        console.log(obj);
        return obj[ id ];
      });
  }

  public put() {

  }

  public delete() {

  }

  private parseUrl( url: string ) {
    const pieces = url.split('/');
    const ref = pieces[ 0 ];
    let id;
    let idList;
    if ( pieces.length > 2 ) {
      id = pieces.pop();
      idList = pieces.splice(1);
    } else {
      id = pieces[ 1 ];
      idList = [];
    }
    return { ref, id, idList };
  }

  private connectToFirebaseArray( ref: any, idList: any[], id?: any ) {
    return this.$firebaseArray(this.deepChild(ref, idList, id));
  }

  private connectToFirebaseObject( ref: any, idList: any[] ) {
    return this.$firebaseObject(this.deepChild(ref, idList));
  }

  private deepChild( ref, idList, id?: any ) {
    let currentRef = this.firebaseRef.child(ref);
    for ( const item of idList ) {
      currentRef = currentRef.child(item);
    }
    if ( id ) {
      currentRef = currentRef.child(id);
    }
    return currentRef;
  }

  private getElementAndIndexById( arrayRef: any, id: string ) {
    const index = arrayRef.$indexFor(id);
    const el = arrayRef[ index ];
    return { el, index };
  }
}

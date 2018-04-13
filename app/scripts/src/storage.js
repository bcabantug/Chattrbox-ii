class Store { //using store for sessionStoring
  constructor(storageApi){
    this.api = storageApi;
  }
  get(){
    return this.api.getItem(this.key);
  }
  set(value){
    this.api.setItem(this.key, value);
  }

}

//subclass that stores the username
export class UserStore extends Store{
  constructor(key){
    super(sessionStorage); //super invokes Store's constructor
    this.key = key; // sets the value of this.key
  }
}

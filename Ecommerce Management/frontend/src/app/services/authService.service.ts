import { Injectable } from '@angular/core';
import { Cart } from '../Cart';

@Injectable({
  providedIn: 'root',
})
export class authService {
  tokn: any;

  constructor() {}

  public setToken(jwtToken: any) {
    let tokenStr = 'Bearer ' + jwtToken;
    sessionStorage.setItem('jwtToken', tokenStr);
  }

  public setCart(cart: any) {
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }

  public getCart(): any {
    return sessionStorage.getItem('cart');
  }

  public setFlag(flag: any) {
    sessionStorage.setItem('flag', flag);
  }

  public getFlag(): any {
    return sessionStorage.getItem('flag');
  }

  public setRole(role: any) {
    sessionStorage.setItem('admin', role);
  }

  public getRole(): any {
    return sessionStorage.getItem('admin');
  }

  /*public setLoggedStatus(isLoggedIn: any) {
    sessionStorage.setItem('isLoggedIn', isLoggedIn);
  }

  public getLoggedStatus() {
    return sessionStorage.getItem('isLoggedIn');
  }*/

  public getToken(): any {
    //const userJson = sessionStorage.getItem('jwtToken');
    //this.tokn = userJson !== null ? JSON.parse(userJson) : '';

    let token = sessionStorage.getItem('jwtToken');
    //console.log(!(user === null))
    if (token === null) {
      return null;
    } else {
      return token;
    }
    //return !(token === null);

    //return token !== null ? JSON.parse(token) : '';
    //JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  public clear() {
    sessionStorage.clear();
  }

  public isLoggedIn() {
    return this.getToken() && 1;
  }
}

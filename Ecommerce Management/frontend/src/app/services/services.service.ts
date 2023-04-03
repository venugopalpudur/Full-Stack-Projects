import { Course } from './../Course';
import { Password } from './../Password';
import { User } from './../User';
import { login } from './../login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  baseUrl,
  baseUrlSource,
  cartUrl,
  inventoryUrl,
  payBaseUrl,
  productUrl,
} from 'src/environments/environment';
import { Subject, tap } from 'rxjs';
import { Review } from '../Review';
import { Role } from '../Role';
import { Payment } from '../Payment';
import { Cart } from '../Cart';
import { Product } from '../Product';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  constructor(private httpClient: HttpClient) {}

  requestHeader = new HttpHeaders({
    'No-Auth': 'True',
  });

  private _refreshrequired = new Subject<void>();

  get Refreshrequired() {
    return this._refreshrequired;
  }

  public auth(login: login) {
    let resp = this.httpClient.post(
      `${baseUrl}/api/v1/auth/authenticate`,
      login,
      { headers: this.requestHeader }
    );
    console.log(resp);
    return resp;
  }

  public register(user: User) {
    /*let body = JSON.stringify(user);
    var head = new HttpHeaders({
      'Content-Type': 'application/json',
      'No-Auth': 'True',
    });*/

    let resp = this.httpClient.post(`${baseUrl}/api/v1/auth/register`, user, {
      headers: this.requestHeader,
    });
    return resp;
  }

  public accountConfirm(token: any) {
    console.log(`${baseUrl}/api/v1/auth/register/confirm?token=${token}`);
    let resp = this.httpClient.get(
      `${baseUrl}/api/v1/auth/register/confirm?token=${token}`,
      {
        headers: this.requestHeader,
      }
    );
    return resp;
  }

  public getAllCourses(token: any) {
    let tokenStr = token;
    let headers = new HttpHeaders().set('Authorization', tokenStr);
    let resp = this.httpClient.get(`${baseUrl}/api/v1/course/getall`); //
    return resp;
  }

  public getAllUsers(token: any) {
    let tokenStr = token;
    let headers = new HttpHeaders().set('Authorization', tokenStr);
    let resp = this.httpClient.get(`${baseUrl}/api/v1/user/getall`, {
      headers: headers,
    });
    return resp;
  }

  public getAllProducts() {
    let resp = this.httpClient.get(`${productUrl}/products/all`); //
    return resp;
  }

  public getAllImages() {
    let resp = this.httpClient.get(`${productUrl}/getImages/all`); //
    return resp;
  }

  public getAllInventories() {
    let resp = this.httpClient.get(`${inventoryUrl}/inventory/all`); //
    return resp;
  }

  public getCart(id: number) {
    let resp = this.httpClient.get(`${cartUrl}/cart/${id}`); //
    return resp;
  }

  public getAllOrders(token: any, id: number) {
    let tokenStr = token;
    let headers = new HttpHeaders().set('Authorization', tokenStr);
    let resp = this.httpClient.get(
      `${baseUrl}/api/shoppingservice/customer/${id}/orders`,
      {
        headers: headers,
      }
    );
    return resp;
  }

  public getAddProduct(token: any, product: Product) {
    //put method
    let tokenStr = token;
    let headers = new HttpHeaders().set('Authorization', tokenStr);
    let resp = this.httpClient.post(
      `${baseUrl}/api/shoppingservice/products`,
      product,
      {
        headers: headers,
      }
    );
    return resp;
  }

  public getImage(id: number) {
    let resp = this.httpClient.get(`${productUrl}/get/${id}`); //
    return resp;
  }

  public postImage(id: number, file: any) {
    let headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    let resp = this.httpClient.post(`${productUrl}/upload/${id}`, file, {
      observe: 'response',
    });
    return resp;
  }

  public getAddToCart(token: any, id: number, cart: Cart) {
    //put method
    let tokenStr = token;
    let headers = new HttpHeaders().set('Authorization', tokenStr);
    let resp = this.httpClient.put(
      `${baseUrl}/api/shoppingservice/customer/${id}/cart`,
      cart,
      {
        headers: headers,
      }
    );
    return resp;
  }

  public getPlaceOrder(token: any, id: number) {
    // post method
    let tokenStr = token;
    let headers = new HttpHeaders().set('Authorization', tokenStr);
    let resp = this.httpClient.get(
      `${baseUrl}/api/shoppingservice/customer/${id}/order`,
      {
        headers: headers,
      }
    );
    return resp;
  }

  public getUser(token: any) {
    let tokenStr = token;
    let headers = new HttpHeaders().set('Authorization', tokenStr);
    let resp = this.httpClient.get(`${baseUrlSource}/api/v1/user/getUser`, {
      headers: headers,
    });
    console.log(resp);
    return resp;
  }

  public assignRole(role: Role, userId: string, token: any) {
    let tokenStr = token;
    let headers = new HttpHeaders().set('Authorization', tokenStr);
    let resp = this.httpClient
      .post(`${baseUrl}/api/v1/user/assignRole?userId=${userId}`, role, {
        headers: headers,
      })
      .pipe(
        tap(() => {
          this._refreshrequired.next();
        })
      );
    return resp;
  }

  public addReviewToCourse(review: Review, courseId: string, token: any) {
    let tokenStr = token;
    let headers = new HttpHeaders().set('Authorization', tokenStr);
    let resp = this.httpClient
      .post(`${baseUrl}/api/v1/review?courseId=${courseId}`, review, {
        headers: headers,
        responseType: 'text' as 'json',
      })
      .pipe(
        tap(() => {
          this._refreshrequired.next();
        })
      );
    return resp;
  }

  public updateReviewToCourse(
    review: Review,
    courseId: string,
    reviewId: number,
    token: any
  ) {
    let tokenStr = token;
    let headers = new HttpHeaders().set('Authorization', tokenStr);
    let resp = this.httpClient
      .put(
        `${baseUrl}/api/v1/updateReview?reviewId=${reviewId}&courseId=${courseId}`,
        review,
        {
          headers: headers,
          responseType: 'text' as 'json',
        }
      )
      .pipe(
        tap(() => {
          this._refreshrequired.next();
        })
      );
    return resp;
  }

  public deleteReview(reviewId: number, token: any) {
    let tokenStr = token;
    let headers = new HttpHeaders().set('Authorization', tokenStr);
    let resp = this.httpClient
      .delete(`${baseUrl}/api/v1/deleteReview?reviewId=${reviewId}`, {
        headers: headers,
        responseType: 'text' as 'json',
      })
      .pipe(
        tap(() => {
          this._refreshrequired.next();
        })
      );
    return resp;
  }

  public savePayment(payment: Payment, courseId: string, token: any) {
    let tokenStr = token;
    let headers = new HttpHeaders().set('Authorization', tokenStr);
    let resp = this.httpClient.post(
      `${baseUrl}/api/v1/pay?courseId=${courseId}`,
      payment,
      {
        headers: headers,
      }
    );
    return resp;
  }

  public confirmPayment(otp: number, payid: number) {
    let resp = this.httpClient.get(
      `${payBaseUrl}/confirmPayment?otp=${otp}&userId=${payid}`
    );
    return resp;
  }

  public addCourse(course: Course, token: any) {
    let tokenStr = token;
    let headers = new HttpHeaders().set('Authorization', tokenStr);
    let resp = this.httpClient
      .post(`${baseUrl}/api/v1/course/create`, course, {
        headers: headers,
      })
      .pipe(
        tap(() => {
          this._refreshrequired.next();
        })
      );
    return resp;
  }

  public updateCourse(course: Course, courseId: string, token: any) {
    let tokenStr = token;
    let headers = new HttpHeaders().set('Authorization', tokenStr);
    let resp = this.httpClient
      .put(`${baseUrl}/api/v1/course/update?courseId=${courseId}`, course, {
        headers: headers,
      })
      .pipe(
        tap(() => {
          this._refreshrequired.next();
        })
      );
    return resp;
  }

  public subscribeCourse(courseId: string, payId: number, token: any) {
    let tokenStr = token;
    let headers = new HttpHeaders().set('Authorization', tokenStr);
    let resp = this.httpClient.get(
      `${baseUrl}/api/v1/subscribe?courseId=${courseId}&payId=${payId}`,
      {
        headers: headers,
      }
    );
    return resp;
  }

  public deleteCourse(courseId: string, token: any) {
    let tokenStr = token;
    let headers = new HttpHeaders().set('Authorization', tokenStr);
    let resp = this.httpClient
      .delete(`${baseUrl}/api/v1/course/delete?courseId=${courseId}`, {
        headers: headers,
      })
      .pipe(
        tap(() => {
          this._refreshrequired.next();
        })
      );
    return resp;
  }

  public getSubscribers(courseId: string, token: any) {
    let tokenStr = token;
    let headers = new HttpHeaders().set('Authorization', tokenStr);
    let resp = this.httpClient.get(
      `${baseUrl}/api/v1/course/getSubscribers?courseId=${courseId}`,
      {
        headers: headers,
      }
    );
    return resp;
  }

  public updateUser(user: User, token: any) {
    let tokenStr = token;
    let headers = new HttpHeaders().set('Authorization', tokenStr);
    let resp = this.httpClient
      .put(`${baseUrl}/api/v1/user/update`, user, {
        headers: headers,
      })
      .pipe(
        tap(() => {
          this._refreshrequired.next();
        })
      );
    return resp;
  }
  //----------------------------Below part Yet to work on ------------------------

  public changePassword(password: Password, token: any) {
    let tokenStr = token;
    let headers = new HttpHeaders().set('Authorization', tokenStr);
    let resp = this.httpClient
      .put(`${baseUrl}/api/v1/user/change-password`, password, {
        headers: headers,
      })
      .pipe(
        tap(() => {
          this._refreshrequired.next();
        })
      );
    return resp;
  }

  // ----------------------------------------- to be exmp--------------------------

  public mailConfirm() {
    let resp = this.httpClient.get(`${baseUrl}/api/v1/auth/confirm/e-mail`, {
      headers: this.requestHeader,
    });
    return resp;
  }

  public revokeRole(role: Role, userId: string, token: any) {
    let tokenStr = token;
    let headers = new HttpHeaders().set('Authorization', tokenStr);
    let resp = this.httpClient
      .post(`${baseUrl}/api/v1/review?userId=${userId}`, role, {
        headers: headers,
        responseType: 'text' as 'json',
      })
      .pipe(
        tap(() => {
          this._refreshrequired.next();
        })
      );
    return resp;
  }

  public getPayment(payid: number, userId: string, courseId: string) {
    // change port number 8084
    //let tokenStr = token;
    //let headers = new HttpHeaders().set('Authorization', tokenStr);
    let resp = this.httpClient.get(
      `${baseUrl}/getPayment?payid=${payid}&userId=${userId}&courseId=${courseId}`
    );
    return resp;
  }

  public unSubscribeCourse(courseId: string, token: any) {
    let tokenStr = token;
    let headers = new HttpHeaders().set('Authorization', tokenStr);
    let resp = this.httpClient.get(
      `${baseUrl}/api/v1/unsubscribe?courseId=${courseId}`,
      {
        headers: headers,
        responseType: 'text' as 'json',
      }
    );
    return resp;
  }

  public deleteAllCourses(token: any) {
    let tokenStr = token;
    let headers = new HttpHeaders().set('Authorization', tokenStr);
    let resp = this.httpClient
      .delete(`${baseUrl}/api/v1/course/deleteall`, {
        headers: headers,
      })
      .pipe(
        tap(() => {
          this._refreshrequired.next();
        })
      );
    return resp;
  }
}

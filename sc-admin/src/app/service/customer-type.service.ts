import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {ResponseWrapper} from "../models/response";
import {CustomerType} from "../models/customer-type";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CustomerTypeService {

  private readonly URL = environment.baseUrl + environment.dash + environment.customerTypeEndPoint;

  constructor(
    private http: HttpClient) {
  }

  getAll(): Observable<ResponseWrapper<CustomerType[]>> {
    return this.http.get<ResponseWrapper<CustomerType[]>>(this.URL);
  }

  getByCode(code: string): Observable<ResponseWrapper<CustomerType>> {
    return this.http.get<ResponseWrapper<CustomerType>>(this.URL + '/' + code);
  }

  save(customerType: CustomerType): Observable<ResponseWrapper<any>> {
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(customerType);
    return this.http.post<ResponseWrapper<any>>(this.URL, body, {headers});
  }

  update(customerType: CustomerType, code: string): Observable<ResponseWrapper<any>> {
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(customerType);
    return this.http.put<ResponseWrapper<any>>(this.URL + '/' + code, body, {headers});
  }

  delete(code: string): Observable<ResponseWrapper<any>> {
    return this.http.delete<ResponseWrapper<any>>(this.URL + '/' + code);
  }

}

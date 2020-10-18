import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseWrapper} from '../models/response';
import {MenuCategory} from '../models/menu-category';

@Injectable({
  providedIn: 'root'
})
export class MenuCategoryService {

  private readonly URL = environment.baseUrl + environment.dash + environment.menuCategoryEndPoint;

  constructor(
    private http: HttpClient) {
  }

  getAll(): Observable<ResponseWrapper<MenuCategory[]>> {
    return this.http.get<ResponseWrapper<MenuCategory[]>>(this.URL);
  }

  getByCode(name: string): Observable<ResponseWrapper<MenuCategory>> {
    return this.http.get<ResponseWrapper<MenuCategory>>(this.URL + '/' + name);
  }

  save(menuItem: MenuCategory): Observable<ResponseWrapper<any>> {
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(menuItem);
    return this.http.post<ResponseWrapper<any>>(this.URL, body, {headers});
  }

  update(menuItem: MenuCategory, name: string): Observable<ResponseWrapper<any>> {
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(menuItem);
    return this.http.put<ResponseWrapper<any>>(this.URL + '/' + name, body, {headers});
  }

  delete(code: string): Observable<ResponseWrapper<any>> {
    return this.http.delete<ResponseWrapper<any>>(this.URL + '/' + code);
  }
}

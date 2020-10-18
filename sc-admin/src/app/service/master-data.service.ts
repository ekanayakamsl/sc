import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseWrapper} from '../models/response';
import {MaintenanceData} from '../models/maintenance-data';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {

  private readonly URL = environment.baseUrl + environment.dash + environment.masterDataEndPoint;

  constructor(
    private http: HttpClient) {
  }

  getMaintenanceData(): Observable<ResponseWrapper<MaintenanceData>> {
    return this.http.get<ResponseWrapper<MaintenanceData>>(this.URL + '/maintenance-data');
  }
}

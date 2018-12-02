import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  get(url): Observable<any> {
    return this.http.get(url).map(res => res.json());
  }

  add(url, obj): Observable<any> {
    return this.http.post(url, JSON.stringify(obj), this.options);
  }

  edit(url,obj): Observable<any> {
    return this.http.put(`${url}/${obj._id}`, JSON.stringify(obj), this.options);
  }

  delete(url, obj): Observable<any> {    
    return this.http.delete(`${url}/${obj._id}`, this.options);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stock, StockInfo } from '../model/stock';


@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) { }

  getStock(model: Stock): Observable<StockInfo[]> {
    const url = 'https://qjeiwpbr5l.execute-api.us-east-1.amazonaws.com/default/twstock-lambda-3-12-4'
    let request = JSON.stringify(model)
    return this.http.post<StockInfo[]>(url, request);
  }
}

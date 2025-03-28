import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stock, StockInfo } from '../model/stock';


@Injectable({
  providedIn: 'root'
})
export class StockService {
  private eventSource!:EventSource;

  constructor(private http: HttpClient) { }

  getStock(model: Stock): Observable<StockInfo[]> {
    const url = 'https://qjeiwpbr5l.execute-api.us-east-1.amazonaws.com/default/twstock-lambda-3-12-4';
    let request = JSON.stringify(model)
    return this.http.post<StockInfo[]>(url, request);
  }

  changeStatus(model:Stock):Observable<any>{
    const url='https://k9do40j1b3.execute-api.us-east-1.amazonaws.com/default/trigger-step-function';
    let request = JSON.stringify(model);
    return this.http.post<any>(url,request);
  }

  connect(model:Stock): Observable<StockInfo[]> {
    const url = 'https://qjeiwpbr5l.execute-api.us-east-1.amazonaws.com/default/twstock-lambda-3-12-4';
    this.eventSource=new EventSource(url);

    return new Observable((observer)=>{
      this.eventSource.onmessage = (event:MessageEvent)=>{
        const messageData: StockInfo[] = JSON.parse(event.data);
        observer.next(messageData)
      };
      this.eventSource.onerror=(error:Event)=>{
        observer.error(error);
      }  
    })
  }

  disconnect():void{
    this.eventSource.close();
  }

}

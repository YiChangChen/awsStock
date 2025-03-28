import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StockService } from './services/stock.service';
import { FormsModule } from '@angular/forms';
import { Stock, StockInfo } from './model/stock';
import { concat, concatMap, tap } from 'rxjs';
import { TableModule } from 'primeng/table';

/**
 *
 *
 * @export
 * @class AppComponent
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,TableModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private stockService: StockService) {}
  title = 'angular';
  stockNo='';
  result:StockInfo[]=[];

  getStock(){
    let model:Stock={
      stockNo: this.stockNo,
      days: 1
    }

    this.stockService.connect(model)
    .pipe(tap(res=>console.log(res)))
    .subscribe(res=>this.result.concat(res));


    // this.stockService.getStock(model)
    // .pipe(tap(res=>console.log(res)))
    // .subscribe(res=>this.result = res);
  }}

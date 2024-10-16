import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StockService } from './services/stock.service';
import { FormsModule } from '@angular/forms';
import { Stock } from './model/stock';
import { tap } from 'rxjs';

/**
 *
 *
 * @export
 * @class AppComponent
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private stockService: StockService) {}
  title = 'angular';
  stockNo='';

  getStock(){
    let model:Stock={
      stockNo: '2330',
      days: 1
    }
    this.stockService.getStock(model)
    .pipe(tap(res=>console.log(res)))
    .subscribe();
  }
}

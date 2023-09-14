import { Component } from '@angular/core';
import { AgChartOptions } from 'ag-charts-community';
import { TransactionService } from 'src/app/transactions/transaction.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent {
  public options!: AgChartOptions;
  pageTitle: string = 'This graph shows how much money have you spend per category!'

  constructor(private transactionService: TransactionService) {}
  
  ngOnInit(){
    this.tmp();
    this.transactionService.transactionUpdated.subscribe(() => {
      this.tmp();
    })
  }

  

  private tmp(){
    this.options = {
      autoSize: true,
      data: this.transactionService.calculateExpenseByCategory(),
      theme: {
        overrides: {
          bar: {
            series: {
              strokeWidth: 0,
            },
          },
        },
      },
      title: {
        text: 'Spending by Category',
        fontSize: 18,
        spacing: 25,
      },
      
      series: [
        {
          type: 'bar',
          xKey: 'category',
          yKey: 'totalExpense',
        },
      ],
      axes: [
        {
          type: 'category',
          position: 'left',
        },
        {
          type: 'number',
          position: 'top',
          title: {
            enabled: true,
            text: '$',
          },
        },
      ],
    };
    console.log(this.options.data);
  }
  
}

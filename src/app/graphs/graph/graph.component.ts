import { Component } from '@angular/core';
import { AgChartOptions } from 'ag-charts-community';
import { TransactionService } from 'src/app/transactions/transaction.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent {
  public options: AgChartOptions;

  constructor(private transactionService: TransactionService) {
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
  }

}

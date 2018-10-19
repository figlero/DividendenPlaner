import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }

  getDivChart() {
    return new Chart('divChartCanvas', {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
        datasets: [{
          label: 'Höhe der Dividende',
          data: [12, 19, 3, 140, 30, 200, 20, 50, 1, 300, 50, 89],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  getKursChart() {
    return new Chart('kursChartCanvas', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
        datasets: [{
          label: 'Depotverlauf',
          data: [10000, 10300, 10800, 10850, 10220, 10500, 10700, 10950, 11300, 11170, 11450, 11400],
          backgroundColor: [
            'rgba(255, 160, 0, 0.2)',
          ],
          borderColor: [
            'rgba(255, 160, 0, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
          }]
        }
      }
    });
  }

  getKursChartStock(stockdata: Object[]) {
   const jsonarray = JSON.parse(JSON.stringify(stockdata));
    let labelArray: string[];
    let valueArray: string[];
    labelArray = [];
    valueArray = [];
    for (const l of jsonarray)  {
      labelArray.push(l.label);
      valueArray.push(l.close);
    }
    return new Chart('kursChartStockCanvas', {
      type: 'line',
      data: {
        labels: labelArray,
        datasets: [{
          label: 'Kursverlauf',
          data: valueArray,
          backgroundColor: [
            'rgba(255, 160, 0, 0.2)',
          ],
          borderColor: [
            'rgba(255, 160, 0, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
          }]
        }
      }
    });
  }
}

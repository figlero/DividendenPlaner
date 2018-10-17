import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../services/database.service';

@Component({
  selector: 'app-kauf',
  templateUrl: './kauf.component.html',
  styleUrls: ['./kauf.component.css']
})
export class KaufComponent implements OnInit {

  allStocks;

  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
    this.databaseService.stocks.subscribe(value => this.allStocks = value,
      error => console.log(error));
  }

}

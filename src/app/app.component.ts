import {Component, OnInit} from '@angular/core';
import {DatabaseService} from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DividendenPlaner';
  allDepots;

  constructor(private databaseService: DatabaseService) {}

  ngOnInit(): void {
    this.databaseService.depots.subscribe(value => this.allDepots = value, error1 => console.log(error1));
  }
}


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {

  today: Date = new Date();

  constructor() { }

  ngOnInit(): void {
  }

}

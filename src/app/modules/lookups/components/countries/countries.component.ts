import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  countries=[];
  constructor(private countriesService:CountriesService) { 
    countriesService.getAll().subscribe(res => {
      this.countries = res as []
      console.log(this.countries)
    })
  }

  ngOnInit(): void {
  }

}

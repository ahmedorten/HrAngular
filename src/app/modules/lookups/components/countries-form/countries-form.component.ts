import { CountriesService } from './../../services/countries.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'countries-form',
  templateUrl: './countries-form.component.html',
  styleUrls: ['./countries-form.component.css']
})
export class CountriesFormComponent {

  constructor(private countriesService:CountriesService,private route:Router) { }
  save(value) {
    this.countriesService.create(value).subscribe(res => {
      console.log(res)
        this.route.navigate(['/lookups/countries']);
    })
  }

}

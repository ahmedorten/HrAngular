import { Component, OnInit } from '@angular/core';
import { Relationships } from '../../models/relationship-types';

@Component({
  selector: 'app-relationships',
  templateUrl: './relationships.component.html',
  styleUrls: ['./relationships.component.css']
})
export class RelationshipsComponent implements OnInit {
RelationshipsList:Relationships[]=[];
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-simple-card',
  templateUrl: './simple-card.component.html',
  styleUrls: ['./simple-card.component.scss'],
})
export class SimpleCardComponent implements OnInit {
  @Input() titulo!: string;
  @Input() direccion!: string;
  constructor() { }

  ngOnInit() {}

}

import { Component, OnInit, Input } from '@angular/core';
import { Publicacion } from 'src/app/interfaces/Publicacion';

@Component({
  selector: 'app-simple-card-search',
  templateUrl: './simple-card-search.component.html',
  styleUrls: ['./simple-card-search.component.scss'],
})
export class SimpleCardSearchComponent implements OnInit {
  @Input() foto !: string;
  @Input() detalles !: string;
  @Input() titulo !: string;
  @Input() publicacion !: Publicacion;
  constructor() { }

  ngOnInit() {}

}

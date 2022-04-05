import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.scss'],
})
export class TarjetasComponent implements OnInit {
  @Input() titulo!: string;
  @Input() detalles!: string;
  @Input() status!: any;
  @Input() foto!: string;
  ruta = '../../..';
  constructor() { }

  ngOnInit() {}

}

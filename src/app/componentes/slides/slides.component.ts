import { Component, Input, OnInit } from '@angular/core';
import { Auxiliar } from 'src/app/interfaces/Auxiliar';
import { Publicacion } from 'src/app/interfaces/Publicacion';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss'],
})

export class SlidesComponent implements OnInit {
  @Input() publicaciones: Publicacion[];
  @Input() text: string;
  ruta = '../../..';
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor() { }

  ngOnInit() {}

}

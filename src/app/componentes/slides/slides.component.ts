import { Component, Input, OnInit } from '@angular/core';
import { Publicacion } from 'src/app/interfaces/Publicacion';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss'],
})

export class SlidesComponent implements OnInit {
  @Input() publicaciones: Publicacion[];
  ruta = '../../..';
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor() { }

  ngOnInit() {}

}

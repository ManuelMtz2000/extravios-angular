import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss'],
})

export class SlidesComponent implements OnInit {
  @Input() enlaces: any[];
  ruta = '../../..';
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor() { }

  ngOnInit() {}

}

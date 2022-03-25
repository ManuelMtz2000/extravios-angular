import { Component, OnInit, Input } from '@angular/core';
import { Publicacion } from 'src/app/interfaces/Publicacion';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() publicacion!: Publicacion;
  show = false;
  constructor() { }

  ngOnInit() {}

}

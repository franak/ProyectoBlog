import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularBlog';

  @ViewChild('') entrada: ElementRef
  laEntrada: object

  constructor() { }

  capturarEmitter(nuevoArticulo: any) {
    this.laEntrada = nuevoArticulo;
    console.log('child:', this.entrada)

  }

}

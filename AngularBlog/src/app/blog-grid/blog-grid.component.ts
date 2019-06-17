import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BlogApiService } from '../blog-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-grid',
  templateUrl: './blog-grid.component.html',
  styleUrls: ['./blog-grid.component.css']
})
export class BlogGridComponent implements OnInit {
  @Output() enviarEntrada: EventEmitter<object>

  Entradas: any = []
  ultimaEntrada: any = {}

  constructor(private api: BlogApiService, private router: Router) {
    this.enviarEntrada = new EventEmitter();
  }

  ngOnInit() {
    this.getAlliTems();
  }

  getAlliTems() {
    console.log(this.router.url.split('/'))
    let urlPathArray = this.router.url.split('/');
    let categoria = urlPathArray[2];
    this.api.getAllItems('Entradas', categoria).then((res: any) => {
      this.Entradas = res.__ENTITIES;
      this.ultimaEntrada = this.Entradas[res.__ENTITIES.length - 1]

    })
  }

  abrirEntrada(item) {
    this.enviarEntrada.emit(item);
    console.log(item)
    item.titulo = item.titulo.split(' ').join('-');
    this.router.navigate(['entrada', item.titulo]);
  }



}

import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogApiService } from '../blog-api.service';

@Component({
  selector: 'app-blog-entry',
  templateUrl: './blog-entry.component.html',
  styleUrls: ['./blog-entry.component.css']
})
export class BlogEntryComponent implements OnInit {

  @Input() laEntrada: object
  entrada: Array<any>

  constructor(private rutaActual: ActivatedRoute, private api: BlogApiService) { }

  ngOnInit() {
    this.getEntrada();
  }//onInit

  getEntrada() {
    this.rutaActual.params.subscribe(async params => {//nos subscribimos a los cambios
      let resultado: any = await this.api.getEntrada(params.tituloEntrada);
      console.log(resultado);
      this.entrada = resultado.__ENTITIES;


    })
  }
}

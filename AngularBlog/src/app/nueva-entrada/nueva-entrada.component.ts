import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BlogApiService } from '../blog-api.service';

@Component({
  selector: 'app-nueva-entrada',
  templateUrl: './nueva-entrada.component.html',
  styleUrls: ['./nueva-entrada.component.css']
})
export class NuevaEntradaComponent implements OnInit {

  formNuevaEntrada: FormGroup //tiene que estar importado en el module reactiveForms
  categorias: any = []

  constructor(private router: Router, private api: BlogApiService) {

    this.formNuevaEntrada = new FormGroup({
      titulo: new FormControl('', [
        Validators.required
      ]),
      contenido: new FormControl('', [
        Validators.required
      ]),
      categoria: new FormControl('', [
        Validators.required
      ])


    })//constructor
  }

  ngOnInit(): void {
    this.getCategories();

  }

  async onSubmit() {
    let nuevaEntrada: any = await this.api.sendNewEntry(this.formNuevaEntrada.value);
    console.log('ok: ', nuevaEntrada);
    nuevaEntrada.titulo = nuevaEntrada.titulo.split(' ').join('-');
    this.router.navigate(['entrada', nuevaEntrada.titulo]);
  }

  async getCategories() {
    let categorias = await this.api.getAllItems('Categorias', '');
    this.categorias = categorias.__ENTITIES;
    console.log(categorias);
  }

  abrirEntrada(item) {
    console.log(item)
    item.titulo = item.titulo.split(' ').join('-');
    this.router.navigate(['entrada', item.titulo]);
  }

}

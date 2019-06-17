import { Component, OnInit } from '@angular/core';
import { BlogApiService } from '../blog-api.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  Categorias: any[]

  constructor(private api: BlogApiService) { }

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.api.getAllItems('Categorias', '').then((res: any) => {
      console.log(res.__ENTITIES)
      this.Categorias = res.__ENTITIES;
    })
  }

  findByCategoria(catId) {
    this.api.getEntradasByCategoria(catId).then((res: any) => {
      console.log(res);
    })
  }

}

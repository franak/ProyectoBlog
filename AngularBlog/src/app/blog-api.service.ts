import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class BlogApiService {

  baseUrl = 'http://localhost:3000/rest';

  constructor(private http: HttpClient) { }

  async getAllItems(dataClass, categoria): Promise<any> {
    if (categoria) {
      return await this.getEntradasByCategoria(categoria);
    } else {
      return this.http.get(`${this.baseUrl}/${dataClass}`).toPromise();
    }
  }

  getEntrada(titulo: String) {
    let dataClass = 'Entradas';
    return this.http.get(`${this.baseUrl}/${dataClass}?titulo=${titulo}`).toPromise();
  }

  getEntradasByCategoria(categoria: String) {
    let dataClass = 'Entradas';
    return this.http.get(`${this.baseUrl}/${dataClass}?categoria=${categoria}`).toPromise();
  }

  sendNewEntry(content) {
    debugger;
    let dataClass = 'Entradas';
    return this.http.post(`${this.baseUrl}/${dataClass}/new`, content).toPromise();
  }

}

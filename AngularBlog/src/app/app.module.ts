import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { BlogGridComponent } from './blog-grid/blog-grid.component';
import { BlogEntryComponent } from './blog-entry/blog-entry.component';
import { LateralBlogComponent } from './lateral-blog/lateral-blog.component';
import { NuevaEntradaComponent } from './nueva-entrada/nueva-entrada.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    BlogGridComponent,
    BlogEntryComponent,
    LateralBlogComponent,
    NuevaEntradaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

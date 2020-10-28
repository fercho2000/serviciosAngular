import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Articulo } from '../models/articulos';
import { User } from '../models/user';
import { ArticulosService } from '../services/articulos.service';

@Component({
  selector: 'app-agregar-articulo',
  templateUrl: './agregar-articulo.component.html',
  styleUrls: ['./agregar-articulo.component.scss']
})
export class AgregarArticuloComponent implements OnInit {
  usuario: Array<User> = new Array<User>();
  formularioArticulo: FormGroup;
  articulo: Articulo = new Articulo();
  esNuevo: boolean = true;
  titulo: string = '';
  constructor(private articuloInyectado: ArticulosService, private formBuilder: FormBuilder,
    private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    this.esNuevo = JSON.parse(this.rutaActiva.snapshot.params.esNuevo);
    this.titulo = this.esNuevo ? 'Agregar' : 'Editar';

    this.formularioArticulo = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      userId: ['', Validators.required]
    });
    if (!this.esNuevo) {
      this.articulo = this.articuloInyectado.articulo;
      this.formularioArticulo.setValue({
        title: this.articulo.title,
        body: this.articulo.body,
        userId: this.articulo.userId
      });
    }
    this.articuloInyectado.leerTodosLosUsuario().subscribe((listaDeUsuario) => {
      this.usuario = listaDeUsuario;
    });
  }

  agregar() {
    this.articulo = this.formularioArticulo.value as Articulo;
    this.articuloInyectado.guardarArticulo(this.articulo).subscribe((respuesta) => {
      console.log("Felicidades registro el primer articulo..", respuesta);
      this.formularioArticulo.reset();
    });
  }

  editar() {
    this.articulo = this.formularioArticulo.value as Articulo;
    this.articulo.id = this.articuloInyectado.articulo.id;
    this.articuloInyectado.actualizarArticulo(this.articulo).subscribe((data) => {
      console.log("esta es tu data actualizada...", data);
    });
  }

}

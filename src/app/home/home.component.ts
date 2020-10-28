import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Articulo } from '../models/articulos';
import { ArticulosService } from '../services/articulos.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  articulos: Array<Articulo> = new Array<Articulo>();
  constructor(private usuarioInyectado: UsuarioService, private articuloInyectado: ArticulosService, private ruta: Router) { }

  ngOnInit(): void {
    this.articuloInyectado.leerNoticias().subscribe((articuloDesdeApi) => {
      this.articulos = articuloDesdeApi;
    });
    let articuloApiEnviar: Articulo = new Articulo();
    articuloApiEnviar.body = 'Este es cuerpo articulo';
    articuloApiEnviar.title = 'Prueba';
    articuloApiEnviar.userId = 1;

    this.articuloInyectado.guardarArticulo(articuloApiEnviar).subscribe((data) => {

      this.articulos.push(data);
    });
  }

  irAlDetalle(articulo: Articulo): void {
    this.articuloInyectado.articulo = articulo;
    this.ruta.navigateByUrl('/articulo-detalle');

  }
  borrar(id: number) {
    this.articuloInyectado.borrarArticulo(id).subscribe((data) => {
      console.log("devuelve...", data);
    });
  }
  actualizar(articulo: Articulo) {

    // articulo.body = 'Este es cuerpo editado';
    // articulo.title = 'Prueba editar';
    // articulo.userId = 1;
    this.articuloInyectado.articulo = articulo;
    this.articuloInyectado.actualizarArticulo(articulo).subscribe((data) => {
      console.log("respuesta del articulo al actualizar....", data);
    });
    this.ruta.navigateByUrl('/agregar-articulo/false');
  }

}

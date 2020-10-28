import { Component, OnInit } from '@angular/core';
import { Articulo } from '../models/articulos';
import { User } from '../models/user';
import { ArticulosService } from '../services/articulos.service';

@Component({
  selector: 'app-articulo-detalle',
  templateUrl: './articulo-detalle.component.html',
  styleUrls: ['./articulo-detalle.component.scss']
})
export class ArticuloDetalleComponent implements OnInit {
  articulos: Articulo = new Articulo();
  usuario: User = new User();
  constructor(private articuloInyectado: ArticulosService) {

    this.articulos = this.articuloInyectado.articulo;
  }

  ngOnInit(): void {

    this.articuloInyectado.leerUsuario(this.articulos.userId).subscribe((usuarioDesdeApi) => {
      this.usuario = usuarioDesdeApi;
    });
  }

}

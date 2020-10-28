import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario = new Usuario();

  constructor() {
    this.usuario.usuarioID = 1;
    this.usuario.nombre = 'Jose';
    this.usuario.apellido = 'Usuga';
    this.usuario.password = '54545444';
  }
}

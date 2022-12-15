import { AnuncioResponse } from './../../shared/models/anuncio.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  
  anuncios: AnuncioResponse[] = [];
  constructor() { }

  ngOnInit(): void {
    this.anuncios = [
      {titulo:'Productos de limpieza', subtitulo:'Conoce toda la variedad de nuestra linea de productos de limpieza, su fórmula elimina virus y bacterias para que mantengas tu hogar limpio y seguro mientras proteges a tu familia.', urlImage:'https://www.grupoalen.com/wp-content/uploads/2021/06/Grupo-AlEn-Productos.jpg'},
      {titulo:'Abarrotes', subtitulo:'Siempre es difícil complacer a toda la familia. Excepto en una tienda de abarrotes. Hasta la mascota, será feliz.', urlImage:'https://helpmybusinesspos.info/wp-content/uploads/2019/12/Cat%C3%A1logo-Abarrotes-sat-Excel-HelpMyBusinessPos.jpg'},
      {titulo:'Dulces', subtitulo:'Para los de diente dulce o los antojitos de la tarde, tenemos dulces, chocolates y hasta chicles para refrescar el aliento después de una rica botana.', urlImage:'http://cdn.shopify.com/s/files/1/0461/2040/3096/collections/C-Dulces.jpg?v=1625597721'},
      {titulo:'Desechables', subtitulo:'Siempre ten a la mano nuestros productos desechables como vasos y platos desechables, bolsas de basura o servilletas de papel.', urlImage:'https://tqpytokz.cdn.imgeng.in/media-adsa/static/3966/538.jpg'}
    ];
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ageName'
})
export class AgeNamePipe implements PipeTransform {

  private name_List = [
    { id: 1, name: 'Pequeño' },
    { id: 2, name: 'Mediano' },
    { id: 3, name: 'Aprobada' },
    { id: 4, name: 'Grande' },
    { id: 5, name: 'Muy grande' }
  ];

  transform(id: number | string): string {
    const found = this.name_List.find(item => item.id === id);
    return found ? found.name : 'Desconocido';
  }

}

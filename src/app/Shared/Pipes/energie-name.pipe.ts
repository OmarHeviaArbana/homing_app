import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'energieName'
})
export class EnergieNamePipe implements PipeTransform {

  private name_List = [
    { id: 1, name: 'Bajo' },
    { id: 2, name: 'Medio' },
    { id: 3, name: 'Alto' },
  ];

  transform(id: number | string): string {
    const found = this.name_List.find(item => item.id === id);
    return found ? found.name : 'Desconocido';
  }

}

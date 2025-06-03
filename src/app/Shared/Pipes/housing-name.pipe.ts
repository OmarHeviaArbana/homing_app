import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'housingName',
})
export class HousingNamePipe implements PipeTransform {

  private name_List = [
    { id: 1, name: 'Pendiente' },
    { id: 2, name: 'En Proceso' },
    { id: 3, name: 'Aprobada' },
    { id: 4, name: 'Rechazada' },
    { id: 5, name: 'Entregado' }
  ];

  transform(id: number | string): string {
    const found = this.name_List.find(item => item.id === id);
    return found ? found.name : 'Desconocido';
  }
}

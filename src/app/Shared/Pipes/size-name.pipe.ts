import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sizeName'
})
export class SizeNamePipe implements PipeTransform {

    private name_List = [
    { id: 1, name: 'Cachorro' },
    { id: 2, name: 'Joven' },
    { id: 3, name: 'Adulto' },
    { id: 4, name: 'Senior' },
  ];

  transform(id: number | string): string {
    const found = this.name_List.find(item => item.id === id);
    return found ? found.name : 'Desconocido';
  }

}

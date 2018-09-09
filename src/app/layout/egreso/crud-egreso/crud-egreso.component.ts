import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-crud-egreso',
  templateUrl: './crud-egreso.component.html',
  styleUrls: ['./crud-egreso.component.scss']
})
export class CrudEgresoComponent  {
  // displayedColumns = ['position', 'name', 'weight', 'symbol', 'fav'];
  displayedColumns = ['position', 'material', 'cantidad','star'];

  dataSource = new MatTableDataSource(ELEMENT_DATA);
  //
  numero:number=0;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  aumentar(){
    this.numero++;
    this.dataSource.data.push( { position: this.numero, material: 'nuevo', cantidad: 0})
    console.log(this.dataSource.data);
    this.dataSource._updateChangeSubscription();
  }
}

// export interface Element {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
//   fav: string;
// }

const ELEMENT_DATA: any[] = [
  // { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', fav: "Yes" },
  // { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca', fav: "" },
];
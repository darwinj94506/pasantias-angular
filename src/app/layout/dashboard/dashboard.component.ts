import { Component, OnInit , Inject, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import{MaterialService} from './../../shared/services/material.service'

export interface PeriodicElement {
    nombre: string;
    nombretipo: number;
    stock: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { nombretipo: 1, nombre: 'Hydrogen', stock: 1.0079 },
    { nombretipo: 2, nombre: 'Helium', stock: 4.0026 },
];

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    displayedColumns = [ 'nombretipo', 'nombre','stock'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);
    places: Array<any> = [];
    // ELEMENT_DATA: any[] = [];
    // length=0;

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    constructor(
        // private _material:MaterialService 
     ) {
        this.places = [
            {
                imgSrc: 'assets/images/card-1.jpg',
                place: 'Cozy 5 Stars Apartment',
                description:
                    'The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Barcelona.',
                charge: '$899/night',
                location: 'Barcelona, Spain'
            },
            {
                imgSrc: 'assets/images/card-2.jpg',
                place: 'Office Studio',
                description:
                    'The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the night life in London, UK.',
                charge: '$1,119/night',
                location: 'London, UK'
            },
            {
                imgSrc: 'assets/images/card-3.jpg',
                place: 'Beautiful Castle',
                description:
                    'The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Milan.',
                charge: '$459/night',
                location: 'Milan, Italy'
            }
        ];
    }

    ngOnInit() {}
}
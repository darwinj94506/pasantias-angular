import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
    color = 'primary';
    mode = 'determinate';
    value = 0;
    bufferValue =0;

    constructor() {}

    ngOnInit() {}
}

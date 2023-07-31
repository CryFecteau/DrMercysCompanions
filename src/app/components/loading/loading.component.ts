import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiDataService } from 'src/app/services/api-data.service';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
    @Output() hasUserEntered = new EventEmitter<boolean>();
    isLoading = true;
    isError = false;

    constructor(private apiDataService: ApiDataService) {
    }


    ngOnInit(): void {
        this.apiDataService.getAllData().subscribe({
            next: () => {
                this.isLoading = false;
                this.isError = false;
            },
            error: (error) => {
                console.error('Error loading data:', error);
                this.isLoading = false;
                this.isError = true;
            }
        });
    }

    enterSite() {
        this.hasUserEntered.emit(true);
    }
}

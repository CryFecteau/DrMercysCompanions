import { Component, OnInit } from '@angular/core';
import { ApiDataService } from 'src/app/services/api-data.service';

@Component({
  selector: 'app-home-store-info',
  templateUrl: './home-store-info.component.html',
  styleUrls: ['./home-store-info.component.scss']
})
export class HomeStoreInfoComponent implements OnInit {
  cookImg: any;
  constructor(private apiDataService: ApiDataService) { }

  ngOnInit(): void {
    this.apiDataService.getAssets().subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        data[i].id === 'homeCook' ? this.cookImg = data[i].img : null;
      }
    });
  }

}

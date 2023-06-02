import { Component, OnInit } from '@angular/core';
import { ApiDataService } from 'src/app/services/api-data.service';

@Component({
  selector: 'app-home-company-info',
  templateUrl: './home-company-info.component.html',
  styleUrls: ['./home-company-info.component.scss']
})
export class HomeCompanyInfoComponent implements OnInit {
  companionImg: any;
  constructor(private apiDataService: ApiDataService) { }

  ngOnInit(): void {
    this.apiDataService.getAssets().subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        data[i].id === 'homeCompanions' ? this.companionImg = data[i].img : null;
      }
    });
  }

}

import {Component, OnInit} from '@angular/core';
import {MasterDataService} from '../service/master-data.service';
import {MaintenanceData} from '../models/maintenance-data';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {

  maintenanceData: MaintenanceData;

  constructor(private readonly  masterDataService: MasterDataService) {
  }

  ngOnInit(): void {
    this.masterDataService.getMaintenanceData().subscribe(value => {
        this.maintenanceData = value.data;
      },
      err => {
        console.log('MaintenanceComponent', err);
      });
  }

}

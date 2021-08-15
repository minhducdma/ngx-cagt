import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-form-cham-soc-khach-hang',
  templateUrl: './form-cham-soc-khach-hang.component.html',
  styleUrls: ['./form-cham-soc-khach-hang.component.scss']
})
export class FormChamSocKhachHangComponent implements OnInit {
  starRate = 2;
  heartRate = 4;
  radioGroupValue = 'This is value 2';
  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-form-khach-hang',
  templateUrl: './form-khach-hang.component.html',
  styleUrls: ['./form-khach-hang.component.scss']
})
export class FormKhachHangComponent implements OnInit {
  starRate = 2;
  heartRate = 4;
  radioGroupValue = 'This is value 2';
  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { WindowRef } from '@progress/kendo-angular-dialog';

@Component({
  selector: 'ngx-form-import-khach-hang',
  templateUrl: './form-import-khach-hang.component.html',
  styleUrls: ['./form-import-khach-hang.component.scss']
})
export class FormImportKhachHangComponent implements OnInit {

  constructor(
    private windowRef: WindowRef
  ) { }

  ngOnInit() {
  }

  exportTemplate() {
    alert("Chức năng đang được cập nhật !");  
  }

  importHandler () {
    alert("Chức năng đang được cập nhật !");  
  }

  closeForm() {
    if(confirm("Bạn có chắc muốn hủy? ")) {
      this.windowRef.close(); 
    }
  }
}

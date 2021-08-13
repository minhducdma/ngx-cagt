import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ChangeDetectionStrategy } from '@angular/core';
import {
  TreeItemDropEvent,
  DropPosition,
  TreeItemLookup,
  DropAction,
} from "@progress/kendo-angular-treeview";

import { SmartTableData } from '../../../@core/data/smart-table';
const isOfType = (fileName: string, ext: string) =>
  new RegExp(`.${ext}\$`).test(fileName);
const isFile = (name: string) => name.split(".").length > 1;
@Component({
  selector: 'ngx-exam',
  templateUrl: './exam.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./exam.component.scss'],
})
export class ExamComponent {
//   public data: any[] = [{
//     id: 1, text: 'My Documents', items: [
//         {
//             id: 2, text: 'Kendo UI Project', items: [
//                 { id: 3, text: 'about.html' },
//                 { id: 4, text: 'index.html' },
//                 { id: 5, text: 'logo.png' }
//             ]
//         },
//         {
//             id: 6, text: 'New Web Site', items: [
//                 { id: 7, text: 'mockup.jpg' },
//                 { id: 8, text: 'Research.pdf' }
//             ]
//         },
//         {
//             id: 9, text: 'Reports', items: [
//                 { id: 10, text: 'February.pdf' },
//                 { id: 11, text: 'March.pdf' },
//                 { id: 12, text: 'April.pdf' }
//             ]
//         }
//     ]
// }];

// public iconClass({ text }: any): any {
//     return {
//         'k-i-file-pdf': isOfType(text, 'pdf'),
//         'k-i-folder': !isFile(text),
//         'k-i-html': isOfType(text, 'html'),
//         'k-i-image': isOfType(text, 'jpg|png'),
//         'k-icon': true
//     };
// }

// public getDragStatus(action: DropAction, destinationItem: TreeItemLookup): string {
//     if (destinationItem && action === DropAction.Add && isFile(destinationItem.item.dataItem.text)) {
//         return 'k-i-cancel';
//     }

//     switch (action) {
//         case DropAction.Add: return 'k-i-plus';
//         case DropAction.InsertTop: return 'k-i-insert-up';
//         case DropAction.InsertBottom: return 'k-i-insert-down';
//         case DropAction.InsertMiddle: return 'k-i-insert-middle';
//         case DropAction.Invalid:
//         default: return 'k-i-cancel';
//     }
// }

// public log(event: string, args?: any): void {
//     console.log(event, args);
// }

// public handleDrop(event: TreeItemDropEvent): void {
//     this.log('nodeDrop', event);

//     // prevent drop if attempting to add to file
//     if (isFile(event.destinationItem.item.dataItem.text) && event.dropPosition === DropPosition.Over) {
//         event.setValid(false);
//     }
// }
}
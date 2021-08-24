import { NgModule } from "@angular/core";
import { CKEditorModule } from 'ckeditor4-angular';
import { CKEditorCustomComponent } from "./ckeditor-custom.component";

@NgModule({
  imports: [CKEditorModule],
    declarations: [CKEditorCustomComponent],
    exports: [CKEditorCustomComponent]
})
export class CKEditorCustomModule { }

import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { NbSelectModule } from "@nebular/theme";
import { CagtSelectMultipleComponent } from "./cagt-select/cagt-select-multiple/cagt-select-multiple.component";

@NgModule({
    imports: [
        NbSelectModule,
        CommonModule 
    ],
    declarations: [
        CagtSelectMultipleComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    exports: [CagtSelectMultipleComponent],

  })
  export class ControlsModule { }
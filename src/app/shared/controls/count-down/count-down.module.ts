import { NgModule } from "@angular/core";
import { CountDownComponent } from "./count-down.component";

@NgModule({
    declarations: [CountDownComponent],
    exports: [CountDownComponent]
})
export class CountdownModule { }
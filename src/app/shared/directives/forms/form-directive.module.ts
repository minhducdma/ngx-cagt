import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormSubmitDirective} from './form-submit.directive';
import {ControlErrorContainerDirective} from './control-error-container.directive';
import {ControlErrorsDirective} from './control-errors.directive';
import {ControlRequiredDirective} from './control-required.directive';
import { ControlsModule } from '../../controls/controls.module';
const AllDirective = [
    ControlErrorContainerDirective,
    ControlErrorsDirective,
    FormSubmitDirective,
    ControlRequiredDirective
];

@NgModule({
    declarations: [AllDirective],
    imports: [CommonModule, ControlsModule],
    exports: [AllDirective],
})
export class FormDirectiveModule {
}

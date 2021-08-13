import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExamComponent } from './exam/exam.component';
import { TrainingComponent } from './training.component';

const routes: Routes = [{
  path: '',
  component: TrainingComponent,
  children: [
    {
      path: 'exam',
      component: ExamComponent,
    },
   
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingRoutingModule { }

export const routedComponents = [
  ExamComponent,TrainingComponent
];

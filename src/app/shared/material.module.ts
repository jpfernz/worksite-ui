import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';

const materialModules = [
  MatListModule,
];

@NgModule({
  declarations: [],
  imports: [

  ],
  exports: [
    ...materialModules
  ]
})
export class MaterialModule { }

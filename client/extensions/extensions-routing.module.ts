import { NgModule } from '@angular/core'

import { Routes, RouterModule } from '@angular/router'

const routes: Routes = [
  // Add the extension path as follows for lazy loading
  // { path: '', loadChildren: './new-extension#NewExtensionModule' },
  { path: 'sample', loadChildren: './sample#SampleModule' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtensionsRoutingModule { }

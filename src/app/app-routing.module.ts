import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TasksComponent} from './tasks/tasks.component';
import {EditTaskComponent} from './edit-task/edit-task.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { TaskInfoComponent } from './task-info/task-info.component';

const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'tasks', component: TasksComponent },
  { path: 'edit-task', component: EditTaskComponent },
  { path: 'add-task', component: AddTaskComponent },
  { path: 'task-info', component: TaskInfoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StorageServiceModule } from 'ngx-webstorage-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import {TasksListService} from './tasks-list.service';
import { TaskFormComponent } from './task-form/task-form.component';
import { AddTaskComponent } from './add-task/add-task.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { TaskInfoComponent } from './task-info/task-info.component';



@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    EditTaskComponent,
    TaskFormComponent,
    AddTaskComponent,
    TaskInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StorageServiceModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    TasksListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

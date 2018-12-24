import {Component, Input, OnInit} from '@angular/core';
import {Task} from '../interfaces';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TasksListService} from '../tasks-list.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import * as moment from 'moment';
import { ResetTimeService } from '../reset-time.service';


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  @Input() type: string;
  @Input() task: Task;
  totalTaskList: Task[];
  taskForm: FormGroup;
  showError: boolean = false;
  title = new FormControl(null, [Validators.required]);
  description = new FormControl(null, [Validators.required]);
  deadline = new FormControl(null, [Validators.required, Validators.pattern(`^[0-9]*$`)]);

  constructor(
    private fb: FormBuilder,
    private taskListService: TasksListService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.taskForm = this.fb.group({
      'title': this.title,
      'description': this.description,
      'deadline': this.deadline
    });
    this.totalTaskList = this.taskListService.getUnfinishedTaskList();
  }

  ngOnInit() {
    /*тип передается на случай если надо будет что то добавить например использовать эту форму для добавления подзадач. Тогда простая проверка на то что есть обьект задачи не поможет. Поэтому явно передаю тип действия.*/
    if (this.type === `edit`) {
      const _now = ResetTimeService.resetTimeToZero(moment());
      const deadlineDate = moment(this.task.deadlineDate);
      this.taskForm.setValue({
        'title': this.task.title,
        'description': this.task.description,
        'deadline':  deadlineDate.diff(_now, 'days')
      });
    } else {
      this.task = {
        id: null,
        title: ``,
        state: ``,
        deadlineDate: ``,
        description: ``
      };
    }
  }

  public addTask() {
    this.title.markAsTouched();
    this.description.markAsTouched();
    this.deadline.markAsTouched();
    this.task.deadlineDate = null;
    if (!this.taskForm.valid) {
      this.showError = true;
      return false;
    }
    const task: Task = this.taskForm.value;
    task.id = +moment().format('x');
    task.state = ``;
    const _now = ResetTimeService.resetTimeToZero(moment());
    task.deadlineDate = _now.add( +this.taskForm.value.deadline, 'day').format(`LL`);
    this.taskListService.addToUnfinishedTaskList(task);
    this.location.back();
  }

  public editTask() {
    this.task.title = this.taskForm.get('title').value;
    this.task.description = this.taskForm.get('description').value;
    this.task.description = this.taskForm.get('description').value;
    const _now = ResetTimeService.resetTimeToZero(moment());
    this.task.deadlineDate = _now.add( +this.taskForm.value.deadline, 'day').format(`LL`);
    this.taskListService.updateUnfinishedTaskList(this.task);
    this.location.back();
  }

  public doCancel() {
    this.type = null;
    this.task = null;
    this.totalTaskList = null;
    this.showError = false;
    this.location.back();
  }
}

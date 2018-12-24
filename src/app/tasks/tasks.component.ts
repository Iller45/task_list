import { Component, OnInit } from '@angular/core';
import {TasksListService} from '../tasks-list.service';
import {Task} from '../interfaces';
import * as moment from 'moment';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { ResetTimeService } from '../reset-time.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  unfinishedTaskList: Task[];
  finishedTaskList: Task[];
  constructor(
    private route: Router,
    private taskListService: TasksListService
  ) { }
  ngOnInit() {
    this.unfinishedTaskList = this.taskListService.getUnfinishedTaskList();
    this.finishedTaskList = this.taskListService.getFinishedTaskList();
    this.unfinishedTaskList.forEach((el) => {
      const deadlineDate = moment(el.deadlineDate);
      const _now = ResetTimeService.resetTimeToZero(moment());
      if (deadlineDate.diff(_now, 'days') <= 3  && deadlineDate.diff(moment(), 'days') > 0 ) {
        el.state = `warning`;
      } else if (deadlineDate.diff(_now, 'days') <= 0) {
        el.state = `failed`;
      } else {
        el.state = `normal`;
      }
    });
  }
  public finishTask (id: number) {
    this.finishedTaskList = this.taskListService.addToFinishedTaskList(id);
    this.unfinishedTaskList = this.taskListService.deleteUnfinishedTask(id);
  }
  private array_move (arr, old_index, new_index) {
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
  }
  public goToDetail(task) {
    this.route.navigate(['/task-info', {id: task.id}]).then();
  }
  drop(event: CdkDragDrop<object[]>) {
    this.unfinishedTaskList = this.array_move(this.unfinishedTaskList, event.previousIndex, event.currentIndex);
    this.taskListService.updateAllUnfinishedTaskList(this.unfinishedTaskList);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../interfaces';
import { TasksListService } from '../tasks-list.service';


@Component({
  selector   : 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls  : ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  totalTaskList: Task[];
  taskObj: Task = {
    'id'          : null,
    'state'       : ``,
    'deadlineDate': ``,
    'title'       : ``,
    'description' : ``
  };

  constructor(
    private route: ActivatedRoute,
    private taskListService: TasksListService
  ) {
  }

  ngOnInit() {
    this.totalTaskList = this.taskListService.getUnfinishedTaskList();
    this.taskObj.id    = +this.route.snapshot.paramMap.get(`id`);
    const taskIndex    = this.totalTaskList.findIndex(x => x.id === this.taskObj.id);
    this.taskObj       = this.totalTaskList[taskIndex];
  }

}

import {Inject, Injectable} from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import {Task} from './interfaces';

const STORAGE_KEY_UNFINISH = 'localUnfinishTaskList';
const STORAGE_KEY_FINISH = 'localFinishTaskList';

@Injectable({providedIn: 'root'})
export class TasksListService {
  constructor(@Inject(SESSION_STORAGE) private storage: StorageService) {
  }
  private findIndexById(id: number) {
    const currUnfinishedTaskList = this.getUnfinishedTaskList();
    return currUnfinishedTaskList.map(_task => _task.id).indexOf(id);
  }

  public getUnfinishedTaskList() {
    return this.storage.get(STORAGE_KEY_UNFINISH) || [];
  }
  public updateAllUnfinishedTaskList(list) {
    this.storage.set(STORAGE_KEY_UNFINISH, list);
  }
  public getFinishedTaskList() {
    return this.storage.get(STORAGE_KEY_FINISH) || [];
  }
  public addToUnfinishedTaskList(newTask: Task) {
    const currUnfinishedTaskList = this.getUnfinishedTaskList();
    currUnfinishedTaskList.push(newTask);
    this.storage.set(STORAGE_KEY_UNFINISH, currUnfinishedTaskList);
  }
  public addToFinishedTaskList(id: number) {
    const currUnfinishedTaskList = this.getUnfinishedTaskList();
    const currFinishedTaskList = this.getFinishedTaskList();
    const finishedIndex = this.findIndexById(id);
    currFinishedTaskList.push(currUnfinishedTaskList[finishedIndex]);
    this.storage.set(STORAGE_KEY_FINISH, currFinishedTaskList);
    return currFinishedTaskList;
  }
  public updateUnfinishedTaskList (newTask: Task) {
    const currUnfinishedTaskList = this.getUnfinishedTaskList();
    const updatedIndex = this.findIndexById(newTask.id);
    currUnfinishedTaskList[updatedIndex] = newTask;
    this.storage.set(STORAGE_KEY_UNFINISH, currUnfinishedTaskList);
  }
  public deleteUnfinishedTask(id: number) {
    const currUnfinishedTaskList = this.getUnfinishedTaskList();
    const updatedIndex = this.findIndexById(id);
    currUnfinishedTaskList.splice(updatedIndex, 1);
    this.storage.set(STORAGE_KEY_UNFINISH, currUnfinishedTaskList);
    return currUnfinishedTaskList;
  }
}

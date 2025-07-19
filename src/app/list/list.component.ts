import { Component, OnInit } from '@angular/core';
import { Task } from '../models';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: false
})
export class ListComponent implements OnInit {
  public objectLists: Task[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.objectLists = this.todoService.getTasks();
  }

  remove(index: number): void {
    this.todoService.deleteTask(index);
    location.reload();
  }

  toggleComplete(index: number, checked: boolean): void {
  this.todoService.updateTaskStatus(index, checked);
  this.objectLists[index].completed = checked;
}
}

import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Task } from '../models';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: false
})
export class ListComponent implements OnInit {
  @Input() categoryFilter: string = 'all';
  public objectLists: Task[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.objectLists = this.todoService.getTasks();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['categoryFilter']) {
      this.loadTasks();
    }
  }

  loadTasks(): void {
    const allTasks = this.todoService.getTasks();
    if (this.categoryFilter === 'all') {
      this.objectLists = allTasks;
    } else {
      this.objectLists = allTasks.filter(task => task.category === this.categoryFilter);
    }
  }

  remove(index: number): void {
    const allTasks = this.todoService.getTasks();
    const filteredTasks = this.categoryFilter === 'all'
      ? allTasks
      : allTasks.filter(task => task.category === this.categoryFilter);

    const taskToRemove = filteredTasks[index];
    const actualIndex = allTasks.findIndex(t => t === taskToRemove);

    this.todoService.deleteTask(actualIndex);
    this.loadTasks();
  }

  toggleComplete(index: number, checked: boolean): void {
    const allTasks = this.todoService.getTasks();
    const filteredTasks = this.categoryFilter === 'all'
      ? allTasks
      : allTasks.filter(task => task.category === this.categoryFilter);

    const taskToUpdate = filteredTasks[index];
    const actualIndex = allTasks.findIndex(t => t === taskToUpdate);

    this.todoService.updateTaskStatus(actualIndex, checked);
    this.loadTasks();
}
}

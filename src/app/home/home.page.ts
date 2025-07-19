import { Component } from '@angular/core';
import { Task, Category } from '../models';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  public propCategory = 'default';
  public selectedCategory = 'all';
  public propDisabled = true;

  public objectCategories: Category[] = [];
  public objectList: Task[] = [];

  constructor(private todoService: TodoService) {
    this.objectCategories = this.todoService.getCategories();
    this.objectList = this.todoService.getTasks();
  }

  save(formValues: Task): void {
    formValues.completed = false;
    this.todoService.saveTask(formValues);
    location.reload();
  }

  check(textareaValue: any): void {
    this.propDisabled = !textareaValue?.trim();
  }

  onCategoryFilterChange(value: string) {
    this.selectedCategory = value;
  }
}

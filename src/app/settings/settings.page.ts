import { Component, OnInit } from '@angular/core';
import { Category, Task } from '../models';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false
})
export class SettingsPage implements OnInit {
  public propId = 1;
  public propDisabled = true;
  public propButtonDelete = [
    { text: 'Cancel', role: 'cancel' },
    { text: 'Ok', role: 'confirm' }
  ];

  public objectCategories: Category[] = [];
  public objectLists: Task[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.objectCategories = this.todoService.getCategories();
    this.objectLists = this.todoService.getTasks();
    if (this.objectCategories.length > 0) {
      this.propId = this.objectCategories.length + 1;
    }
  }

  add(formValues: Category): void {
    this.todoService.saveCategory(formValues);
    location.reload();
  }

  check(inputValue: any): void {
    this.propDisabled = !inputValue?.trim();
  }

  setResult(event: any, categoryId: number, categoryName: string): void {
    if (event.detail.role === 'confirm') {
      this.todoService.deleteCategoryAndTasks(categoryId, categoryName);
      location.reload();
    }
  }
}

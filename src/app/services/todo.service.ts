import { Injectable } from '@angular/core';
import { Task, Category } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private readonly LISTS_KEY = 'lists';
  private readonly CATEGORIES_KEY = 'category';

  constructor() {}

  // TAREAS
  getTasks(): Task[] {
    const tasks = localStorage.getItem(this.LISTS_KEY);
    return tasks ? JSON.parse(tasks) : [];
  }

  saveTask(task: Task): void {
    const tasks = this.getTasks();
    tasks.unshift(task);
    localStorage.setItem(this.LISTS_KEY, JSON.stringify(tasks));
  }

  deleteTask(index: number): void {
    const tasks = this.getTasks();
    tasks.splice(index, 1);
    localStorage.setItem(this.LISTS_KEY, JSON.stringify(tasks));
  }

  setTasks(tasks: Task[]): void {
    localStorage.setItem(this.LISTS_KEY, JSON.stringify(tasks));
  }

  updateTaskStatus(index: number, completed: boolean): void {
  const tasks = this.getTasks();
  if (tasks[index]) {
    tasks[index].completed = completed;
    this.setTasks(tasks);
  }}

  // CATEGORÍAS
  getCategories(): Category[] {
    const categories = localStorage.getItem(this.CATEGORIES_KEY);
    return categories ? JSON.parse(categories) : [];
  }

  saveCategory(category: Category): void {
    const categories = this.getCategories();
    categories.unshift(category);
    localStorage.setItem(this.CATEGORIES_KEY, JSON.stringify(categories));
  }

  deleteCategory(index: number): void {
    const categories = this.getCategories();
    categories.splice(index, 1);
    localStorage.setItem(this.CATEGORIES_KEY, JSON.stringify(categories));
  }

  deleteCategoryAndTasks(categoryId: number, categoryName: string): void {
    this.deleteCategory(categoryId);

    const tasks = this.getTasks().filter(task => task.category !== categoryName);
    this.setTasks(tasks);
  }
}

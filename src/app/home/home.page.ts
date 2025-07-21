import { Component, OnInit } from '@angular/core';
import { Task, Category } from '../models';
import { TodoService } from '../services/todo.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  public propCategory = 'default';
  public selectedCategory = 'all';
  public propDisabled = true;
  public categoryFilterEnabled = false;


  public objectCategories: Category[] = [];
  public objectList: Task[] = [];

  constructor(
    private todoService: TodoService,
    private firebaseService: FirebaseService){
    this.objectCategories = this.todoService.getCategories();
    this.objectList = this.todoService.getTasks();
  }
  async ngOnInit() {
    await this.firebaseService.fetchRemoteConfig();
   // const testFlag =  this.firebaseService.getFeatureFlag('test');
    this.categoryFilterEnabled = this.firebaseService.getFeatureFlag('enable_category_filter');
   // console.log("viene de firebase!!: ", testFlag)
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

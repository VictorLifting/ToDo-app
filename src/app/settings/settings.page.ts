import { Component, OnInit } from '@angular/core';
import { IonicModule } from "@ionic/angular";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false
})
export class SettingsPage implements OnInit {

  public propId: any = 1;
  public propDisabled: boolean = true;
  public propButtonDelete: any = [
    {
      text: 'Cancel',
      role: 'cancel'
    },
    {
      text: 'Ok',
      role: 'confirm'
    }
  ];

  public categories: any = localStorage.getItem('category');
  public objectCategories: any = JSON.parse(this.categories);

  public lists: any = localStorage.getItem('list');
  public objectLists: any = JSON.parse(this.lists)

  constructor() {
    if(this.categories !== null){
      this.propId = this.objectCategories.length + 1;
    }
  }

  ngOnInit() {
  }

  add(formValues: any){
    if (this.categories === null){
      let formValuesToString: any = JSON.stringify([formValues]);
      localStorage.setItem('category',formValuesToString);
    } else {
      let existingCategory = JSON.parse(this.categories);
      existingCategory.splice(0, 0, formValues);
      existingCategory = JSON.stringify(existingCategory);
      localStorage.setItem('category', existingCategory)
    }
    location.reload();
  }

  check(inputValue: any){
    if (inputValue === ''){
      this.propDisabled = true
    } else{
      this.propDisabled = false;
    }
  }

  setResult(event: any, categoryId: any, categoryName: any){
    if(event.detail.role === 'confirm'){
      this.delete(categoryId, categoryName);
    }
  }

  delete(categoryId: any, categoryName: any){
    let newListOfCategories: any = this.objectCategories;
    newListOfCategories.splice(categoryId, 1);
    localStorage.setItem('category', JSON.stringify(newListOfCategories));

    let newList: any = this.objectLists;

    newList = newListOfCategories.filter(function(item:any){
      return item.category !== categoryName;
    });
    localStorage.setItem('list', JSON.stringify(newList));
    location.reload();
  }
}

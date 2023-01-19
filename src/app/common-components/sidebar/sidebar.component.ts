import { CategoryModel } from './../../shared/models/CategoryModel';
import { CategoryService } from './../../shared/services/category/category.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  openSidebar: string;
  subscription: Subscription;
  CATEGORY_DATA: CategoryModel[] = [];
  openedSidebarFunction(activeSidebarName: string) {
    this.openSidebar = activeSidebarName;
  }
  constructor(private categoryService: CategoryService) {}
  ngOnInit(): void {
    this.subscription = this.categoryService
      .getCategories()
      .subscribe((data: CategoryModel[]) => {
        this.CATEGORY_DATA = data;
        this.openSidebar = data[0].name;
      });
  }
}

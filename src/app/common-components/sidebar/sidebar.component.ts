import { CategoryService } from './../../shared/services/category/category.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  openSidebar: string = 'electronics';
  subscription: Subscription;
  CATEGORY_DATA: any = [];
  openedSidebarFunction(activeSidebarName: string) {
    this.openSidebar = activeSidebarName;
  }
  constructor(private categoryService: CategoryService) {}
  ngOnInit(): void {
    this.subscription = this.categoryService
      .getCategories()
      .subscribe((data) => {
        this.CATEGORY_DATA = data;
      });
  }
}

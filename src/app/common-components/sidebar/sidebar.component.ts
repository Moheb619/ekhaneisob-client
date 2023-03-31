import { ActivatedRoute } from '@angular/router';
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
  sidebarSubCategory: string | null;
  subscription: Subscription[] = [];
  CATEGORY_DATA: CategoryModel[] = [];
  openedSidebarFunction(activeSidebarName: string) {
    this.openSidebar = activeSidebarName;
  }
  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.subscription.push(
      this.categoryService
        .getCategories()
        .subscribe((data: CategoryModel[]) => {
          this.CATEGORY_DATA = data;
          this.openSidebar = data[0].name;
          this.route.paramMap.subscribe((obs) => {
            this.sidebarSubCategory = obs.get('sub_category');
          });
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((f) => f.unsubscribe());
  }
}

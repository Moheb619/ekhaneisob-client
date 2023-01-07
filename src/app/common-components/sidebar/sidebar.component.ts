import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  openSidebar: string = 'electronics';
  openedSidebarFunction(activeSidebarName: string) {
    this.openSidebar = activeSidebarName;
  }
}

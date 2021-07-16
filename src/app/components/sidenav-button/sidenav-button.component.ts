import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidenav-button',
  templateUrl: './sidenav-button.component.html',
  styleUrls: ['./sidenav-button.component.sass']
})
export class SidenavButtonComponent implements OnInit {

  @Input() imgSource!: string;
  @Input() title!: string;

  constructor() { }

  ngOnInit(): void {
  }

}

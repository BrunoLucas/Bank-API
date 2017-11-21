import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `
    <h3>Welcome!</h3>
    <h5>Sample CRUD app with Angular (2.x and 4.x)!</h5>
  `
})
export class HomeComponent implements OnInit{

  constructor(private router: Router,
    private route: ActivatedRoute) {}



  ngOnInit(): any {
    this.redirecionar();
  }

  private redirecionar() {
    this.router.navigate(['/transferencias']);
  }
}
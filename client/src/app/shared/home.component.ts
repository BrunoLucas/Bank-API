import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `
  `
})
export class HomeComponent implements OnInit{

  constructor(private router: Router,
    private route: ActivatedRoute) {}



  ngOnInit(): any {
    this.redirecionar();
  }

  private redirecionar() {
    this.router.navigate(['/transfers']);
  }
}

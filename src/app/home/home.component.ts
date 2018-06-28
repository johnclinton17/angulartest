import { Component, OnInit,AfterViewInit  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
moduleId: module.id, 	
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
	
	model: any = {};
    loading = false;
    returnUrl: string;

  constructor(
  		private route: ActivatedRoute,
        private router: Router,) { }

  ngOnInit() {
     
  }

  ngAfterViewInit () {
        $("#ex6").slider();
    $("#ex6").on("slide", function(slideEvt) {
      $("#ex6SliderVal").text(slideEvt.value);
    });
  }



}

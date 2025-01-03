import { Component , OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { environment } from '../environments/environment';

fetch(environment.apiUrl);


@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [RouterOutlet], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ProductManagementSystem'; 
  

  ngOnInit(): void {
    initFlowbite();
  }
}


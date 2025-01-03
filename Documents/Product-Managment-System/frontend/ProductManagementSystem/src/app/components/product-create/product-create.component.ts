import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../Models/product.model';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputNumberModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
  ],
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
  providers: [MessageService],
})
export class ProductCreateComponent {
  product: Product = {
    name: '',
    description: '',
    price: 0,
   
  };
  submitted = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private messageService: MessageService
  ) {}

  createProduct(): void {
    this.submitted = true;

    if (
      !this.product.name.trim() ||
      !this.product.description.trim() ||
      this.product.price <= 0
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'All fields are required, and price must be greater than 0.',
      });
      return;
    }

    this.productService.createProduct(this.product).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Creation Successful',
          detail: 'Product created successfully!',
        });
        setTimeout(() => this.router.navigate(['/products']), 2000);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Creation Failed',
          detail: 'An error occurred while creating the product.',
        });
      },
    });
  }
}

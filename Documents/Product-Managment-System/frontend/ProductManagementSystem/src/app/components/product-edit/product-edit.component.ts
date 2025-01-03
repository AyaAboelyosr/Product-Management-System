import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../Models/product.model';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    MessageModule,
    ToastModule,
    InputNumberModule,
  ],
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
  providers: [MessageService]
})
export class ProductEditComponent implements OnInit {
  product: Product = {
    name: '',
    description: '',
    price: 0,
  
  };
  submitted = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProduct(+id).subscribe((data) => {
        this.product = data;
      });
    }
  }

  updateProduct(): void {
    this.submitted = true;

   
    if (this.product.name === '' || this.product.description === '' || this.product.price <= 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please ensure all fields are filled out correctly.'
      });
      return;
    }

    this.productService.updateProduct(this.product.id!, this.product).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product updated successfully'
        });
        setTimeout(() => this.router.navigate(['/products']), 2000);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update product'
        });
      }
    });
  }
}

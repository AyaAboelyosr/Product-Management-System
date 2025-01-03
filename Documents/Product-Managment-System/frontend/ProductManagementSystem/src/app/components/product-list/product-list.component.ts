import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../Models/product.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';



@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, InputTextModule,FormsModule,  ToastModule,MessageModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class ProductListComponent implements OnInit {

  isModalVisible: boolean = false;

  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  minPrice: number | null = null; 
  maxPrice: number | null = null;

  constructor(
    private productService: ProductService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  toggleModal(visible: boolean): void {
    this.isModalVisible = visible;
  }

  

  loadProducts(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.filteredProducts = [...this.products];
    });
  }

 
  


  onInputFilter(event: Event, table: any): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
    table.reset(); 
  }

  clearFilters(table: any): void {
    this.searchTerm = ''; 
    this.filteredProducts = [...this.products]; 
    table.reset();
  }
  

  editProduct(productId: number): void {
    this.router.navigate(['/products/edit', productId]); 
  }

  createProduct(): void {
    this.router.navigate(['/products/create']);
  }
  
  filterProductsByPrice(): void { 
    this.filteredProducts = this.products.filter(product =>
       { 
        const matchesSearchTerm = product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
        const matchesMinPrice = this.minPrice === null || product.price >= this.minPrice;
        const matchesMaxPrice = this.maxPrice === null || product.price <= this.maxPrice; return matchesSearchTerm && matchesMinPrice && matchesMaxPrice;
       }); }

  

 

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product deleted successfully',
        });
     
        this.toggleModal(false);
        this.loadProducts(); 
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete product',
        });
      },
    });
  }
}

using FluentValidation;
using FluentValidation.AspNetCore;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using Product_Management_System.DTOs;
using Product_Management_System.Middleware;
using Product_Management_System.Models;

namespace Product_Management_System
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAngularApp", policy =>
                {
                    policy.WithOrigins("http://localhost:4200") // Replace with your Angular app's URL
                          .AllowAnyMethod()
                          .AllowAnyHeader();
                });
            });


            builder.Services.AddDbContext<ProductDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
            builder.Services.AddValidatorsFromAssemblyContaining<AddProductDtoValidation>();

            var app = builder.Build();
            app.UseCors("AllowAngularApp");

            app.UseErrorHandlingMiddleware();
            var products = app.MapGroup("/products");

          
            products.MapGet("/", async (ProductDbContext db) => await db.Products.ToListAsync());

         
            products.MapGet("/{id}", async (int id, ProductDbContext db) =>
            {
                var product = await db.Products.FindAsync(id);
                return product is not null ? Results.Ok(product) : Results.NotFound();
            });

         
            products.MapPost("/", async (AddProductDTO addProductDTO, ProductDbContext db, IValidator<AddProductDTO> validator) =>
            {
                var validationResult = await validator.ValidateAsync(addProductDTO);
                if (!validationResult.IsValid)
                    return Results.ValidationProblem(validationResult.ToDictionary());

                var product = new Product
                {
                    Name = addProductDTO.Name,
                    Description = addProductDTO.Description,
                    Price = addProductDTO.Price,
                    CreatedDate = DateTime.UtcNow
                };
                db.Products.Add(product);
                await db.SaveChangesAsync();
                return Results.Created($"/products/{product.Id}", product);
            });

           
            products.MapPut("/{id}", async (int id, AddProductDTO updateProductDTO, ProductDbContext db, IValidator<AddProductDTO> validator) =>
            {
                var validationResult = await validator.ValidateAsync(updateProductDTO);
                if (!validationResult.IsValid)
                    return Results.ValidationProblem(validationResult.ToDictionary());

                var product = await db.Products.FindAsync(id);
                if (product is null) return Results.NotFound();

                product.Name = updateProductDTO.Name;
                product.Description = updateProductDTO.Description;
                product.Price = updateProductDTO.Price;
                await db.SaveChangesAsync();
                return Results.NoContent();
            });

            products.MapDelete("/{id}", async (int id, ProductDbContext db) =>
            {
                var product = await db.Products.FindAsync(id);
                if (product is null) return Results.NotFound();

                db.Products.Remove(product);
                await db.SaveChangesAsync();
                return Results.NoContent();
            });

            // Run the application
            app.Run();
        }
    }

    
    }


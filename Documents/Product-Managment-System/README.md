
# Simple Product Management System

## Project Overview  
This project is a **Simple Product Management System** built using .NET 8 Minimal API for the backend and Angular 19 for the frontend. The system enables users to perform CRUD (Create, Read, Update, Delete) operations for managing product data with features like validation, search, sorting, and notifications.  

### **Tech Stack**  
- **Backend:** .NET 8 Minimal API, Entity Framework Core, SQL Server  
- **Frontend:** Angular 19, PrimeNG, TailwindCSS  

---

## Features  

### **1. Products List Page:**  
- Displays a list of products using the **PrimeNG Datatable**.  
- Features include:  
  - Columns: `ID`, `Name`, `Description`, `Price`, `Created Date`  
  - Search functionality by product name  
  - Sorting capability for all columns  

### **2. Create Product Page:**  
- Form to add new products with the following fields:  
  - **Name**: Required, max 100 characters  
  - **Description**: Required, max 500 characters  
  - **Price**: Required, must be a positive number  
- Includes validation error messages and success notifications.  

### **3. Edit Product Page:**  
- Pre-filled form for editing product details.  
- Validation rules are the same as the create form.  
- Displays success/error notifications.  

### **4. Delete Product:**  
- Shows a confirmation dialog before deletion.  
- Displays success/error notifications after the operation.  

---

## Prerequisites  
Before running the project, make sure the following tools are installed:  
- **Node.js** (Version 16 or higher) - [Download](https://nodejs.org/)  
- **Angular CLI** - Install using:  
  ```bash
  npm install -g @angular/cli

  ```
- **.NET 8 SDK** - [Download](https://dotnet.microsoft.com/)  
- **SQL Server** (Express or Developer Edition) - [Download](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)  

---

## Setup Instructions  

Thank you for the clarification! Based on the process you've described, here's the updated **Setup Instructions** section for your README.md file. It includes the steps for both the backend and frontend setup, incorporating your work with the packages and migrations:

---

## Setup Instructions  

### **1. Backend Setup:**  
1. **Install Required Packages:**  
   Ensure the following packages are installed in the backend project:  
   - **SQL Server tools** for database interaction.  
   - **FluentValidation** for validating models.  

   Install them using the following commands (if needed):  
   ```bash
   dotnet add package Microsoft.EntityFrameworkCore.SqlServer
   dotnet add package Microsoft.EntityFrameworkCore.Tools
   dotnet add package FluentValidation.AspNetCore
   ```
2. **Create the Model:**  
   Define your data models in the backend project.  

3. **Apply Migrations and Update the Database:**  
   Run the following commands to create and apply migrations:  
   ```bash
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```
4. **Run the Backend Project:**  
   Start the server using:  
   ```bash
   dotnet run
   ```
 

---

### **2. Frontend Setup:**  
1. **Install Required Tools:**  
   Make sure Node.js and Angular CLI are installed.  
   Install Angular CLI if not already installed:  
   ```bash
   npm install -g @angular/cli
   ```
2. **Install Required Packages:**  
   Navigate to the frontend project directory and install the necessary dependencies:  
   ```bash
   npm install primeng primeicons tailwindcss
   ```
3. **Run the Frontend Project:**  
   Start the Angular project using:  
   ```bash
   ng serve --o
   ```
   This will open the application in your default browser at `http://localhost:4200`.  

---



---

## Database Configuration  
1. Update the `appsettings.json` file in the backend project to set the connection string:  
   ```json
   "ConnectionStrings": {
       "DefaultConnection": "Server=YOUR_SERVER_NAME;Database=ProductDB;Trusted_Connection=True;"
   }
   ```  
2. Replace `YOUR_SERVER_NAME` with the name of your SQL Server instance.  

---

## Troubleshooting  

### **Node.js Issues:**  
- If `npm install` fails, ensure the correct Node.js version is installed.  

### **SQL Server Issues:**  
- If the database connection fails, ensure SQL Server is running and the connection string is correct.  

### **.NET Issues:**  
- Ensure you’re using .NET 8 SDK.  

---




  

### **Frontend/Backend URLs**  
- **Frontend:** `http://localhost:4200`  
- **Backend:** `http://localhost:7275`  

---



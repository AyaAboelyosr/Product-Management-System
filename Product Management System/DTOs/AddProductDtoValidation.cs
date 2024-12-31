
using FluentValidation;

namespace Product_Management_System.DTOs

{
    public class AddProductDtoValidation :AbstractValidator<AddProductDTO>
    {
        public AddProductDtoValidation() {

            RuleFor(x => x.Name)
    .NotEmpty().WithMessage("Name is required.")
    .MaximumLength(100).WithMessage("Name must be less than or equal to 100 characters.");

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Description is required.")
                .MaximumLength(500).WithMessage("Description must be less than or equal to 500 characters.");

            RuleFor(x => x.Price)
                .NotEmpty().WithMessage("Price is required.")
                .GreaterThan(0).WithMessage("Price must be a positive number.");


        }

    }
}

package services

import (
	"kitty-entreprises/backend/models"
	"kitty-entreprises/backend/repositories"
)

type ProductService struct {
	repo *repositories.ProductRepository
}

func NewProductService() *ProductService {
	return &ProductService{
		repo: repositories.NewProductRepository(),
	}
}

func (s *ProductService) CreateProduct(p *models.Product) error {
	return s.repo.Create(p)
}

func (s *ProductService) GetAllProducts() ([]models.Product, error) {
	return s.repo.FindAll()
}
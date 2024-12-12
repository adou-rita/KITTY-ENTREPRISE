import React, { useState } from 'react';
import { ProductService } from '../services/productService';

function ProductForm() {
  // États pour gérer le formulaire
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    stock: ''
  });

  // Gestion des changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Convertir price et stock en nombres
      const productToSubmit = {
        ...productData,
        price: parseFloat(productData.price),
        stock: parseInt(productData.stock)
      };

      // Appel du service pour créer le produit
      const newProduct = await ProductService.createProduct(productToSubmit);
      
      // Réinitialiser le formulaire
      setProductData({
        name: '',
        description: '',
        price: '',
        stock: ''
      });

      // Optionnel : Afficher un message de succès ou mettre à jour la liste des produits
      alert('Produit ajouté avec succès !');
    } catch (error) {
      // Gestion des erreurs
      console.error('Erreur lors de la création du produit:', error);
      alert('Erreur lors de la création du produit');
    }
  };

  return (
    <div className="product-form">
      <h2>Ajouter un Nouveau Produit</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nom du Produit</label>
          <input
            type="text"
            id="name"
            name="name"
            value={productData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={productData.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="price">Prix</label>
          <input
            type="number"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
          />
        </div>

        <div>
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={productData.stock}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        <button type="submit">Ajouter Produit</button>
      </form>
    </div>
  );
}

export default ProductForm;
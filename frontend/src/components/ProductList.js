import React, { useState, useEffect } from 'react';
import { ProductService } from '../services/productService';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ProductService.getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Erreur de chargement", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdProduct = await ProductService.createProduct(newProduct);
      setProducts([...products, createdProduct]);
      setNewProduct({ name: '', description: '', price: 0, stock: 0 });
    } catch (error) {
      console.error("Erreur de création", error);
    }
  };

  return (
    <div>
      <h2>Liste des Produits</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - {product.price}€ (Stock: {product.stock})
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Nom" 
          value={newProduct.name}
          onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
        />
        <input 
          type="number" 
          placeholder="Prix" 
          value={newProduct.price}
          onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
        />
        <input 
          type="number" 
          placeholder="Stock" 
          value={newProduct.stock}
          onChange={(e) => setNewProduct({...newProduct, stock: parseInt(e.target.value)})}
        />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default ProductList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Récupérer les données
    axios.get('/api/products')
      .then(response => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Erreur :', error);
      });
  }, []);

  const handleAddProduct = () => {
    // Envoyer des données
    axios.post('/api/products', {
      name: 'Nouveau produit',
      price: 19.99
    })
    .then(response => {
      console.log('Produit ajouté', response.data);
      // Mettre à jour la liste des produits
    })
    .catch(error => {
      console.error('Erreur :', error);
    });
  };

  return (
    // Votre logique d'affichage
  );
}
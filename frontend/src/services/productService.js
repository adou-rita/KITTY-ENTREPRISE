import axios from 'axios';

const API_URL = 'http://localhost:8080/api/products';

export const ProductService = {
  getAllProducts: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Erreur lors du chargement des produits", error);
      throw error;
    }
  },

  createProduct: async (product) => {
    try {
      const response = await axios.post(API_URL, product);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la création du produit", error);
      throw error;
    }
  }
};


export const ProductService = {
  getAllProducts: () => {
    return axios.get('/api/products')
      .then(response => response.data)
      .catch(error => {
        console.error('Erreur de chargement des produits', error);
        throw error;
      });
  },


  import axios from 'axios';
  createProduct: (productData) => {
    return axios.post('/api/products', productData)
      .then(response => response.data)
      .catch(error => {
        console.error('Erreur de création de produit', error);
        throw error;
      });
  }
};
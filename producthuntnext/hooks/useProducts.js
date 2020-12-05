import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../firebase';

const useProducts = orden => {

  const [products, setProducts] = useState([]);

  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const getProductsFromDB = () => {
      firebase.db.collection('products').orderBy(orden, 'desc').onSnapshot(handleSnapshot)
    }
    getProductsFromDB();
  }, []);

  function handleSnapshot(snapshot) {
    const products = snapshot.docs.map(doc => {
      return {
      id: doc.id,
      ...doc.data()
      }
    });
    setProducts(products);
  }

  return {
    products
  }
}

export default useProducts;
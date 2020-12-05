import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { useRouter } from 'next/router';
import Products from '../components/layout/Products';
import useProducts from '../hooks/useProducts';

const Search = () => {

  const router = useRouter();
  const {query: {q}} = router;

  //Todos los productos
  const {products} = useProducts('creado');
  const [result, setResult] = useState([]);

  useEffect(() => {
    const search = q.toLocaleLowerCase();
    const filterProduct = products.filter(product => (
      product.nombre.toLowerCase().includes(search) || product.descripcion.toLowerCase().includes(search)
    ));
    setResult(filterProduct);
  }, [q, products])

  return (
    <div >
      <Layout>
      <div className="listado-productos">
        <div className="contenedor">
          <ul className="bg-white">
            {result.map(product => <Products key={product.id} product={product} />)}
          </ul>
        </div>
        </div>
      </Layout>
    </div>
  ) 
}

export default Search;
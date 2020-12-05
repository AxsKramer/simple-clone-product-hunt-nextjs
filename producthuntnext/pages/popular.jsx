import React from 'react'
import Layout from '../components/layout/Layout';
import Products from '../components/layout/Products';
import useProducts from '../hooks/useProducts';


const Popular = () => {
  const { products } = useProducts('votos');
  return (
    <Layout >
     <div className="listado-productos">
      <div className="contenedor">
        <ul className="bg-white">
          {products.map(product => (
            <Products key={product.id} product={product} />
          ))}
        </ul>
      </div>
    </div>
    </Layout>
  ) 
}

export default Popular;
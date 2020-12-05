import React, {useState, useEffect, useContext} from 'react';
import Layout from '../components/layout/Layout';
import {FirebaseContext} from '../firebase/';
import Products from '../components/layout/Products';


const Home = () =>{

  const [products, setProducts] = useState([]);

  const {firebase} = useContext(FirebaseContext);

  // useEffect(() => {
  //   const getProductFromDB = async () => {
  //     await firebase.db.collection('products').orderBy('creado', 'desc').onSnapshot(snapshot => {
  //       const productos = snapshot.docs.map(doc => {
  //         return {
  //           ...doc.data(), 
  //           id: doc.id 
  //         }
  //         })
  //         setProducts(productos);
  //       }
  //     )
  //   }

  //   getProductFromDB();
  // },[products])

  useEffect(() => {
    const getProductFromDB = async () => {
      await firebase.db.collection('products').orderBy('creado', 'desc').onSnapshot(handleSnapshot)
    }
    getProductFromDB();
  }, []);

  function handleSnapshot(snapshot) {
      const productos = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      });
      console.log(productos)
      setProducts(productos);
  }

  return (
    <div >
      <Layout>
        <div className='listado-productos'>
          <div className='contenedor'>
            <ul className='bg-white'>
              {
                products && products.map(product => (
                  <Products
                    key={product.id}
                    product={product}
                  />
                ))
              }
            </ul>
          </div>
        </div>

      </Layout>
    

    {/* Manera de implementar css con jsx en Nextjs */}
      {/* <style jsx>{`
        h1{
          color: red;
        }
      `}</style> */}

    </div>

  )
}

export default Home;

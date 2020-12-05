import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';
import { FirebaseContext } from '../../firebase';
import Layout from '../../components/layout/Layout';
import Error404 from '../../components/layout/E404';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Field, InputSubmit } from '../../components/ui/Form';
import Boton from '../../components/ui/Boton';


const ContenedorProducto = styled.div`
@media (min-width:768px) {
     display: grid;
     grid-template-columns: 2fr 1fr;
     column-gap: 2rem;
}
`;
const CreadorProducto = styled.p`
 padding: .5rem 2rem;
 background-color: #DA552F;
 color: #fff;
 text-transform: uppercase;
 font-weight: bold;
 display: inline-block;
 text-align: center;
`

const Product = () => {

  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);
  const [comentario, setComentario] = useState({});
  const [dbConsult, setdbConsult] = useState(true);
  
  //Routing para obtener el id actual
  const router = useRouter();
  const {query: {id}} = router;

  const {firebase, user} = useContext(FirebaseContext);

  useEffect(() => {
    if(id && dbConsult){
      const getProduct = async () => {
        const producto = await firebase.db.collection('products').doc(id).get();
        if(producto.exists){
          setProduct(producto.data());
          setdbConsult(false);
        }else{
          setError(true);
          setdbConsult(false);
        }
      }
      getProduct();
    }
  }, [id]);

  if(Object.keys(product).length === 0 && !error) return 'Cargando...';

  const { comentarios, creado, descripcion, empresa, nombre, url, urlImage, votos, creador, haVotado } = product;

  const votarProducto = () => {
    if(!user) return router.push('/');

    const votosT = votos + 1;

    //Verificar si el usuario actual a votado
    if(haVotado.includes(user.uid)) return;

    //Guardar el id del usuario que ha votado
    const nuevoVoto = [...haVotado, user.uid];

    //Actualizar en la db
    firebase.db.collection('products').doc(id).update({
      votos: votosT,
      haVotado: nuevoVoto
    });

    setProduct({...product, votos: votosT});

    // hay un voto, por lo tanto consultar a la BD
    setdbConsult(true);
  }

  // Funciones para crear comentarios
  const comentarioChange = e => setComentario({...comentario, [e.target.name] : e.target.value})
    
  // Identifica si el comentario es del creador del producto
  const esCreador = id => {
    if(creador.id == id) return true;
  }

  const agregarComentario = e => {
    e.preventDefault();

    if(!user) return router.push('/login')

    // información extra al comentario
    comentario.usuarioId = user.uid;
    comentario.usuarioNombre = user.displayName;

    // Tomar copia de comentarios y agregarlos al arreglo
    const nuevosComentarios = [...comentarios, comentario];

    // Actualizar la BD
    firebase.db.collection('products').doc(id).update({
        comentarios: nuevosComentarios
    })

    // Actualizar el state
    setProduct({...product, comentarios: nuevosComentarios})

    // hay un COMENTARIO, por lo tanto consultar a la BD
    setdbConsult(true); 
  }

  // función que revisa que el creador del producto sea el mismo que esta autenticado
  const puedeBorrar = () => {
    if(!user) return false;

    if(creador.id === user.uid) return true
  }

  // elimina un producto de la bd
  const eliminarProducto = async () => {

    if(!user) return router.push('/login')

    if(creador.id !== user.uid) return router.push('/')
    
    try {
      await firebase.db.collection('products').doc(id).delete();
      router.push('/')
    } catch (error) {
      console.log(error);
    }
  }

  return ( 
    // <div>Hello</div>
    <Layout>
      <>
        { error ? <Error404 /> : (
          <div className="contenedor">
            <h1 css={css`
              text-align: center;
              margin-top: 5rem;
            `}>{nombre} </h1>

            <ContenedorProducto>
              <div>
                <p>Publicado hace: { formatDistanceToNow( new Date(creado), {locale: es} )} </p>
                <p>Por: {creador.nombre} de {empresa} </p>
                <img src={urlImage} />
                <p>{descripcion}</p>

                { user && (
                  <>
                    <h2>Agrega tu comentario</h2>
                    <form onSubmit={agregarComentario}>
                      <Field>
                        <input
                          type="text"
                          name="mensaje"
                          onChange={comentarioChange}
                        />
                      </Field>
                      <InputSubmit
                        type="submit"
                        value="Agregar Comentario"
                      />
                    </form>
                  </>
                ) }

                <h2 css={css`
                    margin: 2rem 0;
                `}>Comentarios</h2>

                {
                  comentarios.length === 0 ? "Aún no hay comentarios" : (
                    <ul>
                      {
                        comentarios.map((comentario, i) => (
                          <li key={`${comentario.usuarioId}-${i}`}
                            css={css`
                              border: 1px solid #e1e1e1;
                              padding: 2rem;
                            `}
                          >
                            <p>{comentario.mensaje}</p>
                            <p>Escrito por: 
                                <span
                                  css={css`
                                      font-weight:bold;
                                  `}
                                >
                                {' '} {comentario.usuarioNombre}
                                </span>
                            </p>
                            { esCreador( comentario.usuarioId ) && <CreadorProducto>Es Creador</CreadorProducto> }
                          </li>
                        ))
                      }
                    </ul>
                  )
                }
              </div>

              <aside>
                <Boton target="_blank" bgColor="true" href={url}>Visitar URL</Boton>
                <div css={css`margin-top: 5rem;`}>
                  <p css={css`text-align: center;`}>{votos} Votos</p>
                  { user && <Boton onClick={votarProducto}> Votar </Boton> }
                </div>
              </aside>
            </ContenedorProducto>
            { puedeBorrar() && <Boton onClick={eliminarProducto}>Eliminar Producto</Boton> }
          </div>
      ) }  
    </>
  </Layout>
  );
}
 
export default Product;
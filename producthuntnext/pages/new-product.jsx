import React, {useContext, useState} from 'react';
import {css} from '@emotion/react';
import Router, {useRouter} from 'next/router';
// import FileUploader  from 'react-firebase-file-uploader';
import Layout from '../components/layout/Layout';
import { Form, Field, InputSubmit, Error } from '../components/ui/Form';
import {FirebaseContext} from '../firebase';
import useValidationForm from '../hooks/useValidation';
import validateCreateProduct from '../validations/validateCreateProduct';
import Error404 from '../components/layout/E404';

const NewProduct = () => {
  const initialState = {
    nombre: '',
    empresa: '',
    url: '',
    descripcion: ''
  }

  const [error, setError] = useState('');
  const [image, setImage] = useState(null);
  
  const {firebase, user} = useContext(FirebaseContext);

  const {values, errors, handleChange, handleSubmit} = useValidationForm(initialState, validateCreateProduct, createProduct );
  
  const router = useRouter();

  const { nombre, empresa, url, descripcion } = values;

  const handleFile = e => e.target.files[0] && setImage(e.target.files[0]);

  const handleDownloadURL = async () => {
    const uploadTask = await firebase.storage.ref(`products/${image.lastModified}${image.name}`).put(image);
    const downloadURL = await uploadTask.ref.getDownloadURL();
    return downloadURL;
  }

  async function createProduct() {
    if(!user){
      return router.push('/login');
    }

    const producto = {
      nombre,
      empresa,
      url,
      urlImage: await handleDownloadURL(),
      descripcion,
      votos: 0,
      comentarios: [],
      creado: Date.now(),
      creador: {
        id: user.uid,
        nombre: user.displayName
      },
      haVotado: []
    }
    firebase.db.collection('products').add(producto)
      .then(docRef => console.log('Guardado con el id:', docRef.id))
      .catch(error => console.log('Error al añadirlo: ', error))
    return router.push('/');
    // Router.push('/');

  }

  return  (
    <div >
      <Layout>
        {
          !user ? <Error404 /> : (
            <>
        <h1 css={css`
          text-align: center;
          margin-top: 5rem;
          `}>Nuevo Producto</h1>
        <Form onSubmit={handleSubmit}>
          <Field>
            <label htmlFor="nombre">Nombre</label>
            <input onChange={handleChange} value={nombre} type="text" id='nombre' placeholder='Nombre del producto' name='nombre'/>
          </Field>
          {errors.nombre && <Error>{errors.nombre}</Error>}
          <Field>
            <label htmlFor="empresa">Empresa</label>
            <input onChange={handleChange} value={empresa} type="text" id='empresa' placeholder='Nombre Empresa o Compañia' name='empresa'/>
          </Field>
          {errors.empresa && <Error>{errors.empresa}</Error>}
          <Field>
            <label htmlFor="imagen">Imagen</label>
            <input 
              type='file'
              accept='image/*'
              id='imagen' 
              name='imagen'
              onInput={e => handleFile(e)}
            />
          </Field>

          <Field>
            <label htmlFor="url">URL</label>
            <input onChange={handleChange} value={url} type="url" id='url' placeholder='URL de tu sitio' name='url'/>
          </Field>
          {errors.url && <Error>{errors.url}</Error>}
          <Field>
            <label htmlFor="descripcion">Descripción</label>
            <textarea onChange={handleChange} value={descripcion}  id='descripcion'  name='descripcion'/>
          </Field>

          {error && <Error>{error}</Error>}
          <InputSubmit type="submit" value='Crear Producto'/>
        </Form>
        </>
        )}
      </Layout>
    </div>
  )
}

export default NewProduct;


export default function validateCreateProduct(values){
  let errors = {};

  //Validate name user
  if(!values.nombre){
    errors.nombre = 'Name field is required'
  }
  //Validate empresa user
  if(!values.empresa){
    errors.empresa = 'Company field is required'
  }
  // //Validate image user
  // if(!values.imagen){
  //   errors.imagen = 'Image field is required'
  // }
  //Validate url user
  if(!values.url){
    errors.url = 'URL field is required'
  }else if( !/^(ftp|http|https):\/\/[^ "]+$/.test(values.url) ) {
    errors.url = "URL is not valid"
}
  //Validate descripcion product
  if(!values.descripcion){
    errors.descripcion = 'Description field is required'
  }

  return errors;
}
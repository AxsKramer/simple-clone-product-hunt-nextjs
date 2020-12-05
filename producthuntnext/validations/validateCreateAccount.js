
export default function validateCreateAccount(values){
  let errors = {};

  //Validate name user
  if(!values.name){
    errors.name = 'Name field is required'
  }
  //Validate email user
  if(!values.email){
    errors.email = 'Email field is required'
  }else if( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
    errors.email = 'Email is not valid'
  }
  //Validate password user
  if(!values.password) {
    errors.password = "Password field is required";
  } else if( values.password.length < 6 ) {
    errors.password = 'The password must be at least 6 characters long'
  }

  return errors;
}
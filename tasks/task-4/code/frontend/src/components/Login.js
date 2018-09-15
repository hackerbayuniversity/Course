import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from "react-router-dom";

let Login = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
    	<div>
          <h2>Login!</h2>
	        <label htmlFor="email">Email</label>
	        <Field name="email" component="input" type="email" />
      	</div>
     	<div>
	        <label htmlFor="password">Password</label>
	        <Field name="password" component="input" type="text" />
      	</div>
      	<button type="submit">Submit</button>
        <p>Already have and account? <br/> Click <Link to="/">here</Link></p>
    </form>
  )
}

Login = reduxForm({
  // a unique name for the form
  form: 'login'
})(Login)

export default Login
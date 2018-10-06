import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { logout } from '../actions';

let WebsiteForm = props => {
	const { handleSubmit } = props

	function logout () {
		sessionStorage.clear();
		props.logout();
	}

	return (
		<form onSubmit={handleSubmit}>
			<h2>Add a website to monitor</h2>
			<button type="button" onClick={logout}>Logout</button>
			<div>
		        <label htmlFor="name">Name</label>
		        <br/>
		        <Field name="name" component="input" type="text" />
		    </div>
		    <div>
		        <label htmlFor="url">URL</label>
		        <br/>
		        <Field name="url" component="input" type="text" />
		    </div>
		    <button type="submit">Add</button>
		</form>
		)
}

const mapDispatchToProps = {
	logout
}

WebsiteForm = connect(
    null,
    mapDispatchToProps
)(WebsiteForm);

export default reduxForm({
    form: 'websiteForm'
})(WebsiteForm);
import React from 'react';

const Website = ({ name, url, status }) => (
	<div>
		<h3>{name}</h3>
		<p>{url}</p>
		<p>{status}</p>
	</div>
	)

export default Website;
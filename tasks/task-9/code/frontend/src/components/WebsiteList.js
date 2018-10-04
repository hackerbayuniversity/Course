import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { getWebsites } from '../actions';
import Website from './Website';

class WebsiteList extends Component {

	componentDidMount(){
		let token = sessionStorage.getItem('token');

		axios.get('/websites/list', { headers: { 'Authorization': token } })
		.then(websites => {
			this.props.getWebsites(websites)
		})
		.catch(err => alert(err.response.data.msg));
	}

	render() {
		return (
			<div className="websites">
				<h1>Websites</h1>
				{
					this.props.user.websites.reverse().map(website => 
						<Website
						key={website.id}
						name={website.name}
						url={website.url}
						status={website.status}
						/>
						)
				}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.user
	}
}

const mapDispatchToProps = {
	getWebsites
}

export default connect(mapStateToProps, mapDispatchToProps)(WebsiteList);
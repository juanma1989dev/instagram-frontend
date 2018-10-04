
import React, { Component } from 'react';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';
import {Link} from 'react-router-dom';

const MUTATION_LOGIN = gql`
	mutation login($email:String!, $password:String!) {
		login(
			email: $email ,
			password: $password,
		){
			token,
			user{
				name
			}
		}
	}
`

class Login extends Component {
	
	constructor(props){
		super(props);
		this.state= {
		email: "",
		password: ""
		}
	}

	onInputChange = (event) => {
		console.log("me ejecute")
		let {id, value} = event.target;
		this.setState({
			[id] : value
		})

	}

	onSubmit = (event, login) => {
		event.preventDefault();
		login({
			variables: {
				email : this.state.email,
				password: this.state.password
			}
		}).then(response => {
			localStorage.setItem("token", response.data.login.token)
			this.props.history.push('/')
		}).catch(err => {
			console.log("Error : ", err)
		})
	}

	render() {
		return (
		<Mutation mutation={MUTATION_LOGIN}>{
		(login, {data}) => (
			<div className="container">  

				<div className="row d-flex justify-content-center">
					<div className="col-6">
					
					<h1 className="text-center titleForm smallMarginTop bigMarginBottom">Instagram - Fake</h1>	

					<h3 className="titleForm text-center">Login</h3>

					<form onSubmit={(e) => this.onSubmit(e, login)}>
						<div className="form-group">
							<label>Email address</label>
							<input type="email" className="form-control"  placeholder="Enter email" 
								id="email" onChange={this.onInputChange}
								value={this.state.email}
							/>
						</div>

						<div className="form-group">
							<label>Password</label>
							<input type="password" className="form-control"  placeholder="Enter password" 
								id="password" onChange={this.onInputChange}
								value={this.state.password}
							/>
						</div>

						<div className="">
							<button type="submit" id="btnFormLogin" className="btn btn-primary btn-lg btn-block">Login</button>
						</div>

						<div className="text-center bigMarginTop">
							<Link to="/signup">Create account</Link>
						</div>

					</form>
					</div>
				</div>
			</div>
			
		)}
		</Mutation>
		);
	}
}

export default Login;

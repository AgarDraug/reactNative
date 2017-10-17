import React from 'react';
import firebase from 'firebase';
import { Text } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends React.Component {
	state = {
		email: '',
		password: '',
		error: '',
		loading: false,
	};

	onButtonPress = () => {
		const { email, password } = this.state;

		this.setState({ error: '', loading: true });

		firebase.auth().signInWithEmailAndPassword(email, password)
		.then(this.onLoginSuccess)
		.catch(() => {
			firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(this.onLoginSuccess)
			.catch(this.onLoginFail);
		});
	}

	onLoginFail = () => {
		this.setState({ error: 'Authentication Failed.', loading: false });
	}

	onLoginSuccess = () => {
		this.setState({
			email: '',
			password: '',
			loading: false,
			error: '',
		});
	}

	renderButton() {
		if (this.state.loading) {
			return <Spinner size="small" />;
		}

		return (
			<Button onPress={this.onButtonPress}>
				Log in
			</Button>
		);
	}

	render() {
		return (
			<Card>
				<CardSection>
					<Input 
						placeholder="user@email.com"
						value={this.state.email} 
						onChangeText={email => this.setState({ email })}
						label="Email"
					/>
				</CardSection>
				<CardSection>
					<Input 
						secureTextEntry
						placeholder="password"
						value={this.state.password}
						onChangeText={password => this.setState({ password })}
						label="Password"
					/>
				</CardSection>

				<Text style={styles.errorTextStyle} >
					{this.state.error}
				</Text>

				<CardSection>
					{this.renderButton()}
				</CardSection>
			</Card>
		);
	}
}

const styles = {
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red',
	}
};

export default LoginForm;

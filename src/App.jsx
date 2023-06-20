import React from 'react';

import './App.scss';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';

//TODO
/*
- Begin a React project locally with `create-react-app`
- Use codesandbox.io to work live on a React application
- Create and render `Class` and `Functional` React components to the DOM
- Add event listeners to React components
- Update React component state
- Style React applications/components using SASS
*/

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null,
			requestParams: {},
		};
	}

	callApi = requestParams => {
		// mock output
		const data = {
			count: 2,
			results: [
				{ name: 'fake thing 1', url: 'http://fakethings.com/1' },
				{ name: 'fake thing 2', url: 'http://fakethings.com/2' },
			],
		};
		this.setState({ data, requestParams });
	};

	render() {
		return (
			<React.Fragment>
				<Header />
				<div>Request Method: {this.state.requestParams.method}</div>
				<div>URL: {this.state.requestParams.url}</div>
				<Form handleApiCall={this.callApi} />
				<Results data={this.state.data} />
				<Footer />
			</React.Fragment>
		);
	}
}

export default App;

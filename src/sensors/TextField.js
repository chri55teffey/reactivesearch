import React, { Component } from "react";
import { Input, Item } from "native-base";
import { connect } from "react-redux";

import { addComponent, removeComponent, watchComponent, updateQuery } from "../actions";
import { isEqual, debounce } from "../utils/helper";

class TextField extends Component {
	constructor(props) {
		super(props);

		this.type = "match";
		this.state = {
			currentValue: ""
		};
	}

	componentDidMount() {
		this.props.addComponent(this.props.componentId);
		this.setReact(this.props);
		this.updateQuery = debounce((value) => {
			this.props.updateQuery(this.props.componentId, this.defaultQuery(value));
		}, 300);
	}

	componentWillReceiveProps(nextProps) {
		if (!isEqual(nextProps.react, this.props.react)) {
			this.setReact(nextProps);
		}
	}

	componentWillUnmount() {
		this.props.removeComponent(this.props.componentId);
	}

	setReact(props) {
		if (props.react) {
			props.watchComponent(props.componentId, props.react);
		}
	}

	defaultQuery(value) {
		if (value && value.trim() !== "") {
			return {
				[this.type]: {
					[this.props.appbaseField]: value
				}
			};
		}
		return null;
	}

	setValue = (value) => {
		this.setState({
			currentValue: value
		});
		this.updateQuery(value);
	};

	render() {
		return (
			<Item regular style={{marginLeft: 0}}>
				<Input
					placeholder={this.props.placeholder}
					onChangeText={this.setValue}
					value={this.state.currentValue}
				/>
			</Item>
		);
	}
}

TextField.defaultProps = {
	placeholder: "Search"
}

const mapDispatchtoProps = dispatch => ({
	addComponent: component => dispatch(addComponent(component)),
	removeComponent: component => dispatch(removeComponent(component)),
	watchComponent: (component, react) => dispatch(watchComponent(component, react)),
	updateQuery: (component, query) => dispatch(updateQuery(component, query))
});

export default connect(null, mapDispatchtoProps)(TextField);

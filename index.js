import React, {Component} from 'react'
import {Keyboard, View, Dimensions, StyleSheet, Animated} from 'react-native'
import PropTypes from 'prop-types'

class KeyboardViewSpacer extends Component {
	constructor(props) {
		super(props)
		this.keyboardHeight = new Animated.Value(0)
	}

	componentDidMount() {
		this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
		this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
		this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
	}

	componentWillUnmount() {
		this.keyboardWillShowSub.remove()
		this.keyboardWillHideSub.remove()
	}

	keyboardWillShow = event => {
		Animated.parallel([
			Animated.timing(this.keyboardHeight, {
				duration: event.duration,
				toValue: event.endCoordinates.height
			})
		]).start()
	}

	keyboardWillHide = event => {
		Animated.parallel([
			Animated.timing(this.keyboardHeight, {
				duration: event.duration,
				toValue: 0
			})
		]).start()
	}

	render() {
		return (
			<Animated.View style={{paddingBottom: this.keyboardHeight, flex: 1}}>
				{this.props.children}
			</Animated.View>
		)
	}
}

KeyboardViewSpacer.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node), //as you can render an array of elements
		PropTypes.element //for a single component/element
	]).isRequired
}

export default KeyboardViewSpacer

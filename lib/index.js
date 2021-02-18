import * as React from 'react';
import { Keyboard, Animated, } from 'react-native';
const KeyboardViewSpacer = ({ children, useNativeDriver = false, }) => {
    const keyboardHeight = new Animated.Value(0);
    const keyboardWillShowSub = React.useRef(null);
    const keyboardWillHideSub = React.useRef(null);
    const keyboardWillShow = (event) => {
        Animated.parallel([
            Animated.timing(keyboardHeight, {
                duration: event.duration,
                toValue: event.endCoordinates.height,
                useNativeDriver: useNativeDriver,
            }),
        ]).start();
    };
    const keyboardWillHide = (event) => {
        Animated.parallel([
            Animated.timing(keyboardHeight, {
                duration: event.duration,
                toValue: 0,
                useNativeDriver: useNativeDriver,
            }),
        ]).start();
    };
    React.useEffect(() => {
        // trigger this after component have mounted
        keyboardWillShowSub.current = Keyboard.addListener('keyboardWillShow', keyboardWillShow);
        keyboardWillHideSub.current = Keyboard.addListener('keyboardWillHide', keyboardWillHide);
        // Clearing the events ont
        return () => {
            keyboardWillShowSub.current = null;
            keyboardWillHideSub.current = null;
        };
    }, []);
    return (React.createElement(Animated.View, { style: { paddingBottom: keyboardHeight, flex: 1 } }, children));
};
export default KeyboardViewSpacer;

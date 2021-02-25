import * as React from 'react';
import {
  Keyboard,
  Animated,
  KeyboardEvent,
  EmitterSubscription,
} from 'react-native';

export interface KeyboardViewSpacerProps {
  children: Array<React.ReactNode> | React.ReactNode;
  useNativeDriver?: boolean;
}

const KeyboardViewSpacer = ({
  children,
  useNativeDriver = false,
}: KeyboardViewSpacerProps) => {
  const keyboardHeight = new Animated.Value(0);
  const keyboardWillShowSub = React.useRef<null | EmitterSubscription>(null);
  const keyboardWillHideSub = React.useRef<null | EmitterSubscription>(null);

  const keyboardWillShow = (event: KeyboardEvent) => {
    Animated.parallel([
      Animated.timing(keyboardHeight, {
        duration: event.duration,
        toValue: event.endCoordinates.height,
        useNativeDriver: useNativeDriver,
      }),
    ]).start();
  };

  const keyboardWillHide = (event: KeyboardEvent) => {
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
    keyboardWillShowSub.current = Keyboard.addListener(
      'keyboardWillShow',
      keyboardWillShow
    );
    keyboardWillHideSub.current = Keyboard.addListener(
      'keyboardWillHide',
      keyboardWillHide
    );
    // Clearing the events ont
    return () => {
      keyboardWillShowSub.current = null;
      keyboardWillHideSub.current = null;
    };
  }, []);
  return (
    <Animated.View style={{ paddingBottom: keyboardHeight, flex: 1 }}>
      {children}
    </Animated.View>
  );
};

export default KeyboardViewSpacer;

import * as React from 'react';
export interface KeyboardViewSpacerProps {
    children: Array<React.ReactNode> | React.ReactNode;
    useNativeDriver?: boolean;
}
declare const KeyboardViewSpacer: ({ children, useNativeDriver, }: KeyboardViewSpacerProps) => JSX.Element;
export default KeyboardViewSpacer;

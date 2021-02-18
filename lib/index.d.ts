import * as React from 'react';
interface children {
    children: Array<React.ReactNode> | React.ReactNode;
    useNativeDriver?: boolean;
}
declare const KeyboardViewSpacer: ({ children, useNativeDriver, }: children) => JSX.Element;
export default KeyboardViewSpacer;

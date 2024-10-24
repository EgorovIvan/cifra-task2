import * as React from "react";

export interface HeaderProps {
    headline: string;
    supportingText?: string;
    showCloseButton?: boolean;
    onCloseButtonClick?: () => void,
    centralButton?: React.ReactNode;
    rightButton?: React.ReactNode;
    hasBorder?: boolean;
    isBlueBackground?: boolean;
}

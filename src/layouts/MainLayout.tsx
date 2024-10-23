import * as React from 'react';
import Header from '../components/Header/Header.tsx';
import Footer from '../components/Footer/Footer.tsx';

interface MainLayoutProps {
    children: React.ReactNode;
    headline: string;
    supportingText?: string;
    showCloseButton?: boolean;
    onCloseButtonClick?: () => void,
    centralButton?: React.ReactNode;
    rightButton?: React.ReactNode;
    hasBorder?: boolean;
    isBlueBackground?: boolean;
}

const MainLayout:
    React.FC<MainLayoutProps> = ({
        children,
        headline,
        supportingText,
        showCloseButton = false,
        onCloseButtonClick,
        centralButton,
        rightButton,
        hasBorder = true,
        isBlueBackground = false,
    }) => {
        
    return (
        <>
            <Header
                headline={headline}
                supportingText={supportingText}
                showCloseButton={showCloseButton}
                onCloseButtonClick={onCloseButtonClick}
                centralButton={centralButton}
                rightButton={rightButton}
                hasBorder={hasBorder}
                isBlueBackground={isBlueBackground}
            />
            <main className={'main'}>{children}</main>
            <Footer/>
        </>
    );
};

export default MainLayout;

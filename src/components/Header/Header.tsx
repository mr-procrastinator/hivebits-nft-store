import {TonConnectButton} from "@tonconnect/ui-react";
import {Logo} from "../UI/Logo/Logo";
import './header.scss';

export const Header = () => {
    return <header>
        <Logo />
        <span>TON DApp demo</span>
        <TonConnectButton />
    </header>
}

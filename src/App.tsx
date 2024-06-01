import './App.scss'
import {THEME, TonConnectUIProvider} from "@tonconnect/ui-react";
import {Header} from "./components/Header/Header";
import {TxForm} from "./components/TxForm/TxForm";
import {Footer} from "./components/Footer/Footer";
import {TonProofDemo} from "./components/TonProofDemo/TonProofDemo";
import {CreateJettonDemo} from "./components/CreateJettonDemo/CreateJettonDemo";
import {PageInfo} from './components/PageInfo/PageInfo';
import { Collection } from './components/Collection/Collection';

function App() {
  return (
      <TonConnectUIProvider
          manifestUrl="https://mr-procrastinator.github.io/hivebits-nft-store/tonconnect-manifest.json"
          uiPreferences={{ theme: THEME.LIGHT }}
          // uiPreferences = {{
          //   colorsSet: {
          //     [THEME.DARK]: {
          //         connectButton: {
          //             background: 'red'
          //         }
          //     },
          //     [THEME.LIGHT]: {
          //         text: {
          //             primary: '#FF0000'
          //         }
          //     }
          //   }
          // }}
          walletsListConfiguration={{
            includeWallets: [
              {
                appName: "safepalwallet",
                name: "SafePal",
                imageUrl: "https://s.pvcliping.com/web/public_image/SafePal_x288.png",
                tondns: "",
                aboutUrl: "https://www.safepal.com",
                universalLink: "https://link.safepal.io/ton-connect",
                jsBridgeKey: "safepalwallet",
                bridgeUrl: "https://ton-bridge.safepal.com/tonbridge/v1/bridge",
                platforms: ["chrome", "android", "ios", "firefox", "macos", "windows", "linux"]
              },
              {
                appName: "tonwallet",
                name: "TON Wallet",
                imageUrl: "https://wallet.ton.org/assets/ui/qr-logo.png",
                aboutUrl: "https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd",
                universalLink: "https://wallet.ton.org/ton-connect",
                jsBridgeKey: "tonwallet",
                bridgeUrl: "https://bridge.tonapi.io/bridge",
                platforms: ["chrome", "android", "ios", "firefox", "macos", "windows", "linux"]
              }
            ]
          }}
          actionsConfiguration={{
              twaReturnUrl: 'https://t.me/hivebitstest_bot/hivesbitstore'
          }}
      >
        <div className="app">
            <Header />
            <PageInfo />
            <Collection />
            {/* <TxForm />
            <CreateJettonDemo />
            <TonProofDemo />
            <Footer /> */}
        </div>
      </TonConnectUIProvider>
  )
}

export default App

import { SendTransactionRequest, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { Button } from '../Button/Button';
import './style.scss';
import { useEffect, useState } from 'react';
import { NFTItemDescriptionDto } from '../../../server/dto/collection-dto';
import { TonDAppApi } from '../../../TonDAppApi';
import { formatHash } from '../../../utils/clip-hash';

export interface NFTItemProps {
  url: string,
  address: string
  ownerAddress: string
}

// In this example, we are using a predefined smart contract state initialization (`stateInit`)
// to interact with an "EchoContract". This contract is designed to send the value back to the sender,
// serving as a testing tool to prevent users from accidentally spending money.
const defaultTx: SendTransactionRequest = {
  // The transaction is valid for 10 minutes from now, in unix epoch seconds.
  validUntil: Math.floor(Date.now() / 1000) + 600,
  messages: [

    {
      // The receiver's address.
      address: '',
      // Amount to send in nanoTON. For example, 0.005 TON is 5000000 nanoTON.
      amount: '2200000000',
    },

    // Uncomment the following message to send two messages in one transaction.
    /*
    {
      // Note: Funds sent to this address will not be returned back to the sender.
      address: 'UQAuz15H1ZHrZ_psVrAra7HealMIVeFq0wguqlmFno1f3B-m',
      amount: toNano('0.01').toString(),
    }
    */

  ],
};

export const NFTItem:React.FC<NFTItemProps> = ({ url, address, ownerAddress}) => {
  const [item, setItem] = useState<NFTItemDescriptionDto | null>();
  const [error, setError] = useState<Error>();
  const wallet = useTonWallet();
  const [tonConnectUi] = useTonConnectUI();
  const [isPurchased, setIsPurchased] = useState(false);
  
  useEffect(() => {

    const checkIfPurchased = async () => {
      console.log(tonConnectUi.account?.address + " account address " + ownerAddress + " owner address" )
      console.log(tonConnectUi.account?.address.toLowerCase() == ownerAddress.toLowerCase())
      const purchased = tonConnectUi.account?.address.toLowerCase() == ownerAddress.toLowerCase(); //await checkPurchaseStatus(item.id);
      setIsPurchased(purchased);
    };

    checkIfPurchased();
  }, [item, wallet]);
    

  const handleBuyNowClick = (item: NFTItemDescriptionDto) => {
    defaultTx.messages[0].address = ownerAddress;
    tonConnectUi.sendTransaction(defaultTx)
      .then(() => setIsPurchased(true))
      .catch(err => console.error("Transaction failed:", err));
  };

  useEffect(() => {
    const formatedUrl = TonDAppApi.formatIpfsUri(url);
    console.log(formatedUrl)
    TonDAppApi
      .getItemDescription(formatedUrl)
      .then((res) => {
        if (res && !(res instanceof Error)) {
          setItem(res)
        } else {
          setError(res)
        }
      })
    
  }, [])

  return <div className="nft-item">
    <div className="nft-item__card">
      <div className="nft-item__image-wrapper">
        {item && 
          <img
            src={TonDAppApi.formatIpfsUri(item.image)}
            alt="nft-item-image"
          />
        }
        {
          error && 
            <span className="nft-item__error-message">
              Metatada Unavailable
            </span>
        }
      </div>
      <div className="nft-item__card-bottom">
        <h3>{item?.name || formatHash(address)}</h3>
        <Button 
          disabled={!wallet} 
          onClick={() => {handleBuyNowClick(item as NFTItemDescriptionDto)}}
          className={isPurchased && wallet ? 'purchased' : ''}
        >
           {isPurchased ? "Purchased" : "Buy Now"}
        </Button>
      </div>
    </div>
  </div>
}
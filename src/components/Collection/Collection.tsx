import { useEffect, useState } from 'react';
import './styles.scss';
import { NFTItemDto } from '../../server/dto/collection-dto';
import { TonDAppApi } from "../../TonDAppApi";
import { NFTItem } from '../UI/ NFTItem/NFTItem';
import { useTonConnectUI } from '@tonconnect/ui-react';


export const Collection = () => {
  const [items, setItems] = useState<NFTItemDto[]>([])
  const [tonConnectUi] = useTonConnectUI();
  
  useEffect(() => {
    TonDAppApi.getCollectionItems().then(res => {
      if (res && !(res instanceof Error)) {
        setItems(res.nft_items)
      }
    })
  }, [])

  return <div className="collection">
    <div className="collection-layout">
      {items.filter(item =>
       item.owner_address.toUpperCase() == TonDAppApi.collectionOwner || 
        tonConnectUi.account?.address.toUpperCase() == item.owner_address.toUpperCase()
      )
        .map((item, index) => (
        <NFTItem
          url={item.content.uri}
          address={item.address}
          ownerAddress={item.owner_address}
          key={`nft-item-${index}`}
        />
      ))}
    </div>
  </div>
}
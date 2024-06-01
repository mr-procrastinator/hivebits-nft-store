import { useEffect, useState } from 'react';
import './styles.scss';
import { Addresses, NFTItemDto } from '../../server/dto/collection-dto';
import { TonDAppApi } from "../../TonDAppApi";
import { NFTItem } from '../UI/ NFTItem/NFTItem';
import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { A } from 'msw/lib/core/HttpResponse-B07UKAkU';


export const Collection = () => {
  const [items, setItems] = useState<NFTItemDto[]>([])
  const wallet = useTonWallet();
  const [tonConnectUi] = useTonConnectUI();
  
  useEffect(() => {
    TonDAppApi.getCollectionItems().then(async (res) => {
      if (res && !(res instanceof Error)) {
        const addressesResult = await TonDAppApi.getAddressDto();
        let addresses: string[] = [];

        if (Array.isArray(addressesResult)) {
            addresses = addressesResult;
        } else {
            console.error('Error fetching addresses:', addressesResult);
        }
        const filteredItems = filterItems(res.nft_items, addresses, tonConnectUi.account?.address);
        setItems(filteredItems);
      }
    })
  }, [tonConnectUi, wallet])

  const filterItems = (nftItems: NFTItemDto[], addresses: string[], accountAddress?: string ): NFTItemDto[] => {
    const filteredItems: NFTItemDto[] = [];
    for (const item of nftItems) {
      try {
        const interfaceCondition = addresses.includes(item.owner_address);
        const ownerCondition = accountAddress?.toUpperCase() === item.owner_address.toUpperCase();
        console.log('item', item);
        console.log('interfaceCondition', interfaceCondition);
        console.log('ownerCondition', ownerCondition);
        console.log('accountAddress', accountAddress);
        if (interfaceCondition || ownerCondition) {
          filteredItems.push(item);
        }
      } catch (error) {
        console.error('Error fetching address data:', error);
      }
    }

    return filteredItems;
  };

  return <div className="collection">
    <div className="collection-layout">
      {items.map((item, index) => (
        <NFTItem
          url={item.content.uri}
          address={item.address}
          ownerAddress={item.owner_address}
          key={`nft-item-${item.address}`}
        />
      ))}
    </div>
  </div>
}
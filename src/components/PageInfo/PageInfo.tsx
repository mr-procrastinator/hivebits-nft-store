import { useEffect, useState } from "react";
import { TonDAppApi } from "../../TonDAppApi";
import { CollectionDetailsDto, NFTCollectionDto } from "../../server/dto/collection-dto";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import TgIcon from "../../assets/tg-icon.svg";
import BgLogo from "../../assets/cover.png";
import BgBee from "../../assets/bee.jpg";
import CopiIcon from "../../assets/copy.svg";
import { PageHeading } from "../PageHeader/PageHeader";
import { Button, ButtonVariant } from "../UI/Button/Button";
import "./style.scss";
import { formatHash } from "../../utils/clip-hash";

function getLastSlashLink(str: string) {
  const chunks = str.split('/');
  return chunks[chunks.length - 1];
}

export const PageInfo = () => {
  const [collection, setCollection] = useState<NFTCollectionDto | null>(null)
  const [details, setDetails] = useState<CollectionDetailsDto | null>(null)

  useEffect(() => {
    TonDAppApi.getCollection().then(res => {
      if (!(res instanceof Error) && res.nft_collections.length) {
        setCollection(res.nft_collections[0]);
      }
    })
  }, [])

  useEffect(() => {
    if (collection) {
      const url = TonDAppApi.formatIpfsUri(collection.collection_content.uri);
      TonDAppApi.getCollectionDetails(url).then(res => {
        if (!(res instanceof Error)) {
          setDetails(res);
        }
      })
    }
   
  }, [collection])

  return <>
    <PageHeading image={details ? BgLogo : ''} />
    <div className="page-info">
      {details &&
        <>
          <div className="page-info__avatar-wrapper">
            <div 
              className="page-info__avatar"
              style={{
                backgroundImage: `url(${BgBee})`
              }}
            ></div>
          </div>
          <h1>{details.name}</h1>
          <p className="page-info__description">{details.description}</p>
        </>
      }
      {collection &&
      <div className="page-info__ellipses-wrapper">
        <div className="page-info__ellipses">
        <a className="ellipseMe" href="https://dapp-stg.hivebits.io/dashboard" target="_blank" rel="noopener noreferrer">
            Main Portal Page
          </a>
        </div>
      </div>
      }
      <div className="page-info__divider"></div>
      {details &&
        <div className="page-info__social-links">
          {details.social_links.map((item, index) => {
            return <a key={`social-${index}`} href={item}>
              <div className="page-info__social-links-inner">
                <TgIcon />
                @{getLastSlashLink(item)}
              </div>
            </a>
          })}
        </div>
      }
    </div>
  </>
}
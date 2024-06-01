import { CollectionDetailsDto, NFTCollectionListDto, NFTItemDescriptionDto, NFTItemsListDto } from "./server/dto/collection-dto";

const collectionUrl = 'https://testnet.toncenter.com/api/v3/nft/collections?collection_address=EQBrcWXXk5h4a-xcYCJC6tHiS2eJlox6o60HJzzyrdZ6vQwB&owner_address=EQD9votaYZ0pI-YfIweCtIgK1263P6CJH8cEfBqEWMZTucKk&limit=128&offset=0';
const itemsUrl = 'https://testnet.toncenter.com/api/v3/nft/items?collection_address=EQBrcWXXk5h4a-xcYCJC6tHiS2eJlox6o60HJzzyrdZ6vQwB&limit=128&offset=0';

class TonDAppApiService {
  private collectionUrl = collectionUrl;
  private itemsUrl = itemsUrl;
  collectionOwner = '0:FDBE8B5A619D2923E61F230782B4880AD76EB73FA0891FC7047C1A8458C653B9'

  constructor() {
    this.load = this.load.bind(this);
  }

  getCollection(): Promise<NFTCollectionListDto | Error> {
    return this.load(this.collectionUrl);
  }

  getCollectionDetails(uri: string) :Promise<CollectionDetailsDto | Error> {
    return this.load(uri);
  }

  getCollectionItems(): Promise<NFTItemsListDto | Error> {
    return this.load(this.itemsUrl);
  }

  getItemDescription(uri: string): Promise<NFTItemDescriptionDto | Error> {
    return this.load(uri);
  }

  formatIpfsUri(uri: string) {
    return uri.replace('ipfs://', 'https://ipfs.io/ipfs/');
  }

  private async load<T>(url: string): Promise<T | Error> {
    try {
      const response =  await fetch(url);
      if (!response.ok) {
        throw new Error(`Api error status:${response.status} ${response.statusText}`)
      }
      const json = await response.json();
      return json;
    } catch (e) {
      return new Error((e as Error).message);
    }
  }
}

export const TonDAppApi = new TonDAppApiService()
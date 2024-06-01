import zod from "zod";

export const CollectionDetails = zod.object({
  name: zod.string(),
  description: zod.string(),
  image: zod.string(),
  social_links: zod.array(zod.string())
});

export type CollectionDetailsDto = zod.infer<typeof CollectionDetails>;

export const NFTCollection = zod.object({
  address: zod.string(),
  code_hash: zod.string(),
  collection_content: zod.object({
    uri: zod.string()
  }),
  data_hash: zod.string(),
  last_transaction_lt: zod.string(),
  next_item_index: zod.number(),
  owner_address: zod.string(),
});

export type  NFTCollectionDto = zod.infer<typeof NFTCollection>;

export const NFTCollectionsList = zod.object({
  nft_collections: zod.array(NFTCollection)
});

export type  NFTCollectionListDto = zod.infer<typeof NFTCollectionsList>;

export const NFTItem = zod.object({
  address: zod.string(),
  collection_address: zod.string(),
  owner_address: zod.string(),
  init: zod.boolean(),
  index: zod.number(),
  last_transaction_lt: zod.string(),
  code_hash: zod.string(),
  data_hash: zod.string(),
  content: zod.object({
    uri: zod.string()
  }),
  collection: NFTCollection
});

export type NFTItemDto = zod.infer<typeof NFTItem>;

export const NFTItemsList = zod.object({
  nft_items: zod.array(NFTItem)
});

export type NFTItemsListDto = zod.infer<typeof NFTItemsList>;

export const NFTItemDescription = zod.object({
  name: zod.string(),
  description: zod.string(),
  image: zod.string(),
  attributes: zod.array(zod.object({
    trait_type: zod.string(),
    value: zod.string()
  }))
});

export type NFTItemDescriptionDto = zod.infer<typeof NFTItemDescription>;


const AddressDtoSchema = zod.object({
  address: zod.string(),
  balance: zod.number(),
  last_activity: zod.number(),
  status: zod.string(),
  interfaces: zod.array(zod.string()),
  get_methods: zod.array(zod.string()),
  is_wallet: zod.boolean(),
});


export type AddressDto = zod.infer<typeof AddressDtoSchema>;

const addressesSchema = zod.array(zod.string());

// Use z.infer to infer the TypeScript type
export type Addresses = zod.infer<typeof addressesSchema>;
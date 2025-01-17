export interface ProductHit {
  id: string;
  title: string;
  handle: string;
  description: string | null;
  thumbnail: string | null;
  variants: any[]; // TODO check & test this type
  collection_handle: string | null;
  collection_id: string | null;
}

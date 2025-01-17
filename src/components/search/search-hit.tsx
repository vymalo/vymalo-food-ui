import { AppImage } from '@components/image';
import { Hit } from 'instantsearch.js';
import { Link } from 'react-router-dom';
import { ProductHit } from './product.ts';

export interface SearchHitProps {
  hit: Hit<ProductHit>;
}

export function SearchHit({ hit }: SearchHitProps) {
  return (
    <Link
      className='card card-compact bg-base-200'
      key={hit.id}
      to={`/p/${hit.id}`}>
      <figure className='bg-base-200'>
        <AppImage
          width={300}
          height={300}
          className='h-48 w-full object-cover'
          src={hit.thumbnail ?? '/assets/vymalo.png'}
          alt={hit.title}
        />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{hit.title}</h2>
      </div>
    </Link>
  );
}

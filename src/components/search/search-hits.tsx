import { SearchHit } from './search-hit.tsx';
import { SearchShowAll } from './search-show-all.tsx';
import { useHits } from 'react-instantsearch';
import { ProductHit } from './product.ts';

export function SearchHits() {
  const { items } = useHits<ProductHit>();

  return (
    <div className='container'>
      <div className='mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
        {items.map((hit) => (
          <SearchHit key={hit.id} hit={hit} />
        ))}
      </div>

      <SearchShowAll />
    </div>
  );
}

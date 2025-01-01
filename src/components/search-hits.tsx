import { useHits } from 'react-instantsearch';
import { SearchHit } from '@components/search-hit';
import { SearchShowAll } from '@components/search-show-all';
import { ProductHit } from '../types/product';

export function SearchHits() {
	const { items } = useHits<ProductHit>();

	return (
		<div className="container">
			<div className="grid gap-4 mb-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
				{items.map((hit) => (
					<SearchHit key={hit.id} hit={hit} />
				))}
			</div>

			<SearchShowAll />
		</div>
	);
}
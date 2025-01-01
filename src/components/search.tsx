import { InstantSearch } from 'react-instantsearch';
import { searchClient } from '../modules/search';
import { SearchInput } from '@components/search-input';
import { SearchBoxWrapper } from '@components/search-box-wrapper';
import { SearchHits } from '@components/search-hits';

export function SearchBlock() {
	return (
		<InstantSearch indexName="products" searchClient={searchClient}>
			<SearchBoxWrapper>
				{(props) => <SearchInput {...props} />}
			</SearchBoxWrapper>

			<SearchHits />
		</InstantSearch>
	);
}

import { SearchBoxWrapper, SearchHits, SearchInput } from '@components/search';
import { searchClient } from '@modules/search';
import { InstantSearch } from 'react-instantsearch';

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

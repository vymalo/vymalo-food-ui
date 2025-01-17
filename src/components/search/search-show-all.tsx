import { Button } from 'react-daisyui';
import { ArrowLeft, ArrowRight } from 'react-feather';
import { useHits } from 'react-instantsearch';

export function SearchShowAll() {
  const { items } = useHits();

  if (items.length > 0 && items.length <= 6) return null;

  if (items.length === 0) {
    return (
      <div className="flex h-fit justify-center gap-2 rounded-xl bg-base-200 py-2">
        <span>No results found.</span>
      </div>
    );
  }

  return (
    <div className="small:flex-row small:py-2 flex h-fit items-center justify-center gap-2 py-4 sm:flex-col">
      <div className="join">
        <Button className="btn join-item">
          <ArrowLeft />
        </Button>
        <Button className="btn join-item">
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}

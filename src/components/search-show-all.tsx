import { useHits } from 'react-instantsearch';
import { ArrowLeft, ArrowRight } from 'react-feather';
import { Button } from 'react-daisyui';

export function SearchShowAll() {
	const { items } = useHits();

	if (items.length > 0 && items.length <= 6) return null;

	if (items.length === 0) {
		return (
			<div className="bg-base-200 rounded-xl flex gap-2 justify-center h-fit py-2">
				<span>No results found.</span>
			</div>
		);
	}

	return (
		<div className="flex sm:flex-col small:flex-row gap-2 justify-center items-center h-fit py-4 small:py-2">
			<div className="join">
				<Button className="join-item btn">
					<ArrowLeft />
				</Button>
				<Button className="join-item btn">Page 22</Button>
				<Button className="join-item btn">
					<ArrowRight />
				</Button>
			</div>
		</div>
	);
}
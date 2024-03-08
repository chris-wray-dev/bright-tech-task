import { FC } from 'react';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/solid';
import { SortField, FileInterface } from './FileExplorer';

interface SortButtonProps {
	type: SortField;
	handleSortClick(type: SortField, asc: boolean): void;
}

const SortButton: FC<SortButtonProps> = ({ type, handleSortClick }) => {
	const handleClickDown = () => {
		handleSortClick(type, true);
	};

	const handleClickUp = () => {
		handleSortClick(type, false);
	};

	return (
		<div className='flex flex-row'>
			<p className=''>{`${type}   :`}</p>
			<div className='' onClick={handleClickDown}>
				<ArrowDownIcon className='w-6 text-lime-200 hover:text-lime-500 cursor-pointer' />
			</div>
			<div className='' onClick={handleClickUp}>
				<ArrowUpIcon className='w-6 text-lime-200 hover:text-lime-500 cursor-pointer' />
			</div>
		</div>
	);
};

export default SortButton;

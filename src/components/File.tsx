import { FC } from 'react';
import { DocumentIcon } from '@heroicons/react/24/solid';
import { FileInterface } from './FileExplorer';

interface FileProps {
	file: FileInterface;
}

const File: FC<FileProps> = ({ file }) => {
	return (
		<div className='flex flex-row w-full'>
			<DocumentIcon className='w-6 md:w-8 text-lime-500 mr-2' />
			<p className='w-full'>{`${file.name}.${file.type}  (added - ${file.added})`}</p>
		</div>
	);
};

export default File;

import { FC, useState } from 'react';
import { FolderIcon, FolderOpenIcon } from '@heroicons/react/24/solid';
import { FileInterface } from './FileExplorer';
import File from './File';

interface FolderProps {
	folder: FileInterface;
	open?: boolean;
}

const Folder: FC<FolderProps> = ({ folder, open = true }) => {
	const [isOpen, setIsOpen] = useState(open);

	const toggleFolder = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div>
			<div
				className='flex flex-col w-full cursor-pointer'
				onClick={toggleFolder}
			>
				<div className='flex flex-row w-full'>
					{isOpen ? (
						<FolderIcon className='w-6 md:w-8 mr-2 text-amber-500' />
					) : (
						<FolderOpenIcon className='w-6 md:w-8 mr-2 text-amber-500' />
					)}

					<p>
						{folder.name} - {folder.added}
					</p>
				</div>
			</div>

			{isOpen && (
				<div className='flex flex-col w-full ml-4 border-l-2 pl-2 pr-2'>
					{folder.files?.map((file: FileInterface, index) => {
						return file.type === 'folder' ? (
							<Folder key={index} folder={{ ...file }} />
						) : (
							<File key={index} file={file} />
						);
					})}
				</div>
			)}
		</div>
	);
};

export default Folder;

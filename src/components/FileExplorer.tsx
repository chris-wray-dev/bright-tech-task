import { useState, FC, ChangeEvent, useEffect } from 'react';
import Folder from './Folder';
import SortButton from './SortButton';
import dummyFiles from '../../public/files.json';

export interface FileInterface {
	type: string;
	name: string;
	added: string;
	files?: FileInterface[];
}

export enum SortField {
	name = 'name',
	added = 'added',
}

const FileExplorer: FC = () => {
	const [files, setFiles] = useState<FileInterface[]>([]);
	const [filteredFiles, setFilteredFiles] = useState<FileInterface[]>([]);

	useEffect(() => {
		setFiles([...dummyFiles]);
		setFilteredFiles([...dummyFiles]);
	}, []);

	const handleSort = (
		sortField: SortField = SortField.name,
		asc: boolean = true
	): void => {
		const sortedFiles = sortFiles([...files], sortField, asc);
		setFilteredFiles(sortedFiles);
	};

	const sortFiles = (
		files: FileInterface[],
		sortField: SortField,
		asc: boolean
	): FileInterface[] => {
		return [...files].sort((a, b) => {
			if (a.files) {
				a.files = sortFiles(a.files, sortField, asc);
			}
			if (a[sortField] < b[sortField]) {
				return asc ? -1 : 1;
			}
			if (a[sortField] > b[sortField]) {
				return asc ? 1 : -1;
			}
			return 0;
		});
	};

	const handleFilter = (event: ChangeEvent<HTMLInputElement>): void => {
		const filteredFiles = filterFiles(event.target.value);
		setFilteredFiles(filteredFiles);
	};

	const filterFiles = (
		filter: string,
		filesToFilter: FileInterface[] = files
	): FileInterface[] => {
		return [...filesToFilter]
			.map((file) => {
				return {
					...file,
					files: file.files?.filter((file) =>
						file.name.toLowerCase().includes(filter.toLowerCase())
					),
				};
			})
			.filter(
				(file) =>
					file.files?.length ||
					file.name.toLowerCase().includes(filter.toLowerCase())
			);
	};

	return (
		<div>
			<div>
				<div className='pb-8 flex flex-col md:flex-row md:justify-around'>
					<input
						className='w-full md:w-1/2 peer block rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 text-black'
						id='filter'
						type='text'
						name='email'
						placeholder='filter by name'
						onChange={handleFilter}
					/>
					<div className='w-full md:w-1/2 mt-8 md:mt-0 flex flex-row justify-around'>
						<SortButton
							type={SortField.name}
							handleSortClick={handleSort}
						/>
						<SortButton
							type={SortField.added}
							handleSortClick={handleSort}
						/>
					</div>
				</div>
			</div>
			<div className='w-full text-sm md:text-xl'>
				<Folder
					folder={{
						type: 'folder',
						name: './',
						added: '',
						files: filteredFiles,
					}}
					open={true}
				/>
			</div>
		</div>
	);
};

export default FileExplorer;

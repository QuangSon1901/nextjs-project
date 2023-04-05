import React, { ChangeEvent, Fragment, useEffect, useRef, useState } from 'react';
interface MediaModalProps {
    onToggle: any;
    onOpen: any;
}
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from 'react-icons/io';
import { FcFolder, FcOpenedFolder, FcImageFile } from 'react-icons/fc';
import { IoReload } from 'react-icons/io5';
import { CiSearch } from 'react-icons/ci';
import axios from 'axios';

interface FileData {
    id: string;
    name: string;
    type: string;
    extension: string | null;
    url: string | null;
}

const contextMenuData = [
    {
        title: 'Refresh',
        underline: true,
        event: 'refresh',
    },
    {
        title: 'New folder',
        underline: false,
        event: 'new-folder',
    },
    {
        title: 'Upload image',
        underline: true,
        event: 'upload-image',
    },
    {
        title: 'Paste',
        underline: false,
        event: 'paste',
    },
];

const contextMenuItemData = [
    {
        title: 'Rename',
        underline: false,
        event: 'rename',
    },
    {
        title: 'Delete',
        underline: false,
        event: 'delete',
    },
    {
        title: 'Copy',
        underline: false,
        event: 'copy',
    },
    {
        title: 'Cut',
        underline: true,
        event: 'cut',
    },
    {
        title: 'Refresh',
        underline: true,
        event: 'refresh',
    },
    {
        title: 'New folder',
        underline: false,
        event: 'new-folder',
    },
    {
        title: 'Upload image',
        underline: true,
        event: 'upload-image',
    },
    {
        title: 'Paste',
        underline: false,
        event: 'paste',
    },
];

export const getFS = async (path?: string) => {
    const res = await fetch(`/api/fs?path=${path}`);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
};

export const addNewFolderFS = async (path: string, name: string) => {
    const res = await fetch(`/api/fs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path, name, type: 'folder' }),
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
};

export const addNewFileFS = async (formData: any) => {
    const res = await fetch(`/api/file`, {
        method: 'POST',
        body: formData,
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
    // const { data } = await axios.post('/api/fs/file', formData);
};

export default function MediaModal({ onToggle, onOpen }: MediaModalProps) {
    const [fsData, setFsData] = useState({ files: [] } as any);
    const [filesSelect, setFilesSelect] = useState([] as any);
    const [pathDirectory, setPathDirectory] = useState('');
    const [historyPath, setHistoryPath] = useState([] as any);
    const [contextMenu, setContextMenu] = useState({ isActive: false, x: 0, y: 0, data: [] } as any);
    const [newFolder, setNewFolder] = useState(false);
    const [fileUpload, setFileUpload] = useState<File | null>(null);

    useEffect(() => {
        (async () => {
            const data = await getFS(pathDirectory);
            setFsData(data);
            setFilesSelect([]);
        })();
    }, [pathDirectory]);

    const handleSelectFile = (file: any) => {
        if (file.type === 'directory') {
            return;
        }

        const checkFile = filesSelect.findIndex((x: any) => x.id === file.id);
        if (checkFile !== -1) {
            const newFiles = filesSelect.filter((x: any) => x.id !== file.id);
            setFilesSelect(newFiles);
        } else {
            setFilesSelect([...filesSelect, file]);
        }
    };

    const handleDoubleClick = (file: any) => {
        if (file.type === 'directory') {
            const newPath = `${pathDirectory}/${file.name}`;
            setHistoryPath([...historyPath, file.name]);
            setPathDirectory(newPath);
            return;
        }

        onOpen([file]);
    };

    const handleBack = () => {
        if (pathDirectory === '' || pathDirectory === '/') {
            return;
        }

        const splitPath = pathDirectory.split('/');
        const deletePath = splitPath.pop();
        const newPath = splitPath.join('/');
        setHistoryPath([...historyPath, deletePath]);
        setPathDirectory(newPath);
    };

    const handleForward = () => {
        const check = checkForward();
        if (!check) {
            return;
        }

        const newPath = `${pathDirectory}/${historyPath[historyPath.length - 1]}`;
        const copyHisoryPath = [...historyPath];
        copyHisoryPath.pop();
        setHistoryPath([...copyHisoryPath]);
        setPathDirectory(newPath);
    };

    const checkForward = () => {
        if (historyPath.length <= 0) {
            return false;
        }

        const splitPath = pathDirectory.split('/');
        if (historyPath[historyPath.length - 1] === splitPath[splitPath.length - 1]) {
            return false;
        }

        return true;
    };

    const handleBodyContextMenu = (e: any, data: any) => {
        e.preventDefault();
        e.stopPropagation();
        const clickX = e.clientX;
        const clickY = e.clientY;
        setContextMenu({ isActive: true, x: clickX, y: clickY, data });
    };

    const uploadRef = useRef<any>(null);
    const handleContextEvent = (type: string) => {
        switch (type) {
            case 'new-folder':
                setNewFolder(true);
                setContextMenu({ isActive: false, x: 0, y: 0, data: [] });
                return;
            case 'upload-image':
                setContextMenu({ isActive: false, x: 0, y: 0, data: [] });
                uploadRef.current.click();
                return;
        }
    };

    const handleFileUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFileUpload(e.target.files[0]);
        } else {
            setFileUpload(null);
        }
    };

    useEffect(() => {
        if (fileUpload !== null) {
            const formData = new FormData();
            formData.append('file', fileUpload);
            formData.append('path', pathDirectory);
            handleAddFile(formData);
        }
    }, [fileUpload]);

    const handleAddFile = async (formData: any) => {
        const res = await addNewFileFS(formData);
        setFsData({ files: [...fsData.files, res.file] });
    };

    return (
        <div>
            <div className="fixed inset-0 items-center justify-center bg-overlay flex z-10">
                <div className="bg-white p-10 rounded-md">
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-lg font-bold text-black">Media</div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            onClick={onToggle}
                            className="w-6 h-6 cursor-pointer"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex">
                            <IoIosArrowRoundBack
                                className={`relative w-7 h-7 mx-[3px] flex items-center justify-center cursor-pointer ${
                                    pathDirectory === '' || pathDirectory === '/' ? 'text-neutral-200' : ''
                                }`}
                                onClick={handleBack}
                            />
                            <IoIosArrowRoundForward
                                className={`relative w-7 h-7 mx-[3px] flex items-center justify-center cursor-pointer ${
                                    checkForward() ? '' : 'text-neutral-200'
                                }`}
                                onClick={handleForward}
                            />
                        </div>
                        <div className="relative flex-1">
                            <input
                                type="text"
                                value={pathDirectory ? pathDirectory : 'Media'}
                                onChange={() => {}}
                                className={`w-full h-10 px-10 outline-none border border-borderColor rounded-md`}
                            />
                            <FcFolder className="absolute top-1/2 -translate-y-1/2 left-2 w-5 h-5 flex items-center justify-center cursor-pointer" />
                            <IoReload className="absolute top-1/2 -translate-y-1/2 right-2 w-4 h-4 flex items-center justify-center cursor-pointer" />
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search Quick access"
                                value=""
                                onChange={() => {}}
                                className={`w-[200px] h-10 px-4 pl-10 outline-none border border-borderColor rounded-md`}
                            />
                            <CiSearch className="absolute top-1/2 -translate-y-1/2 left-2 w-5 h-5 flex items-center justify-center cursor-pointer" />
                        </div>
                    </div>
                    <hr />
                    <div className="py-4">
                        <div
                            className="relative grid grid-cols-4 gap-y-6 gap-x-4 py-4"
                            onContextMenu={(e) => handleBodyContextMenu(e, contextMenuData)}
                        >
                            {fsData.files &&
                                fsData.files.length > 0 &&
                                fsData.files.map((file: FileData) => (
                                    <button
                                        type="button"
                                        key={file.id}
                                        className={`w-52 flex gap-2 px-4 py-2 cursor-pointer text-left hover:bg-blue-100 rounded-md ${
                                            filesSelect.includes(file) ? 'bg-blue-100 hover:bg-blue-100' : ''
                                        }`}
                                        onClick={() => handleSelectFile(file)}
                                        onDoubleClick={() => handleDoubleClick(file)}
                                        onContextMenu={(e) => handleBodyContextMenu(e, contextMenuItemData)}
                                    >
                                        {file.type === 'directory' ? (
                                            <FcOpenedFolder className="relative  w-10 h-10 flex items-center justify-center cursor-pointer" />
                                        ) : (
                                            <FcImageFile className="relative  w-10 h-10 flex items-center justify-center cursor-pointer" />
                                        )}
                                        <div>
                                            <div className="text-black font-medium">{file.name}</div>
                                            <div>{file.extension ? file.extension + ' file' : 'dir'}</div>
                                        </div>
                                    </button>
                                ))}
                            {newFolder && (
                                <NewFolder
                                    isActive={newFolder}
                                    pathDirectory={pathDirectory}
                                    fsData={fsData}
                                    setFsData={setFsData}
                                    setNewFolder={setNewFolder}
                                />
                            )}
                            {contextMenu.isActive && (
                                <ContextMenu
                                    x={contextMenu.x}
                                    y={contextMenu.y}
                                    data={contextMenu.data}
                                    onContextEvent={handleContextEvent}
                                    onClose={() => setContextMenu({ isActive: false, x: 0, y: 0, data: [] })}
                                />
                            )}
                        </div>
                        <input
                            ref={uploadRef}
                            onChange={handleFileUploadChange}
                            type="file"
                            className="invisible opacity-0"
                        />
                        ;
                    </div>
                    <hr />
                    <div className="flex justify-between mt-4">
                        <div></div>
                        <div className="flex gap-4">
                            <button
                                type="button"
                                className="rounded-md py-2 px-6 outline-none bg-white text-black border border-neutral-500 "
                                onClick={() => filesSelect.length > 0 && onOpen(filesSelect)}
                            >
                                Open
                            </button>
                            <button
                                type="button"
                                className="rounded-md py-2 px-6 outline-none bg-white text-black border border-borderColor "
                                onClick={onToggle}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const NewFolder = ({ isActive, pathDirectory, fsData, setFsData, setNewFolder }: any) => {
    const [nameFolder, setNameFolder] = useState('Newfolder');
    const inputRef = useRef<any>(null);
    const buttonRef = useRef<any>(null);
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }

        const windowClick = (event: any) => {
            handleClickOutSite(event, buttonRef, () => {});
        };
        window.addEventListener('click', windowClick);

        return () => {
            window.removeEventListener('click', windowClick);
        };
    }, []);

    const handleAddNewFolder = async (e: any) => {
        e.preventDefault();
        const res = await addNewFolderFS(pathDirectory, nameFolder);
        setFsData({ files: [...fsData.files, res.folder] });
        setNewFolder(false);
    };

    return (
        <button
            ref={buttonRef}
            type="button"
            className={`w-52 flex gap-2 px-4 py-2 cursor-pointer text-left hover:bg-blue-50 rounded-md ${
                isActive && 'bg-blue-100 hover:bg-blue-50'
            }`}
        >
            <FcOpenedFolder className="relative  w-10 h-10 flex items-center justify-center cursor-pointer" />
            <div>
                <div className="text-black font-medium">
                    <input
                        ref={inputRef}
                        type="text"
                        value={nameFolder}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddNewFolder(e)}
                        onChange={(e) => setNameFolder(e.target.value)}
                        className="w-32 px-6 outline-none border border-borderColor rounded-md"
                    />
                </div>
                <div>dir</div>
            </div>
        </button>
    );
};

function ContextMenu(props: any) {
    const contextMenuRef = useRef<any>(null);
    useEffect(() => {
        const windowClick = (event: any) => {
            handleClickOutSite(event, contextMenuRef, () => props.onClose());
        };
        window.addEventListener('click', windowClick);

        return () => {
            window.removeEventListener('click', windowClick);
        };
    });

    return (
        <div
            ref={contextMenuRef}
            className="bg-white p-2 rounded-md z-20 fixed border border-borderColor"
            style={{
                left: props.x,
                top: props.y,
            }}
        >
            <ul className="min-w-[200px]">
                {props.data &&
                    props.data.length > 0 &&
                    props.data.map((item: any, index: number) => (
                        <Fragment key={index}>
                            <li
                                className="!p-2 w-full cursor-pointer hover:bg-blue-50"
                                onClick={() => props.onContextEvent(item.event)}
                            >
                                {item.title}
                            </li>
                            {item.underline && <hr />}
                        </Fragment>
                    ))}
            </ul>
        </div>
    );
}

const handleClickOutSite = (event: any, ref: any, handle: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
        handle();
    }
};

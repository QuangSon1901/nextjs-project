'use client';

import React, { useState } from 'react';
import { PluginProps } from 'react-markdown-editor-lite';
import { MdOutlinePermMedia } from 'react-icons/md';
import MediaModal from '@/app/components/MediaModal';

const FsEditor = (props: PluginProps) => {
    const [mediaModal, setMediaModal] = useState(false);

    const handleToggle = () => {
        setMediaModal(!mediaModal);
    };

    const handleOpen = (files: any) => {
        if (files.length > 0) {
            let mdText = '';
            files.forEach((file: any) => {
                mdText += `![${file.name}](${file.url})`;
            });
            props.editor.insertText(mdText);
            handleToggle();
        }
    };

    return (
        <>
            <div
                className="relative w-7 h-7 mx-[3px] flex items-center justify-center cursor-pointer"
                title="FsEditor"
                onClick={handleToggle}
            >
                <MdOutlinePermMedia />
            </div>
            {mediaModal && <MediaModal onToggle={handleToggle} onOpen={handleOpen} />}
        </>
    );
};
// Define default config if required
FsEditor.defaultConfig = {
    start: 0,
};
FsEditor.align = 'left';
FsEditor.pluginName = 'fseditor';

export default FsEditor;

import { ContentState, EditorState, convertFromHTML, convertToRaw } from 'draft-js';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useFormatParadeState } from './FormatParadeState';

// Import Editor dynamically only do it for client and not ssr
const Editor = dynamic(
    () => import('react-draft-wysiwyg').then((module) => module.Editor), {
    ssr: false
}
)


export default function useRichTextGenerate(usersProps: any, platoonProps: any){

    const { formatedParadeState } = useFormatParadeState(usersProps, platoonProps)

    // Make html string into readable string, replace commas and repalce br with Unicode character for "Zero Width Non-Joiner
    const readableString: any = convertFromHTML(formatedParadeState.replace(/,/g, '').replace(/#/g, '\u200C').replace('<br/>', '\u200C'));


    const initialContentState = ContentState.createFromBlockArray(readableString);
    
    const rawContentState = convertToRaw(initialContentState)

    const plainText = rawContentState.blocks.map(block => block.text).join('\n')


    const [editorState, setEditorState] = useState(EditorState.createWithContent(initialContentState));


    const onEditorStateChange = (editorState: any) => {
        setEditorState(editorState);
    };

    return {
        plainText,
        editorRender: (
            <div className='bg-[#f8f9FA] w-full min-h-full pb-20'>
            <Editor
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                toolbarClassName='flex sticky top-0 z-50 justify-center mx-auto'
                editorClassName='mt-3 p-5 bg-white shadow-lg max-w-5xl mx-auto border'
                defaultEditorState={editorState}
                toolbar={{
                    options: ['history'],
                    inline: { inDropdown: true },
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: true },
                }}
            />
        </div>
        )
    }
}

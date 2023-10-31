import dynamic from 'next/dynamic';
import React, { useState } from 'react'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw,convertFromRaw, ContentState, EditorState } from 'draft-js';
import { draftToMarkdown } from 'markdown-draft-js';

// Import Editor dynamically only do it for client and not ssr
const Editor =dynamic(
    () => import ('react-draft-wysiwyg').then((module) => module.Editor),{
        ssr:false
    }
)


const useRichText = (prevComment: string) => {

    const initialContentState = ContentState.createFromText(prevComment);

    const [editorState, setEditorState] = useState(EditorState.createWithContent(initialContentState));

    const onEditorStateChange = (editorState: any) =>{
        setEditorState(editorState);
        
    };
    
    // New Text
    const richTextComments = editorState && draftToMarkdown(convertToRaw(editorState.getCurrentContent()))
    

    return {
        richTextComments,
        richTextrender:(
            <div className='bg-[#f8f9FA] min-h-full pb-16'>
                <Editor 
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                toolbarClassName='flex sticky top-0 z-50 justify-center mx-auto'
                editorClassName='mt-3 p-5 bg-white shadow-lg max-w-5xl mx-auto border'
                defaultEditorState={editorState}
                />
            </div>
        )
    }
}

export default useRichText
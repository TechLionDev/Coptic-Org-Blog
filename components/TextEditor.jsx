'use client';

import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TextEditor = ({ onRichTextChange }) => {
    const editorRef = useRef(null);

    const handleEditorChange = (content, editor) => {
        if (onRichTextChange) {
            onRichTextChange(content);
        }
    }

    return (
        <>
            <Editor
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue=""
                init={{
                    plugins: 'advcode advlist advtable autocorrect autolink autosave casechange charmap checklist code codesample directionality editimage emoticons export footnotes formatpainter image importcss inlinecss insertdatetime link linkchecker lists media mediaembed powerpaste preview save searchreplace table tableofcontents tinymcespellchecker typography visualblocks visualchars wordcount',
                    menubar: false,
                    toolbar: 'undo redo | bold italic underline strikethrough subscript superscript | fontfamily fontsize | forecolor backcolor | alignleft aligncenter alignright alignjustify | outdent indent | bullist numlist | blockquote hr | link unlink | image insertimage media | table | removeformat | code codesample | emoticons | imageoptions | insertdatetime | spellchecker | charmap | checklist | quicklink quicktable | export import | insertfile | preview | formatpainter | casechange | addcomment showcomments | ltr rtl | typopgraphy | mergetags mergetags_list | imageedit | flipv fliph rotateleft rotateright | insertfile | footnotes footnotesupdate | tableclass tablecellclass tablecellborderstyle tablecellborderwidth | tablecellbackgroundcolor tablecellbordercolor | tablerowheader tablecolheader | tablecaption | tablesplitcells tablemergecells | tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tableinsertcolbefore tableinsertcolafter | tabledeletecol tabledeleterow tablecopyrow tabledelete | tableprops | tableofcontents tableofcontentsupdate',
                    toolbar_sticky: true,
                    image_advtab: true,
                    importcss_append: true,
                    template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:M:S]',
                    template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:M:S]',
                    height: 600,
                    image_caption: true,
                    noneditable_noneditable_class: 'mceNonEditable',
                    toolbar_mode: 'sliding',
                    contextmenu: 'copy paste | cut | undo redo | link unlink | image imagetools | table',
                    skin: 'oxide',
                    content_css: 'default',
                    content_style: 'body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }',
                    width: '100%',
                }}
                onEditorChange={handleEditorChange}
            />
        </>
    );
}

export default TextEditor;
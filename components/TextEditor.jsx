'use client';

import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TextEditor = ({ onRichTextChange, initialHTML }) => {
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
        initialValue={initialHTML}
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
          branding: false,
          /* enable title field in the Image dialog*/
          image_title: true,
          /* enable automatic uploads of images represented by blob or data URIs*/
          automatic_uploads: true,
          /*
            URL of our upload handler (for more details check: https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_url)
            images_upload_url: 'postAcceptor.php',
            here we add custom filepicker only to Image dialog
          */
          file_picker_types: 'image',
          /* and here's our custom image picker*/
          file_picker_callback: function (cb, value, meta) {
            var input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');

            /*
              Note: In modern browsers input[type="file"] is functional without
              even adding it to the DOM, but that might not be the case in some older
              or quirky browsers like IE, so you might want to add it to the DOM
              just in case, and visually hide it. And do not forget do remove it
              once you do not need it anymore.
            */

            input.onchange = function () {
              var file = this.files[0];

              var reader = new FileReader();
              reader.onload = function () {
                /*
                  Note: Now we need to register the blob in TinyMCEs image blob
                  registry. In the next release this part hopefully won't be
                  necessary, as we are looking to handle it internally.
                */
                var id = 'blobid' + (new Date()).getTime();
                var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                var base64 = reader.result.split(',')[1];
                var blobInfo = blobCache.create(id, file, base64);
                blobCache.add(blobInfo);

                /* call the callback and populate the Title field with the file name */
                cb(blobInfo.blobUri(), { title: file.name });
              };
              reader.readAsDataURL(file);
            };

            input.click();
          },
        }}
        onEditorChange={handleEditorChange}
      />
    </>
  );
}

export default TextEditor;
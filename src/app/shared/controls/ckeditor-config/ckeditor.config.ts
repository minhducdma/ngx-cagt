export const config = {
    fullOption: {
        extraPlugins:
            "uploadimage,dialogui,dialog,a11yhelp,about,basicstyles,bidi,blockquote,clipboard," +
            "button,panelbutton,panel,floatpanel,colorbutton,colordialog,menu," +
            "contextmenu,dialogadvtab,div,elementspath,enterkey,entities,popup," +
            "filebrowser,find,fakeobjects,flash,floatingspace,listblock,richcombo," +
            "font,format,forms,horizontalrule,htmlwriter,iframe,image,indent," +
            "indentblock,indentlist,justify,link,list,liststyle,magicline," +
            "maximize,newpage,pagebreak,pastefromword,pastetext,preview,print," +
            "removeformat,resize,save,menubutton,scayt,selectall,showblocks," +
            "showborders,smiley,sourcearea,specialchar,stylescombo,tab,table," +
            "tabletools,templates,toolbar,undo,wsc,wysiwygarea",
        removePlugins: 'easyimage',
        // filebrowserBrowseUrl: ConfigService.mainUrl() + '/api/Promotions/UploadImageCKEdit',
        // filebrowserUploadUrl: ConfigService.mainUrl() + '/api/Promotions/UploadImageCKEdit'
    },
    basicOption:{
        extraPlugins:
            "image,uploadimage,divarea",
            removePlugins: 'horizontalrule,tabletools,specialchar,about,list,others',
            removeButtons: 'Save,NewPage,Preview,Print,Templates,Replace,SelectAll,Form,Textarea,Find,Select,Button,HiddenField,CopyFormatting,CreateDiv,BidiLtr,BidiRtl,Language,Flash,Smiley,PageBreak,ShowBlocks,Cut,Copy,Paste,Table,Format,Source,Maximize,Styles,Anchor,SpecialChar,PasteFromWord,PasteText,Scayt,Undo,Redo,Strike,RemoveFormat,Indent,Outdent,Blockquote',
        height: '100',
        filebrowserBrowseUrl:'/api/Promotions/UploadImageCKEdit',
        filebrowserUploadUrl: '/api/Promotions/UploadImageCKEdit'
    }
}

//removeButtons: 'Save,NewPage,Preview,Print,Templates,Replace,SelectAll,Form,Checkbox,Radio,TextField,Textarea,Find,Select,Button,ImageButton,HiddenField,JustifyLeft,JustifyCenter,JustifyRight,JustifyBlock,CopyFormatting,CreateDiv,BidiLtr,BidiRtl,Language,Flash,Smiley,PageBreak,Iframe,Font,FontSize,TextColor,BGColor,ShowBlocks,Cut,Copy,Paste,Table,Image,Format,Source,Maximize,Styles,Anchor,SpecialChar,PasteFromWord,PasteText,Scayt,Undo,Redo,Strike,RemoveFormat,Indent,Outdent,Blockquote,Underline',
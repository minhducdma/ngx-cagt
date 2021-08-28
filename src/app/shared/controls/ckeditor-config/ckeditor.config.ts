import { UrlConstant } from "../../../@core/constants/url.constant";

export const config = {
    basicOption: {
        extraPlugins:
            "image,tabletools,html5video,html5audio,widget,lineutils,clipboard,widgetselection,uploadfile,uploadwidget,filetools,notificationaggregator,notification",
        // removePlugins: 'horizontalrule,specialchar,about,list,others',
        // removeButtons: 'Save,NewPage,Preview,Print,Templates,Replace,SelectAll,Form,Textarea,Find,Select,Button,HiddenField,CopyFormatting,CreateDiv,BidiLtr,BidiRtl,Language,Flash,Smiley,PageBreak,ShowBlocks,Cut,Copy,Paste,Table,Format,Source,Maximize,Styles,Anchor,SpecialChar,PasteFromWord,PasteText,Scayt,Undo,Redo,Strike,RemoveFormat,Indent,Outdent,Blockquote',
        height: '200',
        filebrowserImageBrowseUrl: UrlConstant.ROUTE.STORE_FILE,
        filebrowserUploadUrl: UrlConstant.ROUTE.UPLOAD_FILE
    },

    other1Option: {
        extraPlugins:
            "image,tabletools,html5video,html5audio,widget,lineutils,clipboard,widgetselection,uploadfile,uploadwidget,filetools,notificationaggregator,notification",
        // removePlugins: 'horizontalrule,specialchar,about,list,others',
        // removeButtons: 'Save,NewPage,Preview,Print,Templates,Replace,SelectAll,Form,Textarea,Find,Select,Button,HiddenField,CopyFormatting,CreateDiv,BidiLtr,BidiRtl,Language,Flash,Smiley,PageBreak,ShowBlocks,Cut,Copy,Paste,Table,Format,Source,Maximize,Styles,Anchor,SpecialChar,PasteFromWord,PasteText,Scayt,Undo,Redo,Strike,RemoveFormat,Indent,Outdent,Blockquote',
        height: '100',
        filebrowserImageBrowseUrl: UrlConstant.ROUTE.STORE_FILE,
        filebrowserUploadUrl: UrlConstant.ROUTE.UPLOAD_FILE
    }
}

//removeButtons: 'Save,NewPage,Preview,Print,Templates,Replace,SelectAll,Form,Checkbox,Radio,TextField,Textarea,Find,Select,Button,ImageButton,HiddenField,JustifyLeft,JustifyCenter,JustifyRight,JustifyBlock,CopyFormatting,CreateDiv,BidiLtr,BidiRtl,Language,Flash,Smiley,PageBreak,Iframe,Font,FontSize,TextColor,BGColor,ShowBlocks,Cut,Copy,Paste,Table,Image,Format,Source,Maximize,Styles,Anchor,SpecialChar,PasteFromWord,PasteText,Scayt,Undo,Redo,Strike,RemoveFormat,Indent,Outdent,Blockquote,Underline',
// extraPlugins:
//"image,divarea,html5video,html5audio,tabletools"
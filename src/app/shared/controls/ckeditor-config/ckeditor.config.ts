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
            "divarea",
        height: '100'
    }
}
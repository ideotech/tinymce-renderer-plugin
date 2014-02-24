jQuery(document).ready(function() {

    tinyMCEConfigAdvanced = {
        theme : "advanced",            
        relative_urls : false,
        remove_script_host : false,
        body_class : "mceEditor",
        theme_advanced_buttons1 : "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,image,|,formatselect,fontselect,fontsizeselect",
        theme_advanced_buttons2 : "forecolor,backcolor,|,tablecontrols,|,hr,removeformat,visualaid,|,pastetext,pasteword,selectall,|,sub,sup,charmap,|,fullscreen,preview,cleanup,code",
        theme_advanced_buttons3 : "",
        theme_advanced_buttons4 : "",
        theme_advanced_toolbar_location : "top",
        theme_advanced_toolbar_align : "left",
        theme_advanced_resizing : true,
        theme_advanced_resize_horizontal : true,
        theme_advanced_resizing_use_cookie : true,
        theme_advanced_path : false,
        theme_advanced_statusbar_location : "bottom",
        plugins : "table,fullscreen,preview,contextmenu,inlinepopups,paste",
        dialog_type : "modal",
        table_cell_limit : 1000,
        table_default_border : 1,
        table_default_cellpadding : 5,
        table_default_cellspacing : 0,
        invalid_elements : "script,input,applet,embed,xml,style,object"
    }

    var tinyMCEConfigSimple = {
        theme : "advanced",
        relative_urls : false,
        remove_script_host : false,
        body_class : "mceEditor",
        theme_advanced_buttons1 : "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,image",
        theme_advanced_buttons2 : "fullscreen,|,tablecontrols,|,hr,removeformat,visualaid,sub,sup,charmap",
        theme_advanced_buttons3 : "formatselect,fontselect,fontsizeselect,|,forecolor,backcolor,|,preview,cleanup,code",
        theme_advanced_buttons4 : "",
        theme_advanced_toolbar_location : "top",
        theme_advanced_toolbar_align : "left",
        theme_advanced_resizing : true,
        theme_advanced_resize_horizontal : true,
        theme_advanced_resizing_use_cookie : true,
        theme_advanced_path : false,
        theme_advanced_statusbar_location : "",
        plugins : "table,fullscreen,preview,contextmenu,inlinepopups,paste",
        dialog_type : "modal",
        invalid_elements : "script,input,applet,embed,xml,style,object"
    }
    
    // Bind the init function so it runs when a dialog loads, or any other dynamic content situation
    JIRA.bind(JIRA.Events.NEW_CONTENT_ADDED, function (e, $context) {
        $context.find('.myTinyMCETextArea').each(function (i, el) {
            var $ed = jQuery(el);
            if (!$ed.tinymce()) { // only create it once
                $ed.tinymce(tinyMCEConfigSimple)
            }
        });
    });
    
    
    function removeTinyMCEEditor() {
        if (jQuery('textarea.myTinyMCETextArea').tinymce() != undefined){
            jQuery('textarea.myTinyMCETextArea').tinymce().remove();
        }
    }
    
    // the following hacks are to handle the fact the main issue page has two comment boxes (top, bottom)
    
    if (jQuery("#comment-issue").length != 0) {
        jQuery("body").delegate( "#comment-issue","click",function(){
            setTimeout(function () {
                removeTinyMCEEditor()
                jQuery('textarea.myTinyMCETextArea').tinymce(tinyMCEConfigAdvanced);
            }, 1);
        });
    } else {
        jQuery('textarea.myTinyMCETextArea').tinymce(tinyMCEConfigAdvanced);
    }

    if (jQuery("#footer-comment-button").length != 0) {
        jQuery("body").delegate("#footer-comment-button","click",function(){
            setTimeout(function () {
                removeTinyMCEEditor()
                jQuery('textarea.myTinyMCETextArea').tinymce(tinyMCEConfigAdvanced);
            }, 1);
        });
    }

    jQuery("#issue-comment-add-cancel").click(function(){
        removeTinyMCEEditor()
    });
    
    // Fix for JQuery Sizzle selector engine not checking whether an element has the getAttribute method
    jQuery.find.selectors.filters.text = function ( elem ) {
        var attr = null
        if(elem.getAttribute != undefined){
            var attr = elem.getAttribute( "type" ), type = elem.type;
            // IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
            // use getAttribute instead to test this case
            return "text" === type && ( attr === type || attr === null );
        }
    }
});

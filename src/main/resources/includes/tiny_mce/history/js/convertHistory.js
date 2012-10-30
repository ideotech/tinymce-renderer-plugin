/**
 * Created with IntelliJ IDEA.
 * User: s.genin
 * Date: 29/08/12
 * Time: 16:26
 * To change this template use File | Settings | File Templates.
 */
HIS = {};

HIS.History = {
    htmlize : function(element) {
        element.html(element.text());
    },
    htmlizeBySelector : function(aSelector) {
        AJS.$(aSelector+":contains('<p')").each(function(){
            HIS.History.htmlize(AJS.$(this));
        });
    },
    htmlizeHistories : function() {
        HIS.History.htmlizeBySelector(".activity-new-val");
        HIS.History.htmlizeBySelector(".activity-old-val");
    }
};


jQuery(document).ready(function(){
    HIS.History.htmlizeHistories();
    if ((JIRA.ViewIssueTabs != undefined) && jQuery.isFunction(JIRA.ViewIssueTabs.onTabReady)) {
       JIRA.ViewIssueTabs.onTabReady (function () {HIS.History.htmlizeHistories();})
    }
});
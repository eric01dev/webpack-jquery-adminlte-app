console.log('common');

import 'core-js/stable';
import '../../node_modules/admin-lte/dist/js/adminlte';
import '../../node_modules/admin-lte/plugins/jquery-ui/jquery-ui.min.js';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';

$(function () {
    $.widget.bridge('uibutton', $.ui.button);
    var filename = window.location.href.split('/').pop();
    if(filename == "" || filename.includes('index')) {
        console.log("Default Open");
        $('.content-wrapper').IFrame('openTabSidebar', $("a[href$='html/pages/home.html']"));
    }
});
console.log('index');

import '../../node_modules/overlayscrollbars/js/jquery.overlayScrollbars';
import { globalVariable } from './modules/config';

$(function () {
    console.log('onload', 'index');
});

window.globalVariable = globalVariable;
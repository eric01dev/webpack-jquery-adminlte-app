console.log('index');

import '../../node_modules/overlayscrollbars/js/jquery.overlayScrollbars';
import { constant } from './modules/config';

$(function () {
    console.log('onload', 'index');
});

window.constant = constant;
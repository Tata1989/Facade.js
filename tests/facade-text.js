/*global require, casper*/

require('../polyfills/requestAnimationFrame-polyfill');

var Facade = require('../facade');


casper.test.info('Facade.Text');

casper.test.begin('Text entity object created.', function suite(test) {

    'use strict';

    var object = new Facade.Text();

    test.assertType(Facade.Text, 'function', 'Text entity object exists.');
    test.assertInstanceOf(Facade.Text, Facade.Entity, 'Text is an instance of Facade.Entity.');
    test.assertEquals(Facade.Text.constructor, Facade.Entity, 'Text\'s constructor is Facade.Entity.');
    test.assertInstanceOf(object, Facade.Text, 'Object is an instance of Facade.Text.');

    test.assertEquals(object.getAllOptions(), {
        x: 0,
        y: 0,
        anchor: 'top/left',
        rotate: 0,
        scale: 1,
        opacity: 100,
        width: 0,
        fontFamily: 'Arial',
        fontStyle: 'normal',
        fontSize: 16,
        lineHeight: 1,
        textAlignment: 'left',
        textBaseline: 'top',
        fillStyle: '#000',
        strokeStyle: '#000',
        lineWidth: 0
    }, 'Default options have been set correctly.');

    test.assertEquals(object.getAllMetrics(), {
        x: null,
        y: null,
        width: null,
        height: null
    }, 'Default metrics have been set correctly.');

    test.done();

});

casper.test.begin('Setting/getting text entity default options.', function suite(test) {

    'use strict';

    var object = new Facade.Text();

    test.assertEquals(object.getAllOptions(), {
        x: 0,
        y: 0,
        anchor: 'top/left',
        rotate: 0,
        scale: 1,
        opacity: 100,
        width: 0,
        fontFamily: 'Arial',
        fontStyle: 'normal',
        fontSize: 16,
        lineHeight: 1,
        textAlignment: 'left',
        textBaseline: 'top',
        fillStyle: '#000',
        strokeStyle: '#000',
        lineWidth: 0
    }, 'Object default options have been set correctly.');

    test.assertEquals(object.setOptions({ fontFamily: 'Helvetica', fontStyle: 'bold', fontSize: 40 }), {
        x: 0,
        y: 0,
        anchor: 'top/left',
        rotate: 0,
        scale: 1,
        opacity: 100,
        width: 0,
        fontFamily: 'Helvetica',
        fontStyle: 'bold',
        fontSize: 40,
        lineHeight: 1,
        textAlignment: 'left',
        textBaseline: 'top',
        fillStyle: '#000',
        strokeStyle: '#000',
        lineWidth: 0
    }, 'Object custom options have been set correctly.');

    test.done();

});

casper.test.begin('Running _configOptions on text options.', function suite(test) {

    'use strict';

    var object = new Facade.Text('Hello world!\nThis is a text message.', { x: 10, y: 10, fontFamily: 'Helvetica', fontSize: 40, opacity: 50 });

    test.assertEquals(object._configOptions(object.getAllOptions()), {
        x: 10,
        y: 10,
        anchor: 'top/left',
        rotate: 0,
        scale: 1,
        opacity: 50,
        width: 406,
        fontFamily: 'Helvetica',
        fontStyle: 'normal',
        fontSize: 40,
        lineHeight: 1,
        textAlignment: 'left',
        textBaseline: 'top',
        fillStyle: '#000',
        strokeStyle: '#000',
        lineWidth: 0,
        translate: [ 10, 10 ],
        globalAlpha: 0.5,
        font: 'normal 40px Helvetica'
    }, 'Custom config options have been set correctly.');

    test.done();

});

casper.test.begin('Setting metrics for a text entity.', function suite(test) {

    'use strict';

    var object = new Facade.Text('Hello world!\nThis is a text message.', { x: 10, y: 10, fontFamily: 'Helvetica', fontSize: 40, opacity: 50 });

    test.assertEquals(object.getAllMetrics(), {
        x: 10,
        y: 10,
        width: 406,
        height: 80
    }, 'Rect metrics have been set correctly.');

    test.done();

});

casper.test.begin('Setting/getting text anchor.', function suite(test) {

    'use strict';

    var object = new Facade.Text('Hello world!\nThis is a text message.', { x: 10, y: 10, fontFamily: 'Helvetica', fontSize: 40, opacity: 50 });

    object.setOptions({ anchor: 'top/left' });

    test.assertEquals(object._getAnchorPoint(object.getAllOptions(), object.getAllMetrics()), [
        0,
        0
    ], 'Text anchor top/left has been set correctly.');

    object.setOptions({ anchor: 'top/center' });

    test.assertEquals(object._getAnchorPoint(object.getAllOptions(), object.getAllMetrics()), [
        -203,
        0
    ], 'Text anchor top/center has been set correctly.');

    object.setOptions({ anchor: 'top/right' });

    test.assertEquals(object._getAnchorPoint(object.getAllOptions(), object.getAllMetrics()), [
        -406,
        0
    ], 'Text anchor top/right has been set correctly.');

    object.setOptions({ anchor: 'center/left' });

    test.assertEquals(object._getAnchorPoint(object.getAllOptions(), object.getAllMetrics()), [
        0,
        -40
    ], 'Text anchor center/left has been set correctly.');

    object.setOptions({ anchor: 'center' });

    test.assertEquals(object._getAnchorPoint(object.getAllOptions(), object.getAllMetrics()), [
        -203,
        -40
    ], 'Text anchor center has been set correctly.');

    object.setOptions({ anchor: 'center/right' });

    test.assertEquals(object._getAnchorPoint(object.getAllOptions(), object.getAllMetrics()), [
        -406,
        -40
    ], 'Text anchor center/right has been set correctly.');

    object.setOptions({ anchor: 'bottom/left' });

    test.assertEquals(object._getAnchorPoint(object.getAllOptions(), object.getAllMetrics()), [
        0,
        -80
    ], 'Text anchor bottom/left has been set correctly.');

    object.setOptions({ anchor: 'bottom/center' });

    test.assertEquals(object._getAnchorPoint(object.getAllOptions(), object.getAllMetrics()), [
        -203,
        -80
    ], 'Text anchor bottom/center has been set correctly.');

    object.setOptions({ anchor: 'bottom/right' });

    test.assertEquals(object._getAnchorPoint(object.getAllOptions(), object.getAllMetrics()), [
        -406,
        -80
    ], 'Text anchor bottom/right has been set correctly.');

    test.done();

});

/*global require, casper*/

require('../polyfills/requestAnimationFrame-polyfill');

var Facade = require('../facade');


casper.test.info('Facade.Group');

casper.test.begin('Group entity object created.', function suite(test) {

    'use strict';

    var object = new Facade.Group();

    test.assertType(Facade.Group, 'function', 'Group entity object exists.');
    test.assertInstanceOf(Facade.Group, Facade.Entity, 'Group is an instance of Facade.Entity.');
    test.assertEquals(Facade.Group.constructor, Facade.Entity, 'Group\'s constructor is Facade.Entity.');
    test.assertInstanceOf(object, Facade.Group, 'Object is an instance of Facade.Group.');

    test.assertEquals(object.getAllOptions(), {
        x: 0,
        y: 0,
        anchor: 'top/left',
        rotate: 0,
        scale: 1
    }, 'Default options have been set correctly.');

    test.assertEquals(object.getAllMetrics(), {
        x: null,
        y: null,
        width: null,
        height: null
    }, 'Default metrics have been set correctly.');

    test.done();

});

casper.test.begin('Setting/getting group options.', function suite(test) {

    'use strict';

    var object = new Facade.Group();

    test.assertEquals(object.getAllOptions(), {
        x: 0,
        y: 0,
        anchor: 'top/left',
        rotate: 0,
        scale: 1
    }, 'Group default options.');

    test.assertEquals(object.getAllMetrics(), {
        x: null,
        y: null,
        width: null,
        height: null
    }, 'Group default metrics.');

    test.done();

});

// Facade.Group.prototype._draw can't be tested as it makes context changes to the canvas only.

casper.test.begin('Running _configOptions on group options.', function suite(test) {

    'use strict';

    var object = new Facade.Group({ x: 10, y: 10 });

    test.assertEquals(object._configOptions(object.getAllOptions()), {
        x: 10,
        y: 10,
        anchor: 'top/left',
        rotate: 0,
        scale: 1,
        translate: [ 10, 10 ]
    }, 'Custom config options have been set correctly.');

    test.done();

});

casper.test.begin('Add Facade.js entity to Group.', function suite(test) {

    'use strict';

    var group = new Facade.Group(),
        object = new Facade.Entity();

    group.addToGroup(object);

    test.assertEquals(group._objects[0], object, 'Object successfully added to group.');

    test.done();

});

casper.test.begin('Add an array of Facade.js entities to Group.', function suite(test) {

    'use strict';

    var group = new Facade.Group(),
        object1 = new Facade.Entity(),
        object2 = new Facade.Entity();

    group.addToGroup([object1, object2]);

    test.assertEquals(group._objects[0], object1, 'Object #1 successfully added to group.');
    test.assertEquals(group._objects[1], object2, 'Object #2 successfully added to group.');

    test.done();

});

casper.test.begin('Testing the existence of an entity within a Group.', function suite(test) {

    'use strict';

    var group = new Facade.Group(),
        object1 = new Facade.Entity(),
        object2 = new Facade.Entity();

    group.addToGroup(object1);

    test.assertEquals(group.hasEntity(object1), true, 'Object has been found within the group.');
    test.assertEquals(group.hasEntity(object2), false, 'Object doesn\'t exist within the group.');

    test.done();

});

casper.test.begin('Remove Facade.js entity from Group.', function suite(test) {

    'use strict';

    var group = new Facade.Group(),
        object = new Facade.Entity();

    group.addToGroup(object);

    test.assertEquals(group._objects[0], object, 'Object successfully added to group.');

    group.removeFromGroup(object);

    test.assertNotEquals(group._objects[0], object, 'Object successfully removed from group.');

    test.done();

});

casper.test.begin('Setting metrics for a group.', function suite(test) {

    'use strict';

    var group = new Facade.Group(),
        polygon1 = new Facade.Polygon({ points: [ [0, 0], [100, 0], [100, 100], [0, 100] ], lineWidth: 0 }),
        polygon2 = new Facade.Polygon({ x: 100, y: 100, points: [ [0, 0], [100, 0], [100, 100], [0, 100] ], lineWidth: 0 });

    group.addToGroup(polygon1);
    group.addToGroup(polygon2);

    test.assertEquals(group.getAllMetrics(), {
        x: 0,
        y: 0,
        width: 200,
        height: 200
    }, 'Group metrics have been set correctly.');

    test.done();

});

casper.test.begin('Setting/getting group anchor.', function suite(test) {

    'use strict';

    var object = new Facade.Group();

    object.addToGroup(new Facade.Rect({ x: 0, y: 0, width: 100, height: 100, lineWidth: 10 }));

    object.addToGroup(new Facade.Rect({ x: 100, y: 100, width: 100, height: 100, lineWidth: 10 }));

    object.setOptions({ anchor: 'top/left' });

    test.assertEquals(object._getAnchorPoint(object.getAllOptions(), object.getAllMetrics()), [
        0,
        0
    ], 'Group anchor top/left has been set correctly.');

    object.setOptions({ anchor: 'top/center' });

    test.assertEquals(object._getAnchorPoint(object.getAllOptions(), object.getAllMetrics()), [
        -105,
        0
    ], 'Group anchor top/center has been set correctly.');

    object.setOptions({ anchor: 'top/right' });

    test.assertEquals(object._getAnchorPoint(object.getAllOptions(), object.getAllMetrics()), [
        -210,
        0
    ], 'Group anchor top/right has been set correctly.');

    object.setOptions({ anchor: 'center/left' });

    test.assertEquals(object._getAnchorPoint(object.getAllOptions(), object.getAllMetrics()), [
        0,
        -105
    ], 'Group anchor center/left has been set correctly.');

    object.setOptions({ anchor: 'center' });

    test.assertEquals(object._getAnchorPoint(object.getAllOptions(), object.getAllMetrics()), [
        -105,
        -105
    ], 'Group anchor center has been set correctly.');

    object.setOptions({ anchor: 'center/right' });

    test.assertEquals(object._getAnchorPoint(object.getAllOptions(), object.getAllMetrics()), [
        -210,
        -105
    ], 'Group anchor center/right has been set correctly.');

    object.setOptions({ anchor: 'bottom/left' });

    test.assertEquals(object._getAnchorPoint(object.getAllOptions(), object.getAllMetrics()), [
        0,
        -210
    ], 'Group anchor bottom/left has been set correctly.');

    object.setOptions({ anchor: 'bottom/center' });

    test.assertEquals(object._getAnchorPoint(object.getAllOptions(), object.getAllMetrics()), [
        -105,
        -210
    ], 'Group anchor bottom/center has been set correctly.');

    object.setOptions({ anchor: 'bottom/right' });

    test.assertEquals(object._getAnchorPoint(object.getAllOptions(), object.getAllMetrics()), [
        -210,
        -210
    ], 'Group anchor bottom/right has been set correctly.');

    test.done();

});

/*!
 * jQuery confirmOn Plugin Test Suite
 * https://github.com/invetek/jquery-confirmon
 *
 * Copyright 2013 Loran Kloeze - Invetek
 * Released under the MIT license
 */
$.fx.off = true;
QUnit.config.reorder = true;

QUnit.testStart(function() {
    QUnit.config.bodyElements = $('body').children().length;
});

QUnit.testDone(function(o) {
    //Reset plugin
    $.confirmOn.defaultSettings = {
        questionText: 'Are you sure?',
        classPrepend: 'confirmon',
        textYes: 'Yes',
        textNo: 'No'
    };

    removeOverlaysAndBoxes();

    //Check test atomicity in DOM 
    if ($('body').children().length !== QUnit.config.bodyElements) {
        $('#qunit-header').css('background-color', '#812121');
        console.log('Warning: test \'' + o.module + ': ' + o.name + '\' has changed number of DOM elements in <body>: was ' + QUnit.config.bodyElements + ' - is ' + $('body').children().length);
    }

});

/*****************************************************
 * 
 * Module: test the test
 * 
 */
module('Test the test');
test('fixture setup', 2, function() {
    var $fixture = createButtonFixture();

    deepEqual($fixture.length, 1, 'Fixture is available');
    deepEqual($fixture.prop('tagName'), 'BUTTON', 'Fixture is a button');

});

test('removal of overlay and box', 1, function() {
    var beginLen = $('body').children().length;
    $('body').append($('<div/>').addClass('blagegh55jblah-overlay'));
    $('body').append($('<div/>').addClass('blablast336t3sfsfsfsh-overlay'));
    $('body').append($('<div/>').addClass('blabeglah-box'));
    $('body').append($('<div/>').addClass('blablagewgssfsfsfsh-box'));
    removeOverlaysAndBoxes();
    equal($('body').children().length, beginLen, 'Overlays and boxes removed');


});

/*****************************************************
 * 
 * Module: basic functionality
 * 
 */
module('Basic functionality');
test('check plugin method', 2, function() {
    deepEqual(typeof $.fn.confirmOn, 'function', 'Plugin method exists');
    deepEqual($.fn.confirmOn.length, 5, 'Plugin method has 5 arguments');
});

test('check plugin namespace', 1, function() {
    deepEqual(typeof $.confirmOn, 'object', 'Plugin namespace exists');
});

/*****************************************************
 * 
 * Module: settings and options
 * 
 */
module('Settings and options');
test('check default settings', 1, function() {
    deepEqual($.confirmOn.defaultSettings, {
        questionText: 'Are you sure?',
        classPrepend: 'confirmon',
        textYes: 'Yes',
        textNo: 'No'
    }, 'Default settings are in place');
});

test('override default settings by user settings', 1, function() {
    $.confirmOn.overrideDefaultSettings({
        questionText: 'abc',
        classPrepend: 'xyz',
        textYes: 'Ja',
        textNo: 'Nee'

    });

    deepEqual($.confirmOn.defaultSettings, {
        questionText: 'abc',
        classPrepend: 'xyz',
        textYes: 'Ja',
        textNo: 'Nee'
    }, 'Default settings are overridden by user settings');
});

test('check options are default settings', 1, function() {
    var $fixture = createButtonFixture();
    $.confirmOn.setOptions($fixture);

    deepEqual($fixture.data('confirmon').options, {
        questionText: 'Are you sure?',
        classPrepend: 'confirmon',
        textYes: 'Yes',
        textNo: 'No'

    }, 'Options are the default settings');
});

test('override default settings by options', 1, function() {
    var $fixture = createButtonFixture();
    $.confirmOn.setOptions($fixture, {
        questionText: '123',
        classPrepend: '456',
        textYes: 'Ja',
        textNo: 'Nee'
    });
    deepEqual($fixture.data('confirmon').options, {
        questionText: '123',
        classPrepend: '456',
        textYes: 'Ja',
        textNo: 'Nee'
    }, 'Default settings are overridden by options');
});

/*****************************************************
 * 
 * Module: layout
 * 
 */
module('Layout');
test('create overlay', 3, function() {
    var $fixture = createButtonFixture();
    $.confirmOn.setOptions($fixture);
    $.confirmOn.createOverlay($fixture);
    deepEqual($('.confirmon-overlay').length, 1, 'Overlay is available');
    deepEqual($('.confirmon-overlay').is(":visible"), false, 'Overlay is not visible');
    removeOverlaysAndBoxes();

    $.confirmOn.setOptions($fixture);
    $.confirmOn.createOverlay($fixture);
    deepEqual($('.confirmon-overlay').length, 1, 'Overlay is available using class via options');
    removeOverlaysAndBoxes();
});

test('create overlay with options', 1, function() {
    var $fixture = createButtonFixture();
    $.confirmOn.setOptions($fixture, {
        classPrepend: 'testclass'
    });
    $.confirmOn.createOverlay($fixture);
    deepEqual($('.testclass-overlay').length, 1, 'Confirmation box is available using class via options');
    removeOverlaysAndBoxes();
});

test('create confirmation box', 6, function() {
    var $fixture = createButtonFixture();
    $.confirmOn.setOptions($fixture);
    $.confirmOn.createBox($fixture);
    deepEqual($('.confirmon-box').length, 1, 'Confirmation box is available');
    deepEqual($('.confirmon-box').is(":visible"), false, 'Confirmation box is not visible');
    deepEqual($('.confirmon-box button').length, 2, 'Two buttons are available');
    deepEqual($('.confirmon-box p').html(), 'Are you sure?', 'Question contains right text');
    deepEqual($('.confirmon-box button').eq(0).html(), 'Yes', 'Yes button contains right text');
    deepEqual($('.confirmon-box button').eq(1).html(), 'No', 'No button contains right text');
    removeOverlaysAndBoxes();


});

test('create confirmation box with options', 4, function() {
    var $fixture = createButtonFixture();
    $.confirmOn.setOptions($fixture, {
        classPrepend: 'testclass',
        questionText: 'Another question',
        textYes: 'Ja',
        textNo: 'Nee'
    });
    $.confirmOn.createBox($fixture);
    deepEqual($('.testclass-box').length, 1, 'Confirmation box is available using class via options');
    deepEqual($('.testclass-box p').html(), 'Another question', 'Question contains right text');
    deepEqual($('.testclass-box button').eq(0).html(), 'Ja', 'Yes button contains right text');
    deepEqual($('.testclass-box button').eq(1).html(), 'Nee', 'No button contains right text');
    $('.testclass-box').remove();
});

test('show/delete overlay and confirmation box', 6, function() {
    var $fixture = createButtonFixture();
    $.confirmOn.setOptions($fixture);
    $.confirmOn.createOverlay($fixture);
    $.confirmOn.createBox($fixture);
    deepEqual($('.confirmon-overlay').is(":visible"), false, 'Overlay is not available');
    deepEqual($('.confirmon-box').is(":visible"), false, 'Confirmation box is not available');

    $.confirmOn.showOverlay($fixture);
    deepEqual($('.confirmon-overlay').is(":visible"), true, 'Overlay is visible');

    $.confirmOn.deleteOverlay($fixture);
    deepEqual($('.confirmon-overlay').length, 0, 'Overlay is deleted');

    $.confirmOn.showBox($fixture);
    deepEqual($('.confirmon-box').is(":visible"), true, 'Box is visible');

    $.confirmOn.deleteBox($fixture);
    deepEqual($('.confirmon-box').length, 0, 'Box is deleted');

    removeOverlaysAndBoxes();
});

/*****************************************************
 * 
 * Module: argument conversion
 * 
 */
module('Argument conversion');
test('convert argument values for .on() w/o options', 8, function() {
    function handlerFunction() {
    }
    ;
    function handlerFunctionA() {
    }
    ;
    function handlerFunctionB() {
    }
    ;

    //events[S], handler
    deepEqual($.confirmOn.convertArguments('click mouseover', handlerFunction), {
        events: 'click mouseover',
        selector: handlerFunction,
        data: undefined,
        handler: undefined

    }, 'process 2 arguments: events[S], handler');

    //events[S], selector, handler
    deepEqual($.confirmOn.convertArguments('click mouseover', '.confirmThis', handlerFunction), {
        events: 'click mouseover',
        selector: '.confirmThis',
        data: handlerFunction,
        handler: undefined
    }, 'process 3 arguments: events[S], selector, handler,');

    //events[S], data, handler
    deepEqual($.confirmOn.convertArguments('click mouseover', {dataA: 1, dataB: 2}, handlerFunction), {
        events: 'click mouseover',
        selector: {dataA: 1, dataB: 2},
        data: handlerFunction,
        handler: undefined
    }, 'process 3 arguments: events[S], data, handler,');

    //events[S], selector, data, handler
    deepEqual($.confirmOn.convertArguments('click mouseover', '.confirmThis', {dataA: 1, dataB: 2}, handlerFunction), {
        events: 'click mouseover',
        selector: '.confirmThis',
        data: {dataA: 1, dataB: 2},
        handler: handlerFunction
    }, 'process 4 arguments: events[S], selector, data, handler,');

    //events[O]
    deepEqual($.confirmOn.convertArguments({
        'click': handlerFunctionA,
        'mouseover': handlerFunctionB
    }), {
        events: {
            'click': handlerFunctionA,
            'mouseover': handlerFunctionB
        },
        selector: undefined,
        data: undefined
    }, 'process 1 argument: events[O]');

    //events[O], selector
    deepEqual($.confirmOn.convertArguments({
        'click': handlerFunctionA,
        'mouseover': handlerFunctionB
    }, '.confirmThis'), {
        events: {
            'click': handlerFunctionA,
            'mouseover': handlerFunctionB
        },
        selector: '.confirmThis',
        data: undefined
    }, 'process 2 arguments: events[O], selector');

    //events[O], data
    deepEqual($.confirmOn.convertArguments({
        'click': handlerFunctionA,
        'mouseover': handlerFunctionB
    }, {dataA: 1, dataB: 2}), {
        events: {
            'click': handlerFunctionA,
            'mouseover': handlerFunctionB
        },
        selector: {dataA: 1, dataB: 2},
        data: undefined
    }, 'process 2 arguments: events[O], data');

    //events[O], selector, data
    deepEqual($.confirmOn.convertArguments({
        'click': handlerFunctionA,
        'mouseover': handlerFunctionB
    }, '.confirmThis', {dataA: 1, dataB: 2}), {
        events: {
            'click': handlerFunctionA,
            'mouseover': handlerFunctionB
        },
        selector: '.confirmThis',
        data: {dataA: 1, dataB: 2}
    }, 'process 3 arguments: events[O], selector, data');


});

test('convert argument values for .on() w/ options', function() {
    function handlerFunction() {
    }
    ;
    function handlerFunctionA() {
    }
    ;
    function handlerFunctionB() {
    }
    ;

    //options, events[S], handler
    var $fixture = createButtonFixture();
    deepEqual($.confirmOn.convertArguments({
        questionText: 'The question',
        classPrepend: 'myClass',
        textYes: 'да',
        textNo: 'нет'
    }, 'click mouseover', handlerFunction), {
        events: 'click mouseover',
        selector: handlerFunction,
        data: undefined,
        handler: undefined

    }, 'process 3 arguments: options, events[S], handler');
    $.confirmOn.setOptions($fixture, $.confirmOn.providedOptions);
    deepEqual($fixture.data('confirmon').options, {
        questionText: 'The question',
        classPrepend: 'myClass',
        textYes: 'да',
        textNo: 'нет'

    }, 'Options are correctly saved');
    $fixture.remove();

    //options, events[S], selector, handler
    var $fixture = createButtonFixture();
    deepEqual($.confirmOn.convertArguments({
        questionText: 'The question',
        classPrepend: 'otherClass',
        textYes: 'Yes',
        textNo: 'Nee'

    }, 'click mouseover', '.confirmThis', handlerFunction), {
        events: 'click mouseover',
        selector: '.confirmThis',
        data: handlerFunction,
        handler: undefined
    }, 'process 4 arguments: options, events[S], selector, handler,');
    $.confirmOn.setOptions($fixture, $.confirmOn.providedOptions);
    deepEqual($fixture.data('confirmon').options, {
        questionText: 'The question',
        classPrepend: 'otherClass',
        textYes: 'Yes',
        textNo: 'Nee'

    }, 'Options are correctly saved');
    $fixture.remove();


    //options, events[S], data, handler
    var $fixture = createButtonFixture();
    deepEqual($.confirmOn.convertArguments({
        questionText: 'ABC',
        classPrepend: 'def',
        textYes: 'GHI',
        textNo: 'jkl'

    }, 'click mouseover', {dataA: 1, dataB: 2}, handlerFunction), {
        events: 'click mouseover',
        selector: {dataA: 1, dataB: 2},
        data: handlerFunction,
        handler: undefined
    }, 'process 4 arguments: options, events[S], data, handler,');
    $.confirmOn.setOptions($fixture, $.confirmOn.providedOptions);
    deepEqual($fixture.data('confirmon').options, {
        questionText: 'ABC',
        classPrepend: 'def',
        textYes: 'GHI',
        textNo: 'jkl'

    }, 'Options are correctly saved');
    $fixture.remove();


    //options, events[S], selector, data, handler
    var $fixture = createButtonFixture();
    deepEqual($.confirmOn.convertArguments({
        classPrepend: 'xyz',
        questionText: '123'
    }, 'click mouseover', '.confirmThis', {dataA: 1, dataB: 2}, handlerFunction), {
        events: 'click mouseover',
        selector: '.confirmThis',
        data: {dataA: 1, dataB: 2},
        handler: handlerFunction
    }, 'process 5 arguments: options, events[S], selector, data, handler,');
    $.confirmOn.setOptions($fixture, $.confirmOn.providedOptions);
    deepEqual($fixture.data('confirmon').options, {
        questionText: '123',
        classPrepend: 'xyz',
        textYes: 'Yes',
        textNo: 'No'

    }, 'Options are correctly saved');
    $fixture.remove();

    //options, events[O]
    var $fixture = createButtonFixture();
    deepEqual($.confirmOn.convertArguments({
        classPrepend: 'xyz',
        questionText: '123',
        textYes: 'yeah'
    }, {
        'click': handlerFunctionA,
        'mouseover': handlerFunctionB
    }), {
        events: {
            'click': handlerFunctionA,
            'mouseover': handlerFunctionB
        },
        selector: undefined,
        data: undefined
    }, 'process 2 arguments: options, events[O]');
    $.confirmOn.setOptions($fixture, $.confirmOn.providedOptions);
    deepEqual($fixture.data('confirmon').options, {
        classPrepend: 'xyz',
        questionText: '123',
        textYes: 'yeah',
        textNo: 'No'

    }, 'Options are correctly saved');
    $fixture.remove();

    //options, events[O], selector
    var $fixture = createButtonFixture();
    deepEqual($.confirmOn.convertArguments({
        classPrepend: 'xyz',
        questionText: '123',
        textYes: 'yeah',
        textNo: 'No'
    }, {
        'click': handlerFunctionA,
        'mouseover': handlerFunctionB
    }, '.confirmThis'), {
        events: {
            'click': handlerFunctionA,
            'mouseover': handlerFunctionB
        },
        selector: '.confirmThis',
        data: undefined
    }, 'process 3 arguments: options, events[O], selector');
    $.confirmOn.setOptions($fixture, $.confirmOn.providedOptions);
    deepEqual($fixture.data('confirmon').options, {
        classPrepend: 'xyz',
        questionText: '123',
        textYes: 'yeah',
        textNo: 'No'

    }, 'Options are correctly saved');
    $fixture.remove();


    //options, events[O], data
    var $fixture = createButtonFixture();
    deepEqual($.confirmOn.convertArguments({
        classPrepend: 'xyz',
        questionText: '1234567',
        textYes: 'yeah',
        textNo: 'No'

    }, {
        'click': handlerFunctionA,
        'mouseover': handlerFunctionB
    }, {dataA: 1, dataB: 2}), {
        events: {
            'click': handlerFunctionA,
            'mouseover': handlerFunctionB
        },
        selector: {dataA: 1, dataB: 2},
        data: undefined
    }, 'process 3 arguments: options, events[O], data');
    $.confirmOn.setOptions($fixture, $.confirmOn.providedOptions);
    deepEqual($fixture.data('confirmon').options, {
        classPrepend: 'xyz',
        questionText: '1234567',
        textYes: 'yeah',
        textNo: 'No'

    }, 'Options are correctly saved');
    $fixture.remove();


    //options, events[O], selector, data
    var $fixture = createButtonFixture();
    deepEqual($.confirmOn.convertArguments({
        classPrepend: 'xyz',
        questionText: '12345647',
        textYes: 'yeah',
        textNo: 'No'

    }, {
        'click': handlerFunctionA,
        'mouseover': handlerFunctionB
    }, '.confirmThis', {dataA: 1, dataB: 2}), {
        events: {
            'click': handlerFunctionA,
            'mouseover': handlerFunctionB
        },
        selector: '.confirmThis',
        data: {dataA: 1, dataB: 2}
    }, 'process 4 arguments: options, events[O], selector, data');
    $.confirmOn.setOptions($fixture, $.confirmOn.providedOptions);
    deepEqual($fixture.data('confirmon').options, {
        classPrepend: 'xyz',
        questionText: '12345647',
        textYes: 'yeah',
        textNo: 'No'

    }, 'Options are correctly saved');
    $fixture.remove();

    //events[O], selector, data (again, to check correctly use of default options)
    var $fixture = createButtonFixture();
    deepEqual($.confirmOn.convertArguments({
        'click': handlerFunctionA,
        'mouseover': handlerFunctionB
    }, '.confirmThis', {dataA: 1, dataB: 2}), {
        events: {
            'click': handlerFunctionA,
            'mouseover': handlerFunctionB
        },
        selector: '.confirmThis',
        data: {dataA: 1, dataB: 2}
    }, 'process 3 arguments: events[O], selector, data (default options should be in place)');
    $.confirmOn.setOptions($fixture, $.confirmOn.providedOptions);
    deepEqual($fixture.data('confirmon').options, {
        questionText: 'Are you sure?',
        classPrepend: 'confirmon',
        textYes: 'Yes',
        textNo: 'No'
    }, 'Options are correctly saved');
    $fixture.remove();


});

/*****************************************************
 * 
 * Module: events
 * 
 */
module('Events');
test('\'yes\' handler', 1, function() {
    var $fixture = createButtonFixture();
    $.confirmOn.setOptions($fixture);
    $.confirmOn.createBox($fixture);

    var handler = function() {
        ok(true, 'Yes handler called');
    };

    $.confirmOn.attachYesHandler($fixture, handler);
    $('.confirmon-box button').eq(0).trigger('click');

});

/*****************************************************
 * 
 * Module: functional tests
 * 
 */
module('Functional tests');
test('check \'this\' is confirmOn attached button', 1, function(){
    var $fixture = createButtonFixture(); 
    
    $fixture.confirmOn('click', function() {
        deepEqual($(this).get(), $fixture.get(), '\'this\' is the confirmOn attached button');
    });
    
    //Click button to trigger the confirmation box
    $fixture.trigger('click');
    
    //Click yes 
    $('.confirmon-box button').eq(0).trigger('click');
    
});

test('click confirmOn (2 args) attached button and click yes', 3, function() {
    var $fixture = createButtonFixture();    
    $fixture.confirmOn('click', function() {
        ok(true, 'Handler for \'yes\' called');
    });

    //Click button to trigger the confirmation box
    $fixture.trigger('click');
    equal($('.confirmon-overlay').is(':visible'), true, 'Overlay is visible');
    equal($('.confirmon-box').is(':visible'), true, 'Box is visible');

    //Click yes
    $('.confirmon-box button').eq(0).trigger('click');

});

test('click confirmOn (2 args) attached button and click no', 4, function() {
    var $fixture = createButtonFixture();    
    $fixture.confirmOn('click', function() {
        ok(true, 'Handler for \'yes\' should not be called');
    });

    //Click button to trigger the confirmation box
    $fixture.trigger('click');
    equal($('.confirmon-overlay').is(':visible'), true, 'Overlay is visible');
    equal($('.confirmon-box').is(':visible'), true, 'Box is visible');

    //Click no
    $('.confirmon-box button').eq(1).trigger('click');
    
    //Make sure that both overlay and box are deleted
    equal($('.confirmon-overlay').length, 0, 'Overlay is deleted');
    equal($('.confirmon-box').length, 0, 'Box is deleted');
    
    

});


test('click confirmOn (2 args) attached button with data and click yes', 4, function() {
    var $fixture = createButtonFixture();    
    $fixture.confirmOn('click', {dataA:'MyData', dataB:'MoreData'}, function(event) {
        equal(event.data.dataA, 'MyData', 'Data is passed correctly to handler');
        equal(event.data.dataB, 'MoreData', 'Data is passed correctly to handler');
    });

    //Click button to trigger the confirmation box
    $fixture.trigger('click');

    //Click yes
    $('.confirmon-box button').eq(0).trigger('click');
    
    //Make sure that both overlay and box are deleted
    equal($('.confirmon-overlay').length, 0, 'Overlay is deleted');
    equal($('.confirmon-box').length, 0, 'Box is deleted');

});

test('click confirmOn (2 args) attached link and click yes', 3, function() {
    var $fixture = createLinkFixture();    
    $fixture.confirmOn('click', function() {
        ok(true, 'Handler for \'yes\' called');
    });

    //Click button to trigger the confirmation box
    $fixture.trigger('click');
    equal($('.confirmon-overlay').is(':visible'), true, 'Overlay is visible');
    equal($('.confirmon-box').is(':visible'), true, 'Box is visible');

    //Click yes
    $('.confirmon-box button').eq(0).trigger('click');

});

test('options are unique per confirmOn attachment', 3, function() {
    var $fixture_1 = createButtonFixture(),
        $fixture_2 = createButtonFixture(),
        $fixture_3 = createButtonFixture();

    $fixture_1.confirmOn('click', function(){
    });
    
    $fixture_2.confirmOn({
        questionText: 'This cannot be undone, are you absolutely sure?'
    }, 'click', function(){
    });
    
    $fixture_3.confirmOn('click', function(){
    });

    $fixture_1.trigger('click');
    equal($('.confirmon-box p').html(), 'Are you sure?', 'Questiontext is the default');
    $('.confirmon-box button').eq(1).trigger('click');
    
    $fixture_2.trigger('click');
    equal($('.confirmon-box p').html(), 'This cannot be undone, are you absolutely sure?', 'Questiontext is following option text');
    $('.confirmon-box button').eq(1).trigger('click');
    
    $fixture_3.trigger('click');
    equal($('.confirmon-box p').html(), 'Are you sure?', 'Questiontext is the default');
    $('.confirmon-box button').eq(1).trigger('click');
    
});

/*****************************************************
 * 
 * Helper functions
 * 
 */
function createButtonFixture() {
    return $('<button/>').appendTo('#qunit-fixture');
}

function createLinkFixture() {
    return $('<a/>').appendTo('#qunit-fixture');
}

function removeOverlaysAndBoxes() {
    $('div').each(function() {
        var classAttr = $(this).attr('class');
        if (typeof classAttr === 'string') {
            if (classAttr.substr(-8, 8) === '-overlay' || classAttr.substr(-4, 4) === '-box') {
                $(this).remove();
            }
        }
    });
}
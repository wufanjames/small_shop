jQuery-confirmOn
=================

A jQuery plugin for adding an easy 'are you sure' confirmation pop-up before the handler in .on() is called.

##What does this plugin?

The confirmOn plugin shows a confirmation box when the provided events are triggered. It works exactly like jQuery's .on() but with a confirmation step between the event and the handler. When the user clicks *yes* the handler is called, when the user clicks *no* then the confirmation box hides itself and nothing else happens.

![Example of confirmation box](http://www.invetek.nl/wp-content/uploads/2013/09/example_1.png)

##Installing

Grab jquery.confirmon.js from the repository and insert the following line _after_ the jQuery script in your code:
```html
<script src="jquery.ajaxstartdelay.js"></script>
```

That's all.

Maybe you want to use the stylesheet that creates a screenwide overlay and a centered box. No problem, just
add jquery.confirmon.css to your html.

```html
<link rel="stylesheet" type="text/css" href="jquery.confirmon.css"/>
```

Since there are only a few classes involved you can insert the classes into your existing stylesheet for performance sake.

##Usage

Use .confirmOn() the same way as you use jQuery's .on(). Check http://api.jquery.com/on/ for the documentation.

There are some options that can be set to customize the plugin. Add them as the first argument of .confirmOn().

```javascript
{
  questionText: 'Are you sure?', // The confirmation question
  classPrepend: 'confirmon', // Use another prefix before the classes used by the plugin
  textYes: 'Yes', // Text on the button the user clicks when the handler should be called 
  textNo: 'No' // Text on the button the user clicks when the handler should not be called
}
```

##Example
```javascript
$('#myButton').confirmOn('click', function(){
    deleteSomethingImportant();
})
```
When #myButton is clicked, this confirmation box pops up:<br>
![Screenshot of a confirmation box](/doc/screenshot_1.png)


Check out this [live](http://www.invetek.nl/samples/confirmon/index.html) sample (and its [source](sample)).



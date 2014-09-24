jquery-fitText
==============

JQuery plugin to adjust the size of text to the width of a container.


## Installation

Include script *after* the jQuery library (unless you are packaging scripts somehow else):

```html
<script src="/path/to/jquery.fitText.min.js"></script>
```

## Usage

Simple usage:

```javascript
$('.tofit').fitText();
```

Using px insteed of em

```javascript
$('.tofit').fitText({
    unit: 'px'
});
```

Always fit text to container size:

```javascript
$('.tofit').fitText({
    type: 'both'
});
```

## Options

Global options can be set by overriding `$.fitText.defaultOptions` object

### unit

    unit: 'em'

Define unit used to set the new font size of container.
Values: 'em', '%', 'px'

### type

    type: 'smaller'

Define type of fit used for container. 
Values: 'smaller' (container is smaller than text), 'greater' (container is greater than text), 'both'

### precision

    precision: 0.1

Define witch precision is used to fix "em" and "%" size. (for optimisation)

### precisionIteration
    
    precisionIteration: 1000

Define max iteration to fix "em" and "%" size. (for optimisation)

### smooth

    smooth: true

Enable a fade in effect on new font size affectation.


### smoothDuration
    
    smoothDuration: 200

Fade in effect duration. 

## Authors

[Matthias Toscanelli](https://github.com/codesource)
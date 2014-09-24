/*!
 * jQuery fitText Plugin v1.0.0
 * https://github.com/codesource/jquery-fitText
 *
 * Copyright 2014 Matthias Toscanelli
 * Released under the GNU GENERAL PUBLIC LICENSE
 */
(function($) {

    var fitText = function(el, options) {
        var _this = $(el);

        if ($.type(options) === 'string') {
            if (options === 'resize') {
                var opts = _this.data('fitText-options');
                if (!opts) {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            var opts = $.extend({}, $.fitText.defaultOptions, options);
            // fix unit
            if ($.inArray(opts.unit, ['em', 'px', '%']) === -1) {
                opts.unit = $.inArray($.fitText.defaultOptions.unit, ['em', 'px', '%']) === -1 ? $.fitText.defaultOptions.unit : 'em'; // set to default
            }

            // Store options for resize
            _this.data('fitText-options', opts);
        }
        var paddings = (parseFloat(_this.css('padding-left')) || 0) + (parseFloat(_this.css('padding-right')) || 0);
        var hiddenAtStart = !_this.is(':visible');
        if (hiddenAtStart) {
            _this.data('fitText-initialStyle', _this.attr('style') || '');
            _this.css({
                margin: 0,
                maxHeight: 0,
                minHeight: 0,
                height: 0,
                visibility: 'hidden'
            }).show();
        }
        var innerWidth = _this.innerWidth() - paddings;
        if (innerWidth > 0) {
            var fontSize = _this.data('fitText-initialFontSize');
            if (fontSize) {
                _this.css('font-size', fontSize);
            } else {
                fontSize = parseFloat(_this.css("font-size")) || 0;
            }
            if (fontSize <= 0) {
                if (hiddenAtStart) {
                    _this.attr('style', _this.data('fitText-initialStyle'));
                }
                return false;
            }
            var clone = _this.clone().css({
                display: 'block',
                opacity: 0,
                position: 'absolute',
                visibility: 'hidden',
                whiteSpace: 'nowrap',
                width: 'auto'
            });
            _this.after(clone);
            var newFontSize = null;
            var percentage = innerWidth / (clone.innerWidth() - paddings);
            if ((opts.type === 'smaller' && percentage < 1) || (opts.type === 'greater' && percentage > 1) || opts.type === 'both') {
                if (opts.unit === 'px') {
                    newFontSize = Math.floor(fontSize * percentage);
                } else {
                    var parentFontSize = parseFloat(_this.parent().css("font-size")) || 0;
                    if (parentFontSize <= 0) {
                        if (hiddenAtStart) {
                            _this.attr('style', _this.data('fitText-initialStyle'));
                        }
                        return false;
                    }
                    var fontSizeRatio = fontSize / parentFontSize * percentage * 98;

                    // fix ratio
                    clone.css('font-size', fontSizeRatio + '%');
                    var limit = parseInt(opts.precisionIteration, 10) || 10;
                    var precision = parseFloat(opts.precision) || 0.1;
                    var previousFontSizeRatio = fontSizeRatio;
                    if (clone.innerWidth() - paddings > innerWidth) {
                        while (limit > 0 && clone.innerWidth() - paddings >= innerWidth) {
                            previousFontSizeRatio -= precision;
                            clone.css('font-size', previousFontSizeRatio + '%');
                            limit--;
                        }
                    } else if (clone.innerWidth() - paddings < innerWidth) {
                        while (limit > 0 && clone.innerWidth() - paddings < innerWidth) {
                            previousFontSizeRatio = fontSizeRatio;
                            fontSizeRatio += precision;
                            clone.css('font-size', fontSizeRatio + '%');
                            limit--;
                        }
                    }
                    fontSizeRatio = previousFontSizeRatio;

                    newFontSize = opts.unit === 'em' ? fontSizeRatio / 100 : fontSizeRatio;

                }
            }
            if (hiddenAtStart) {
                _this.attr('style', _this.data('fitText-initialStyle'));
            }
            if (newFontSize !== null) {
                if (opts.smooth && !hiddenAtStart) {
                    _this.css('opacity', 0);
                    _this.css('font-size', newFontSize + opts.unit);
                    _this.animate({
                        'opacity': 1
                    }, opts.smoothDuration);
                } else {
                    _this.css('font-size', newFontSize + opts.unit);
                }
                _this.data('fitText-initialFontSize', fontSize);
            }
            clone.remove();
        }
    };

    $.fitText = {
        defaultOptions: {
            unit: 'em', // available units: em,px,%  (em and % will in relation to parent)

            type: 'smaller', // available type of fit: 
            //  - smaller (only if box is smaller than text size)
            //  - greater (only if box is greater than text size)
            //  - both (always fit text to box)

            precision: 0.1, // precision for em and % fix
            precisionIteration: 1000, // number of precision iteration

            smooth: true, // Use a fade in effect on font-size change
            smoothDuration: 200     // Fade in animation duration
        }
    };

    $.fn.fitText = function(options) {
        return $(this).each(function() {
            fitText(this, options);
        });
    };
})(jQuery);


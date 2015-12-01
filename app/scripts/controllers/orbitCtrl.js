angular.module('solidairesApp').controller('orbitCtrl', function(){
    function orbitTest () {
        /*
         * Foundation Responsive Library
         * http://foundation.zurb.com
         * Copyright 2014, ZURB
         * Free to use under the MIT license.
         * http://www.opensource.org/licenses/mit-license.php
         */

        (function ($, window, document, undefined) {
            'use strict';

            var header_helpers = function (class_array) {
                var i = class_array.length;
                var head = $('head');

                while (i--) {
                    if(head.has('.' + class_array[i]).length === 0) {
                        head.append('<meta class="' + class_array[i] + '" />');
                    }
                }
            };

            header_helpers([
                'foundation-mq-small',
                'foundation-mq-medium',
                'foundation-mq-large',
                'foundation-mq-xlarge',
                'foundation-mq-xxlarge',
                'foundation-data-attribute-namespace']);

            // Enable FastClick if present

            $(function() {
                if (typeof FastClick !== 'undefined') {
                    // Don't attach to body if undefined
                    if (typeof document.body !== 'undefined') {
                        FastClick.attach(document.body);
                    }
                }
            });

            // private Fast Selector wrapper,
            // returns jQuery object. Only use where
            // getElementById is not available.
            var S = function (selector, context) {
                if (typeof selector === 'string') {
                    if (context) {
                        var cont;
                        if (context.jquery) {
                            cont = context[0];
                            if (!cont) return context;
                        } else {
                            cont = context;
                        }
                        return $(cont.querySelectorAll(selector));
                    }

                    return $(document.querySelectorAll(selector));
                }

                return $(selector, context);
            };

            // Namespace functions.

            var attr_name = function (init) {
                var arr = [];
                if (!init) arr.push('data');
                if (this.namespace.length > 0) arr.push(this.namespace);
                arr.push(this.name);

                return arr.join('-');
            };

            var add_namespace = function (str) {
                var parts = str.split('-'),
                    i = parts.length,
                    arr = [];

                while (i--) {
                    if (i !== 0) {
                        arr.push(parts[i]);
                    } else {
                        if (this.namespace.length > 0) {
                            arr.push(this.namespace, parts[i]);
                        } else {
                            arr.push(parts[i]);
                        }
                    }
                }

                return arr.reverse().join('-');
            };

            // Event binding and data-options updating.

            var bindings = function (method, options) {
                var self = this,
                    should_bind_events = !S(this).data(this.attr_name(true));


                if (S(this.scope).is('[' + this.attr_name() +']')) {
                    S(this.scope).data(this.attr_name(true) + '-init', $.extend({}, this.settings, (options || method), this.data_options(S(this.scope))));

                    if (should_bind_events) {
                        this.events(this.scope);
                    }

                } else {
                    S('[' + this.attr_name() +']', this.scope).each(function () {
                        var should_bind_events = !S(this).data(self.attr_name(true) + '-init');
                        S(this).data(self.attr_name(true) + '-init', $.extend({}, self.settings, (options || method), self.data_options(S(this))));

                        if (should_bind_events) {
                            self.events(this);
                        }
                    });
                }
                // # Patch to fix #5043 to move this *after* the if/else clause in order for Backbone and similar frameworks to have improved control over event binding and data-options updating.
                if (typeof method === 'string') {
                    return this[method].call(this, options);
                }

            };

            var single_image_loaded = function (image, callback) {
                function loaded () {
                    callback(image[0]);
                }

                function bindLoad () {
                    this.one('load', loaded);

                    if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
                        var src = this.attr( 'src' ),
                            param = src.match( /\?/ ) ? '&' : '?';

                        param += 'random=' + (new Date()).getTime();
                        this.attr('src', src + param);
                    }
                }

                if (!image.attr('src')) {
                    loaded();
                    return;
                }

                if (image[0].complete || image[0].readyState === 4) {
                    loaded();
                } else {
                    bindLoad.call(image);
                }
            };

            /*
             https://github.com/paulirish/matchMedia.js
             */

            window.matchMedia = window.matchMedia || (function( doc ) {

                "use strict";

                var bool,
                    docElem = doc.documentElement,
                    refNode = docElem.firstElementChild || docElem.firstChild,
                // fakeBody required for <FF4 when executed in <head>
                    fakeBody = doc.createElement( "body" ),
                    div = doc.createElement( "div" );

                div.id = "mq-test-1";
                div.style.cssText = "position:absolute;top:-100em";
                fakeBody.style.background = "none";
                fakeBody.appendChild(div);

                return function (q) {

                    div.innerHTML = "&shy;<style media=\"" + q + "\"> #mq-test-1 { width: 42px; }</style>";

                    docElem.insertBefore( fakeBody, refNode );
                    bool = div.offsetWidth === 42;
                    docElem.removeChild( fakeBody );

                    return {
                        matches: bool,
                        media: q
                    };

                };

            }( document ));

            /*
             * jquery.requestAnimationFrame
             * https://github.com/gnarf37/jquery-requestAnimationFrame
             * Requires jQuery 1.8+
             *
             * Copyright (c) 2012 Corey Frang
             * Licensed under the MIT license.
             */

            (function($) {

                // requestAnimationFrame polyfill adapted from Erik Möller
                // fixes from Paul Irish and Tino Zijdel
                // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
                // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

                var animating,
                    lastTime = 0,
                    vendors = ['webkit', 'moz'],
                    requestAnimationFrame = window.requestAnimationFrame,
                    cancelAnimationFrame = window.cancelAnimationFrame,
                    jqueryFxAvailable = 'undefined' !== typeof jQuery.fx;

                for (; lastTime < vendors.length && !requestAnimationFrame; lastTime++) {
                    requestAnimationFrame = window[ vendors[lastTime] + "RequestAnimationFrame" ];
                    cancelAnimationFrame = cancelAnimationFrame ||
                        window[ vendors[lastTime] + "CancelAnimationFrame" ] ||
                        window[ vendors[lastTime] + "CancelRequestAnimationFrame" ];
                }

                function raf() {
                    if (animating) {
                        requestAnimationFrame(raf);

                        if (jqueryFxAvailable) {
                            jQuery.fx.tick();
                        }
                    }
                }

                if (requestAnimationFrame) {
                    // use rAF
                    window.requestAnimationFrame = requestAnimationFrame;
                    window.cancelAnimationFrame = cancelAnimationFrame;

                    if (jqueryFxAvailable) {
                        jQuery.fx.timer = function (timer) {
                            if (timer() && jQuery.timers.push(timer) && !animating) {
                                animating = true;
                                raf();
                            }
                        };

                        jQuery.fx.stop = function () {
                            animating = false;
                        };
                    }
                } else {
                    // polyfill
                    window.requestAnimationFrame = function (callback) {
                        var currTime = new Date().getTime(),
                            timeToCall = Math.max(0, 16 - (currTime - lastTime)),
                            id = window.setTimeout(function () {
                                callback(currTime + timeToCall);
                            }, timeToCall);
                        lastTime = currTime + timeToCall;
                        return id;
                    };

                    window.cancelAnimationFrame = function (id) {
                        clearTimeout(id);
                    };

                }

            }( jQuery ));


            function removeQuotes (string) {
                if (typeof string === 'string' || string instanceof String) {
                    string = string.replace(/^['\\/"]+|(;\s?})+|['\\/"]+$/g, '');
                }

                return string;
            }

            window.Foundation = {
                name : 'Foundation',

                version : '{{VERSION}}',

                media_queries : {
                    small : S('.foundation-mq-small').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
                    medium : S('.foundation-mq-medium').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
                    large : S('.foundation-mq-large').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
                    xlarge: S('.foundation-mq-xlarge').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
                    xxlarge: S('.foundation-mq-xxlarge').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, '')
                },

                stylesheet : $('<style></style>').appendTo('head')[0].sheet,

                global: {
                    namespace: undefined
                },

                init : function (scope, libraries, method, options, response) {
                    var args = [scope, method, options, response],
                        responses = [];

                    // check RTL
                    this.rtl = /rtl/i.test(S('html').attr('dir'));

                    // set foundation global scope
                    this.scope = scope || this.scope;

                    this.set_namespace();

                    if (libraries && typeof libraries === 'string' && !/reflow/i.test(libraries)) {
                        if (this.libs.hasOwnProperty(libraries)) {
                            responses.push(this.init_lib(libraries, args));
                        }
                    } else {
                        for (var lib in this.libs) {
                            responses.push(this.init_lib(lib, libraries));
                        }
                    }

                    S(window).load(function(){
                        S(window)
                            .trigger('resize.fndtn.clearing')
                            .trigger('resize.fndtn.dropdown')
                            .trigger('resize.fndtn.equalizer')
                            .trigger('resize.fndtn.interchange')
                            .trigger('resize.fndtn.joyride')
                            .trigger('resize.fndtn.magellan')
                            .trigger('resize.fndtn.topbar')
                            .trigger('resize.fndtn.slider');
                    });

                    return scope;
                },

                init_lib : function (lib, args) {
                    if (this.libs.hasOwnProperty(lib)) {
                        this.patch(this.libs[lib]);

                        if (args && args.hasOwnProperty(lib)) {
                            if (typeof this.libs[lib].settings !== 'undefined') {
                                $.extend(true, this.libs[lib].settings, args[lib]);
                            }
                            else if (typeof this.libs[lib].defaults !== 'undefined') {
                                $.extend(true, this.libs[lib].defaults, args[lib]);
                            }
                            return this.libs[lib].init.apply(this.libs[lib], [this.scope, args[lib]]);
                        }

                        args = args instanceof Array ? args : new Array(args);    // PATCH: added this line
                        return this.libs[lib].init.apply(this.libs[lib], args);
                    }

                    return function () {};
                },

                patch : function (lib) {
                    lib.scope = this.scope;
                    lib.namespace = this.global.namespace;
                    lib.rtl = this.rtl;
                    lib['data_options'] = this.utils.data_options;
                    lib['attr_name'] = attr_name;
                    lib['add_namespace'] = add_namespace;
                    lib['bindings'] = bindings;
                    lib['S'] = this.utils.S;
                },

                inherit : function (scope, methods) {
                    var methods_arr = methods.split(' '),
                        i = methods_arr.length;

                    while (i--) {
                        if (this.utils.hasOwnProperty(methods_arr[i])) {
                            scope[methods_arr[i]] = this.utils[methods_arr[i]];
                        }
                    }
                },

                set_namespace: function () {

                    // Description:
                    //    Don't bother reading the namespace out of the meta tag
                    //    if the namespace has been set globally in javascript
                    //
                    // Example:
                    //    Foundation.global.namespace = 'my-namespace';
                    // or make it an empty string:
                    //    Foundation.global.namespace = '';
                    //
                    //

                    // If the namespace has not been set (is undefined), try to read it out of the meta element.
                    // Otherwise use the globally defined namespace, even if it's empty ('')
                    var namespace = ( this.global.namespace === undefined ) ? $('.foundation-data-attribute-namespace').css('font-family') : this.global.namespace;

                    // Finally, if the namsepace is either undefined or false, set it to an empty string.
                    // Otherwise use the namespace value.
                    this.global.namespace = ( namespace === undefined || /false/i.test(namespace) ) ? '' : namespace;
                },

                libs : {},

                // methods that can be inherited in libraries
                utils : {

                    // Description:
                    //    Fast Selector wrapper returns jQuery object. Only use where getElementById
                    //    is not available.
                    //
                    // Arguments:
                    //    Selector (String): CSS selector describing the element(s) to be
                    //    returned as a jQuery object.
                    //
                    //    Scope (String): CSS selector describing the area to be searched. Default
                    //    is document.
                    //
                    // Returns:
                    //    Element (jQuery Object): jQuery object containing elements matching the
                    //    selector within the scope.
                    S : S,

                    // Description:
                    //    Executes a function a max of once every n milliseconds
                    //
                    // Arguments:
                    //    Func (Function): Function to be throttled.
                    //
                    //    Delay (Integer): Function execution threshold in milliseconds.
                    //
                    // Returns:
                    //    Lazy_function (Function): Function with throttling applied.
                    throttle : function (func, delay) {
                        var timer = null;

                        return function () {
                            var context = this, args = arguments;

                            if (timer == null) {
                                timer = setTimeout(function () {
                                    func.apply(context, args);
                                    timer = null;
                                }, delay);
                            }
                        };
                    },

                    // Description:
                    //    Executes a function when it stops being invoked for n seconds
                    //    Modified version of _.debounce() http://underscorejs.org
                    //
                    // Arguments:
                    //    Func (Function): Function to be debounced.
                    //
                    //    Delay (Integer): Function execution threshold in milliseconds.
                    //
                    //    Immediate (Bool): Whether the function should be called at the beginning
                    //    of the delay instead of the end. Default is false.
                    //
                    // Returns:
                    //    Lazy_function (Function): Function with debouncing applied.
                    debounce : function (func, delay, immediate) {
                        var timeout, result;
                        return function () {
                            var context = this, args = arguments;
                            var later = function () {
                                timeout = null;
                                if (!immediate) result = func.apply(context, args);
                            };
                            var callNow = immediate && !timeout;
                            clearTimeout(timeout);
                            timeout = setTimeout(later, delay);
                            if (callNow) result = func.apply(context, args);
                            return result;
                        };
                    },

                    // Description:
                    //    Parses data-options attribute
                    //
                    // Arguments:
                    //    El (jQuery Object): Element to be parsed.
                    //
                    // Returns:
                    //    Options (Javascript Object): Contents of the element's data-options
                    //    attribute.
                    data_options : function (el, data_attr_name) {
                        data_attr_name = data_attr_name || 'options';
                        var opts = {}, ii, p, opts_arr,
                            data_options = function (el) {
                                var namespace = Foundation.global.namespace;

                                if (namespace.length > 0) {
                                    return el.data(namespace + '-' + data_attr_name);
                                }

                                return el.data(data_attr_name);
                            };

                        var cached_options = data_options(el);

                        if (typeof cached_options === 'object') {
                            return cached_options;
                        }

                        opts_arr = (cached_options || ':').split(';');
                        ii = opts_arr.length;

                        function isNumber (o) {
                            return ! isNaN (o-0) && o !== null && o !== "" && o !== false && o !== true;
                        }

                        function trim (str) {
                            if (typeof str === 'string') return $.trim(str);
                            return str;
                        }

                        while (ii--) {
                            p = opts_arr[ii].split(':');
                            p = [p[0], p.slice(1).join(':')];

                            if (/true/i.test(p[1])) p[1] = true;
                            if (/false/i.test(p[1])) p[1] = false;
                            if (isNumber(p[1])) {
                                if (p[1].indexOf('.') === -1) {
                                    p[1] = parseInt(p[1], 10);
                                } else {
                                    p[1] = parseFloat(p[1]);
                                }
                            }

                            if (p.length === 2 && p[0].length > 0) {
                                opts[trim(p[0])] = trim(p[1]);
                            }
                        }

                        return opts;
                    },

                    // Description:
                    //    Adds JS-recognizable media queries
                    //
                    // Arguments:
                    //    Media (String): Key string for the media query to be stored as in
                    //    Foundation.media_queries
                    //
                    //    Class (String): Class name for the generated <meta> tag
                    register_media : function (media, media_class) {
                        if(Foundation.media_queries[media] === undefined) {
                            $('head').append('<meta class="' + media_class + '"/>');
                            Foundation.media_queries[media] = removeQuotes($('.' + media_class).css('font-family'));
                        }
                    },

                    // Description:
                    //    Add custom CSS within a JS-defined media query
                    //
                    // Arguments:
                    //    Rule (String): CSS rule to be appended to the document.
                    //
                    //    Media (String): Optional media query string for the CSS rule to be
                    //    nested under.
                    add_custom_rule : function (rule, media) {
                        if (media === undefined && Foundation.stylesheet) {
                            Foundation.stylesheet.insertRule(rule, Foundation.stylesheet.cssRules.length);
                        } else {
                            var query = Foundation.media_queries[media];

                            if (query !== undefined) {
                                Foundation.stylesheet.insertRule('@media ' +
                                    Foundation.media_queries[media] + '{ ' + rule + ' }');
                            }
                        }
                    },

                    // Description:
                    //    Performs a callback function when an image is fully loaded
                    //
                    // Arguments:
                    //    Image (jQuery Object): Image(s) to check if loaded.
                    //
                    //    Callback (Function): Function to execute when image is fully loaded.
                    image_loaded : function (images, callback) {
                        var self = this,
                            unloaded = images.length;

                        if (unloaded === 0) {
                            callback(images);
                        }

                        images.each(function () {
                            single_image_loaded(self.S(this), function () {
                                unloaded -= 1;
                                if (unloaded === 0) {
                                    callback(images);
                                }
                            });
                        });
                    },

                    // Description:
                    //    Returns a random, alphanumeric string
                    //
                    // Arguments:
                    //    Length (Integer): Length of string to be generated. Defaults to random
                    //    integer.
                    //
                    // Returns:
                    //    Rand (String): Pseudo-random, alphanumeric string.
                    random_str : function () {
                        if (!this.fidx) this.fidx = 0;
                        this.prefix = this.prefix || [(this.name || 'F'), (+new Date).toString(36)].join('-');

                        return this.prefix + (this.fidx++).toString(36);
                    }
                }
            };

            $.fn.foundation = function () {
                var args = Array.prototype.slice.call(arguments, 0);

                return this.each(function () {
                    Foundation.init.apply(Foundation, [this].concat(args));
                    return this;
                });
            };

        }(jQuery, window, window.document));
        (function ($, window, document, undefined) {
            'use strict';
            var noop = function () {
            };

            var Orbit = function (el, settings) {
                // Don't reinitialize plugin
                if (el.hasClass(settings.slides_container_class)) {
                    return this;
                }

                var self = this,
                    container,
                    slides_container = el,
                    number_container,
                    bullets_container,
                    timer_container,
                    idx = 0,
                    animate,
                    timer,
                    locked = false,
                    adjust_height_after = false;


                self.slides = function () {
                    return slides_container.children(settings.slide_selector);
                };

                self.slides().first().addClass(settings.active_slide_class);

                self.update_slide_number = function (index) {
                    if (settings.slide_number) {
                        number_container.find('span:first').text(parseInt(index) + 1);
                        number_container.find('span:last').text(self.slides().length);
                    }
                    if (settings.bullets) {
                        bullets_container.children().removeClass(settings.bullets_active_class);
                        $(bullets_container.children().get(index)).addClass(settings.bullets_active_class);
                    }
                };

                self.update_active_link = function (index) {
                    var link = $('[data-orbit-link="' + self.slides().eq(index).attr('data-orbit-slide') + '"]');
                    link.siblings().removeClass(settings.bullets_active_class);
                    link.addClass(settings.bullets_active_class);
                };

                self.build_markup = function () {
                    slides_container.wrap('<div class="' + settings.container_class + '"></div>');
                    container = slides_container.parent();
                    slides_container.addClass(settings.slides_container_class);

                    if (settings.stack_on_small) {
                        container.addClass(settings.stack_on_small_class);
                    }

                    if (settings.navigation_arrows) {
                        container.append($('<a href="#"><span></span></a>').addClass(settings.prev_class));
                        container.append($('<a href="#"><span></span></a>').addClass(settings.next_class));
                    }

                    if (settings.timer) {
                        timer_container = $('<div>').addClass(settings.timer_container_class);
                        timer_container.append('<span>');
                        timer_container.append($('<div>').addClass(settings.timer_progress_class));
                        timer_container.addClass(settings.timer_paused_class);
                        container.append(timer_container);
                    }

                    if (settings.slide_number) {
                        number_container = $('<div>').addClass(settings.slide_number_class);
                        number_container.append('<span></span> ' + settings.slide_number_text + ' <span></span>');
                        container.append(number_container);
                    }

                    if (settings.bullets) {
                        bullets_container = $('<ol>').addClass(settings.bullets_container_class);
                        container.append(bullets_container);
                        bullets_container.wrap('<div class="orbit-bullets-container"></div>');
                        self.slides().each(function (idx, el) {
                            var bullet = $('<li>').attr('data-orbit-slide', idx).on('click', self.link_bullet);
                            bullets_container.append(bullet);
                        });
                    }

                };

                self._goto = function (next_idx, start_timer) {
                    // if (locked) {return false;}
                    if (next_idx === idx) {
                        return false;
                    }
                    if (typeof timer === 'object') {
                        timer.restart();
                    }
                    var slides = self.slides();

                    var dir = 'next';
                    locked = true;
                    if (next_idx < idx) {
                        dir = 'prev';
                    }
                    if (next_idx >= slides.length) {
                        if (!settings.circular) return false;
                        next_idx = 0;
                    } else if (next_idx < 0) {
                        if (!settings.circular) return false;
                        next_idx = slides.length - 1;
                    }

                    var current = $(slides.get(idx));
                    var next = $(slides.get(next_idx));

                    current.css('zIndex', 2);
                    current.removeClass(settings.active_slide_class);
                    next.css('zIndex', 4).addClass(settings.active_slide_class);

                    slides_container.trigger('before-slide-change.fndtn.orbit');
                    settings.before_slide_change();
                    self.update_active_link(next_idx);

                    var callback = function () {
                        var unlock = function () {
                            idx = next_idx;
                            locked = false;
                            if (start_timer === true) {
                                timer = self.create_timer();
                                timer.start();
                            }
                            self.update_slide_number(idx);
                            slides_container.trigger('after-slide-change.fndtn.orbit', [
                                {slide_number: idx, total_slides: slides.length}
                            ]);
                            settings.after_slide_change(idx, slides.length);
                        };
                        if (slides_container.height() != next.height() && settings.variable_height) {
                            slides_container.animate({'height': next.height()}, 250, 'linear', unlock);
                        } else {
                            unlock();
                        }
                    };

                    if (slides.length === 1) {
                        callback();
                        return false;
                    }

                    var start_animation = function () {
                        if (dir === 'next') {
                            animate.next(current, next, callback);
                        }
                        if (dir === 'prev') {
                            animate.prev(current, next, callback);
                        }
                    };

                    if (next.height() > slides_container.height() && settings.variable_height) {
                        slides_container.animate({'height': next.height()}, 250, 'linear', start_animation);
                    } else {
                        start_animation();
                    }
                };

                self.next = function (e) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    self._goto(idx + 1);
                };

                self.prev = function (e) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    self._goto(idx - 1);
                };

                self.link_custom = function (e) {
                    e.preventDefault();
                    var link = $(this).attr('data-orbit-link');
                    if ((typeof link === 'string') && (link = $.trim(link)) != "") {
                        var slide = container.find('[data-orbit-slide=' + link + ']');
                        if (slide.index() != -1) {
                            self._goto(slide.index());
                        }
                    }
                };

                self.link_bullet = function (e) {
                    var index = $(this).attr('data-orbit-slide');
                    if ((typeof index === 'string') && (index = $.trim(index)) != "") {
                        if (isNaN(parseInt(index))) {
                            var slide = container.find('[data-orbit-slide=' + index + ']');
                            if (slide.index() != -1) {
                                self._goto(slide.index() + 1);
                            }
                        }
                        else {
                            self._goto(parseInt(index));
                        }
                    }

                }

                self.timer_callback = function () {
                    self._goto(idx + 1, true);
                }

                self.compute_dimensions = function () {
                    var current = $(self.slides().get(idx));
                    var h = current.height();
                    if (!settings.variable_height) {
                        self.slides().each(function () {
                            if ($(this).height() > h) {
                                h = $(this).height();
                            }
                        });
                    }
                    slides_container.height(h);
                };

                self.create_timer = function () {
                    var t = new Timer(
                        container.find('.' + settings.timer_container_class),
                        settings,
                        self.timer_callback
                    );
                    return t;
                };

                self.stop_timer = function () {
                    if (typeof timer === 'object') timer.stop();
                };

                self.toggle_timer = function () {
                    var t = container.find('.' + settings.timer_container_class);
                    if (t.hasClass(settings.timer_paused_class)) {
                        if (typeof timer === 'undefined') {
                            timer = self.create_timer();
                        }
                        timer.start();
                    }
                    else {
                        if (typeof timer === 'object') {
                            timer.stop();
                        }
                    }
                };

                self.init = function () {
                    self.build_markup();
                    if (settings.timer) {
                        timer = self.create_timer();
                        Foundation.utils.image_loaded(this.slides().children('img'), timer.start);
                    }
                    animate = new FadeAnimation(settings, slides_container);
                    if (settings.animation === 'slide')
                        animate = new SlideAnimation(settings, slides_container);

                    container.on('click', '.' + settings.next_class, self.next);
                    container.on('click', '.' + settings.prev_class, self.prev);

                    if (settings.next_on_click) {
                        container.on('click', '.' + settings.slides_container_class + ' [data-orbit-slide]', self.link_bullet);
                    }

                    container.on('click', self.toggle_timer);
                    if (settings.swipe) {
                        container.on('touchstart.fndtn.orbit', function (e) {
                            if (!e.touches) {
                                e = e.originalEvent;
                            }
                            var data = {
                                start_page_x: e.touches[0].pageX,
                                start_page_y: e.touches[0].pageY,
                                start_time: (new Date()).getTime(),
                                delta_x: 0,
                                is_scrolling: undefined
                            };
                            container.data('swipe-transition', data);
                            e.stopPropagation();
                        })
                            .on('touchmove.fndtn.orbit', function (e) {
                                if (!e.touches) {
                                    e = e.originalEvent;
                                }
                                // Ignore pinch/zoom events
                                if (e.touches.length > 1 || e.scale && e.scale !== 1) return;

                                var data = container.data('swipe-transition');
                                if (typeof data === 'undefined') {
                                    data = {};
                                }

                                data.delta_x = e.touches[0].pageX - data.start_page_x;

                                if (typeof data.is_scrolling === 'undefined') {
                                    data.is_scrolling = !!( data.is_scrolling || Math.abs(data.delta_x) < Math.abs(e.touches[0].pageY - data.start_page_y) );
                                }

                                if (!data.is_scrolling && !data.active) {
                                    e.preventDefault();
                                    var direction = (data.delta_x < 0) ? (idx + 1) : (idx - 1);
                                    data.active = true;
                                    self._goto(direction);
                                }
                            })
                            .on('touchend.fndtn.orbit', function (e) {
                                container.data('swipe-transition', {});
                                e.stopPropagation();
                            })
                    }
                    container.on('mouseenter.fndtn.orbit', function (e) {
                        if (settings.timer && settings.pause_on_hover) {
                            self.stop_timer();
                        }
                    })
                        .on('mouseleave.fndtn.orbit', function (e) {
                            if (settings.timer && settings.resume_on_mouseout) {
                                timer.start();
                            }
                        });

                    $(document).on('click', '[data-orbit-link]', self.link_custom);
                    $(window).on('load resize', self.compute_dimensions);
                    Foundation.utils.image_loaded(this.slides().children('img'), self.compute_dimensions);
                    Foundation.utils.image_loaded(this.slides().children('img'), function () {
                        container.prev('.' + settings.preloader_class).css('display', 'none');
                        self.update_slide_number(0);
                        self.update_active_link(0);
                        slides_container.trigger('ready.fndtn.orbit');
                    });
                };

                self.init();
            };

            var Timer = function (el, settings, callback) {
                var self = this,
                    duration = settings.timer_speed,
                    progress = el.find('.' + settings.timer_progress_class),
                    start,
                    timeout,
                    left = -1;

                this.update_progress = function (w) {
                    var new_progress = progress.clone();
                    new_progress.attr('style', '');
                    new_progress.css('width', w + '%');
                    progress.replaceWith(new_progress);
                    progress = new_progress;
                };

                this.restart = function () {
                    clearTimeout(timeout);
                    el.addClass(settings.timer_paused_class);
                    left = -1;
                    self.update_progress(0);
                };

                this.start = function () {
                    if (!el.hasClass(settings.timer_paused_class)) {
                        return true;
                    }
                    left = (left === -1) ? duration : left;
                    el.removeClass(settings.timer_paused_class);
                    start = new Date().getTime();
                    progress.animate({'width': '100%'}, left, 'linear');
                    timeout = setTimeout(function () {
                        self.restart();
                        callback();
                    }, left);
                    el.trigger('timer-started.fndtn.orbit')
                };

                this.stop = function () {
                    if (el.hasClass(settings.timer_paused_class)) {
                        return true;
                    }
                    clearTimeout(timeout);
                    el.addClass(settings.timer_paused_class);
                    var end = new Date().getTime();
                    left = left - (end - start);
                    var w = 100 - ((left / duration) * 100);
                    self.update_progress(w);
                    el.trigger('timer-stopped.fndtn.orbit');
                };
            };

            var SlideAnimation = function (settings, container) {
                var duration = settings.animation_speed;
                var is_rtl = ($('html[dir=rtl]').length === 1);
                var margin = is_rtl ? 'marginRight' : 'marginLeft';
                var animMargin = {};
                animMargin[margin] = '0%';

                this.next = function (current, next, callback) {
                    current.animate({marginLeft: '-100%'}, duration);
                    next.animate(animMargin, duration, function () {
                        current.css(margin, '100%');
                        callback();
                    });
                };

                this.prev = function (current, prev, callback) {
                    current.animate({marginLeft: '100%'}, duration);
                    prev.css(margin, '-100%');
                    prev.animate(animMargin, duration, function () {
                        current.css(margin, '100%');
                        callback();
                    });
                };
            };

            var FadeAnimation = function (settings, container) {
                var duration = settings.animation_speed;
                var is_rtl = ($('html[dir=rtl]').length === 1);
                var margin = is_rtl ? 'marginRight' : 'marginLeft';

                this.next = function (current, next, callback) {
                    next.css({'margin': '0%', 'opacity': '0.01'});
                    next.animate({'opacity': '1'}, duration, 'linear', function () {
                        current.css('margin', '100%');
                        callback();
                    });
                };

                this.prev = function (current, prev, callback) {
                    prev.css({'margin': '0%', 'opacity': '0.01'});
                    prev.animate({'opacity': '1'}, duration, 'linear', function () {
                        current.css('margin', '100%');
                        callback();
                    });
                };
            };


            Foundation.libs = Foundation.libs || {};

            Foundation.libs.orbit = {
                name: 'orbit',

                version: '{{VERSION}}',

                settings: {
                    animation: 'slide',
                    timer_speed: 10000,
                    pause_on_hover: true,
                    resume_on_mouseout: false,
                    next_on_click: true,
                    animation_speed: 500,
                    stack_on_small: false,
                    navigation_arrows: true,
                    slide_number: true,
                    slide_number_text: 'of',
                    container_class: 'orbit-container',
                    stack_on_small_class: 'orbit-stack-on-small',
                    next_class: 'orbit-next',
                    prev_class: 'orbit-prev',
                    timer_container_class: 'orbit-timer',
                    timer_paused_class: 'paused',
                    timer_progress_class: 'orbit-progress',
                    slides_container_class: 'orbit-slides-container',
                    preloader_class: 'preloader',
                    slide_selector: '*',
                    bullets_container_class: 'orbit-bullets',
                    bullets_active_class: 'active',
                    slide_number_class: 'orbit-slide-number',
                    caption_class: 'orbit-caption',
                    active_slide_class: 'active',
                    orbit_transition_class: 'orbit-transitioning',
                    bullets: true,
                    circular: true,
                    timer: true,
                    variable_height: false,
                    swipe: true,
                    before_slide_change: noop,
                    after_slide_change: noop
                },

                init: function (scope, method, options) {
                    var self = this;
                    this.bindings(method, options);
                },

                events: function (instance) {
                    var orbit_instance = new Orbit(this.S(instance), this.S(instance).data('orbit-init'));
                    this.S(instance).data(this.name + '-instance', orbit_instance);
                },

                reflow: function () {
                    var self = this;

                    if (self.S(self.scope).is('[data-orbit]')) {
                        var $el = self.S(self.scope);
                        var instance = $el.data(self.name + '-instance');
                        instance.compute_dimensions();
                    } else {
                        self.S('[data-orbit]', self.scope).each(function (idx, el) {
                            var $el = self.S(el);
                            var opts = self.data_options($el);
                            var instance = $el.data(self.name + '-instance');
                            instance.compute_dimensions();
                        });
                    }
                }
            };

            $(document).foundation({
                orbit: {
                    animation: 'slide', // Sets the type of animation used for transitioning between slides, can also be 'fade'
                    timer_speed: 6000, // Sets the amount of time in milliseconds before transitioning a slide
                    pause_on_hover: true, // Pauses on the current slide while hovering
                    resume_on_mouseout: true, // If pause on hover is set to true, this setting resumes playback after mousing out of slide
                    next_on_click: true, // Advance to next slide on click
                    animation_speed: 500, // Sets the amount of time in milliseconds the transition between slides will last
                    stack_on_small: false,
                    navigation_arrows: true,
                    slide_number: false,
                    slide_number_text: 'of',
                    container_class: 'orbit-container',
                    stack_on_small_class: 'orbit-stack-on-small',
                    next_class: 'orbit-next', // Class name given to the next button
                    prev_class: 'orbit-prev', // Class name given to the previous button
                    timer_container_class: 'orbit-timer', // Class name given to the timer
                    timer_paused_class: 'paused', // Class name given to the paused button
                    timer_progress_class: 'orbit-progress', // Class name given to the progress bar
                    slides_container_class: 'orbit-slides-container', // Class name given to the slide container
                    preloader_class: 'preloader', // Class given to the perloader
                    slide_selector: 'li', // Default is '*' which selects all children under the container
                    bullets_container_class: 'orbit-bullets',
                    bullets_active_class: 'active', // Class name given to the active bullet
                    slide_number_class: 'orbit-slide-number', // Class name given to the slide number
                    caption_class: 'orbit-caption', // Class name given to the caption
                    active_slide_class: 'active', // Class name given to the active slide
                    orbit_transition_class: 'orbit-transitioning',
                    bullets: false, // Does the slider have bullets visible?
                    circular: true, // Does the slider should go to the first slide after showing the last?
                    timer: true, // Does the slider have a timer active? Setting to false disables the timer.
                    variable_height: false, // Does the slider have variable height content?
                    swipe: true,
                    before_slide_change: noop, // Execute a function before the slide changes
                    after_slide_change: noop // Execute a function after the slide changes
                }
            });

        }(jQuery, window, window.document));
    }
    angular.element(document).ready(function () {
        orbitTest()
    });
});
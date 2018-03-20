var kam = kam || {};

kam.scrollToEl = function(selector, duration, easing, callback, offset) {
  var el = document.querySelector(selector);
  if (el) {
    kam.scrollTo(el, duration, easing, callback, offset)
  }
};

kam.scrollTo = function(destination, duration, easing, callback, offset) {
  duration = duration || 200;
  easing = easing || 'linear';
  offset = offset || 0;

  var easings = {
    linear: function(t) {
      return t;
    },
    easeInQuad: function(t) {
      return t * t;
    },
    easeOutQuad: function(t) {
      return t * (2 - t);
    },
    easeInOutQuad: function(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    easeInCubic: function(t) {
      return t * t * t;
    },
    easeOutCubic: function(t) {
      return (--t) * t * t + 1;
    },
    easeInOutCubic: function(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
    easeInQuart: function(t) {
      return t * t * t * t;
    },
    easeOutQuart: function(t) {
      return 1 - (--t) * t * t * t;
    },
    easeInOutQuart: function(t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
    },
    easeInQuint: function(t) {
      return t * t * t * t * t;
    },
    easeOutQuint: function(t) {
      return 1 + (--t) * t * t * t * t;
    },
    easeInOutQuint: function(t) {
      return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
    }
  };

  var start = window.pageYOffset;
  var startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

  var documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
  var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
  if (!destination) return;
  var destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
  var destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);
  destinationOffsetToScroll = destinationOffsetToScroll - offset;
  destinationOffsetToScroll = destinationOffsetToScroll < 0 ? 0 : destinationOffsetToScroll;

  if ('requestAnimationFrame' in window === false) {
    window.scroll(0, destinationOffsetToScroll);
    if (callback) {
      callback();
    }
    return;
  }

  function scroll() {
    var now = 'now' in window.performance ? performance.now() : new Date().getTime();
    var time = Math.min(1, ((now - startTime) / duration));
    var timeFunction = easings[easing](time);
    window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

    if (window.pageYOffset === destinationOffsetToScroll) {
      if (callback) {
        callback();
      }
      return;
    }

    requestAnimationFrame(scroll);
  }

  scroll();
};

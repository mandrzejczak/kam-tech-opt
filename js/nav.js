var kam = kam || {};

kam.nav = {
  init: function() {
    this.links = document.getElementsByClassName("js-nav")[0];
    this.clickHandler = this.clickHandler.bind(this);
    this.links.addEventListener('click', this.clickHandler);
    $('.hamburger')[0].addEventListener("click", this.collapse);
    $('#nav-overlay')[0].addEventListener("click", this.collapse);

    $(function () {
      $('.tlt').textillate({
        // the default selector to use when detecting multiple texts to animate
        selector: '.texts',

        // enable looping
        loop: true,

        // sets the minimum display time for each text before it is replaced
        minDisplayTime: 2000,

        // sets the initial delay before starting the animation
        // (note that depending on the in effect you may need to manually apply
        // visibility: hidden to the element before running this plugin)
        initialDelay: 0,

        // set whether or not to automatically start animating
        autoStart: true,

        // custom set of 'in' effects. This effects whether or not the
        // character is shown/hidden before or after an animation
        inEffects: [],

        // custom set of 'out' effects
        outEffects: [ 'fadeOut' ],

        // in animation settings
        in: {
          // set the effect name
          effect: 'fadeInLeft',

          // set the delay factor applied to each consecutive character
          delayScale: 1.5,

          // set the delay between each character
          delay: 35,

          // set to true to animate all the characters at the same time
          sync: false,

          // randomize the character sequence
          // (note that shuffle doesn't make sense with sync = true)
          shuffle: false,

          // reverse the character sequence
          // (note that reverse doesn't make sense with sync = true)
          reverse: false,

          // callback that executes once the animation has finished
          callback: function () {}
        },

        // out animation settings.
        out: {
          effect: 'fadeOutRight',
          delayScale: 1.5,
          delay: 35,
          sync: false,
          shuffle: false,
          reverse: false,
          callback: function () {}
        },

        // callback that executes once textillate has finished
        callback: function () {},

        // set the type of token to animate (available types: 'char' and 'word')
        type: 'char'
      });
    })
  },
  collapse: function() {
    if (window.innerWidth < 960) $('#nav')[0].classList.toggle("-open");
  },
  clickHandler: function(e) {
    this.collapse();
    if (!e.target.classList.contains('js-nav-link')) return;
    this.collapse();
    kam.scrollTo(
      document.getElementById(e.target.href.split('#')[1]),
      800,
      'easeInOutCubic',
      function() {},
      30
    );
  }
};

kam.nav.init();

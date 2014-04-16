var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-28001344-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

(function() {
  function Page() {
    this.skinny = window.innerWidth <= 1140;
  }

  Page.prototype.init = function() {
    var self = this;
    if (!this.skinny) self.setupHovers();
    $(window).resize(function() {self.onResize.call(self)});
    this.setupTabs();

    if (location.hash.length) {
      this.goToSection(location.hash.split('#')[1])
    }
  }

  Page.prototype.setupHovers = function () {
    $nav = $('#nav');
    $nav.on('mouseover', 'li', function(e) {
      var name = $(e.target).attr('id');
      $('#' + name + '-hover').removeClass('hidden');
    });
    $nav.on('mouseout', 'li', function(e) {
      var name = $(e.target).attr('id');
      $('#' + name + '-hover').addClass('hidden');
    })
  }

  Page.prototype.unsetupHovers = function() {
    $('#nav').off('mouseover mouseout');
  }

  Page.prototype.onResize = function() {
    var self = this;
    if (window.innerWidth > 1140) {
      this.skinny = false;
      var $sel = $('.selected');
      if ($sel[0]) {
        var sel_name  = $('.selected').attr('id');
        $('#triangle').addClass('at-' + sel_name).show();
      }
      $('#intro').addClass('at-top');
      self.setupHovers();
    } else {
      this.skinny = true;
      $('#triangle').addClass('hidden');
      self.unsetupHovers();
    }
  }

  Page.prototype.setupTabs = function() {
    var self = this;
    $('#nav').on('click', 'li', function(e) {
      if (!($(e.target).hasClass('selected'))) {
        var ename = $(e.target).attr('id');
        self.goToSection(ename);
        history.pushState(null, null, '#' + ename);
      }
    })
    window.addEventListener("popstate", function(e) {
      var hashSplits = location.hash.split('#');
      if (hashSplits[1]) {
        self.goToSection(hashSplits[1]);
      } else {
        console.log('go to inital')
        self.goToSection('initial')
      }
    });
  }

  Page.prototype.goToSection = function (section) {
    if (section == 'initial') {
      console.log('went to inital')
      $('.content-box').addClass('hidden');
      $('#triangle').addClass('hidden');
      $('#intro').removeClass('at-top');
    } else {
      $('.selected').removeClass('selected');
      $('#' + section).addClass('selected');
      $('.content-box').addClass('hidden');
      $('#' + section + '-box').removeClass('hidden');
      if (!this.skinny) {
        $intro = $('#intro');
        if (!$intro.hasClass('at-top')) {
          $intro.addClass('at-top')
        }
        $('#triangle').removeClass('hidden at-about at-work at-contact at-blog at-resume').addClass('at-' + section);
      }
    }
  }

  $(document).ready(function() {
    var p = new Page();
    p.init();
  })
})()
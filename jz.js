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
    this.boxWidth = '70%';
    this.skinny = window.innerWidth <= 1140;
    this.tabs = {
      'about': '35px',
      'work': '110px',
      'contact': '325px',
      'blog': '225px',
      'resume': '180px'
    };
  }

  Page.prototype.init = function() {
    var self = this;
    if (!this.skinny) self.setupHovers();
    $(window).resize(function() {self.onResize.call(self)});
    this.setupTabs();
  }

  Page.prototype.setupHovers = function () {
    $('#nav').on('mouseover', 'li', function(e) {
      var name = $(e.target).attr('id');
      $('#' + name + '-hover').show();
    });
    $('#nav').on('mouseout', 'li', function(e) {
      var name = $(e.target).attr('id');
      $('#' + name + '-hover').hide();
    })
  }

  Page.prototype.unsetupHovers = function() {
    $('#nav').off('mouseover mouseout');
  }

  Page.prototype.onResize = function() {
    var self = this;
    if (window.innerWidth > 1140) {
      this.skinny = false;
      var sel = $('.selected');
      if (sel[0]) {
        var sel_name  = $('.selected').attr('id');
        $('#triangle').css('top', self.tabs[sel_name]).show();
      }
      $('#intro').css('top', '0px');
      self.setupHovers();
    } else {
      this.skinny = true;
      $('#triangle').hide();
      self.unsetupHovers();
    }
  }

  Page.prototype.setupTabs = function() {
    var self = this;
    var tab_names = [];
    for (var k in self.tabs) tab_names.push(k);
    $('#nav').on('click', 'li', function(e) {
      if (!($(e.target).hasClass('selected'))) {
        var ename = $(e.target).attr('id');
        $('.selected').removeClass('selected');
        $(e.target).addClass('selected');
        for (var i = 0; i < tab_names.length; i++) {
          var tname = tab_names[i];
          if (tname === ename) {
            $('#' + tname + '-box').removeClass('hidden')
          } else {
            var $curr = $('#' + tname + '-box');
            if (!($curr.hasClass('hidden'))) {
              $curr.addClass('hidden');
            }
          }
        }
        if (!self.skinny) {
          $('#' + ename + '-box').css('width', '0');
          $('#triangle').css('display', 'block');
          if ($('#intro').css('top')!== '0px') {
            $('#intro').animate({top: '0px'},500)
          }
          $('#triangle').animate({marginTop:self.tabs[ename]}, 500);
          $('#' + ename + '-box').animate({width: self.boxWidth}, 500);
        }
      }
    })
  }

  $(document).ready(function() {
    var p = new Page();
    p.init();
  })
})()
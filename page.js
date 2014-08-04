$ = require('jquery')
SimplePage = require('./simple_page.js')

function Page() {
  this.SKINNY_LIMIT = 1140;
  this.skinny = window.innerWidth <= this.SKINNY_LIMIT;
}

Page.prototype = new SimplePage();

Page.prototype.constructor = Page;

Page.prototype.init = function() {
  SimplePage.prototype.init.call(this);

  if (location.hash.length) {
    $('#triangle').removeClass('hidden');
    this.goToSection(location.hash.split('#')[1])
    window.scrollTo(0, 0);
  }
}

Page.prototype.setupHovers = function () {
  SimplePage.prototype.setupHovers.call(this);
}

Page.prototype.unsetupHovers = function() {
  SimplePage.prototype.unsetupHovers.call(this);
}

Page.prototype.onResize = function() {
  var self = this;
  if (window.innerWidth > this.SKINNY_LIMIT) {
    this.skinny = false;
    var $sel = $('.selected');
    if ($sel[0]) {
      var sel_name  = $('.selected').attr('id');
      $('#triangle').addClass('at-' + sel_name);
    }
    $('#intro').addClass('at-top');
    self.setupHovers();
  } else {
    this.skinny = true;
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
      self.goToSection('initial')
    }
  });
}

Page.prototype.goToSection = function (section) {
  if (section == 'initial') {
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

module.exports = Page
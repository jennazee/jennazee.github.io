$ = require('jquery');

function SimplePage() {
  this.SKINNY_LIMIT = 1140;
  this.skinny = window.innerWidth <= this.SKINNY_LIMIT;
}

SimplePage.prototype.init = function() {
  var self = this;
  if (!this.skinny) self.setupHovers();
  $(window).resize(function() {self.onResize.call(self)});
  this.setupTabs();
}

SimplePage.prototype.onResize = function() {
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

SimplePage.prototype.setupHovers = function() {
  $nav = $('#nav');
  $hovers = $('.hover-tip');
  $nav.on('mouseover', 'li', function(e) {
    var name = $(e.target).attr('id');
    $('#' + name + '-hover').removeClass('hidden');
  });
  $nav.on('mouseout', 'li', function(e) {
    // so the hover doesn't flicker when you mouse over it! finally!
    if (!$(e.relatedTarget).hasClass('hover-tip')) {
      var name = $(e.target).attr('id');
      $('#' + name + '-hover').addClass('hidden');
    }
  });
  $hovers.on('mouseout', function(e) {
    $(e.target).closest('.hover-tip').addClass('hidden');
  });
}

SimplePage.prototype.unsetupHovers = function() {
  $('#nav').off('mouseover mouseout');
}

SimplePage.prototype.setupTabs = function() {
  var self = this;
  $('#nav').on('click', 'li', function(e) {
    var ename = $(e.target).attr('id');
    location.href = '/#' + ename;
  })
}

module.exports = SimplePage;

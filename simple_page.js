(function() {
  function SimplePage() {
    this.skinny = window.innerWidth <= 1140;
  }

  SimplePage.prototype.init = function() {
    var self = this;
    if (!this.skinny) self.setupHovers();
    $(window).resize(function() {self.onResize.call(self)});
  }

  SimplePage.prototype.onResize = function() {
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

  SimplePage.prototype.setupHovers = function () {
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

  SimplePage.prototype.unsetupHovers = function() {
    $('#nav').off('mouseover mouseout');
  }

  $(document).ready(function() {
    var p = new SimplePage();
    p.init();
  })
})()
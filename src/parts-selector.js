// partsSelector: a jQuery plugin for choosing items from a list.
//
// Sam Smith
//
// https://github.com/smth/parts-selector

$(function() {

  $.fn.partsSelector = function( options ) {

    // options
    var settings = $.extend({
      // defaults
      added: "Item added",
      removed: "Item removed"
    }, options );

    // use finderSelect for select classes
    this.find('ul').finderSelect({selectClass:'selected'});

    // selector
    // remove messages
    function removeMoved() {
      setTimeout(function(){
        $('.moved').removeClass('just');
        $( '.context.message' ).slideUp('1000');
      }, 1000);

      setTimeout(function(){
        $('.moved').removeClass('moved');
        $( '.context.message' ).remove();
      }, 2000);
    }

    // move items to parts list
    $('.moveto.parts').click(function() {
      $('.parts.list ul').append($('.selected.list li.selected').removeClass('selected').addClass('just moved').append( '<span class="context message">' + settings.removed + '</span>' ));
      removeMoved();
    });

    // move items to selected list
    $('.moveto.selected').click(function() {
      $('.selected.list ul').append($('.parts.list li.selected').removeClass('selected').addClass('just moved').append( '<span class="context message">' + settings.added + '</span>' ));
      removeMoved();
    });
  };

});

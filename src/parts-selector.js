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
      removed: "Item removed",
      noneSelected: "Click on items below to select them",
      itemButtons: false
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
    $(this).on('click', '.moveto.parts', function() {
      var $i = $(this).closest('.parts-selector');
      var $c = $($i).find('.selected.list li.selected').length;

      if ($c > 0) {
        $($i).find('.parts.list ul').append($($i).find('.selected.list li.selected').removeClass('selected').addClass('just moved').append( '<span class="context message">' + settings.removed + '</span>' ));
        removeMoved();
      } else {
        $($i).find('.selected.list ul').prepend('<span class="none-selected alert">' + settings.noneSelected + '</span>');
        setTimeout(function(){
          $( '.alert' ).slideUp('1000');

          setTimeout(function(){
            $( '.alert' ).remove();
          }, 1000);
        }, 3000);
      }
    });

    // move items to selected list
    $(this).on('click', '.moveto.selected', function() {
      var $i = $(this).closest('.parts-selector');
      var $c = $($i).find('.parts.list li.selected').length;

      if ($c > 0) {
        $($i).find('.selected.list ul').append($($i).find('.parts.list li.selected').removeClass('selected').addClass('just moved').append( '<span class="context message">' + settings.added + '</span>' ));
        removeMoved();
      } else {
        $($i).find('.parts.list ul').prepend('<span class="none-selected alert">' + settings.noneSelected + '</span>');
        setTimeout(function(){
          $( '.alert' ).slideUp('1000');

          setTimeout(function(){
            $( '.alert' ).remove();
          }, 1000);
        }, 3000);
      }
    });

    // item buttons
    if (settings.itemButtons == true) {
      // add buttons
      this.find('ul li').append( '<a class="add item-button"><span class="icon"></span><span class="text">Add</span></a>' );

      // change context button from add to remove
      function swapContextSelected( trigger ) {
        $(trigger).closest('.parts-selector').find('.selected.list ul').find( '.add.item-button' ).remove();
        $(trigger).closest('.parts-selector').find('.selected.list ul li.moved').append( '<a class="remove item-button"><span class="icon"></span><span class="text">Remove</span></a>' );
      }
      // change context button from remove to add
      function swapContextParts( trigger ) {
        $(trigger).closest('.parts-selector').find('.parts.list ul').find( '.remove.item-button' ).remove();
        $(trigger).closest('.parts-selector').find('.parts.list ul li.moved').append( '<a class="add item-button"><span class="icon"></span><span class="text">Add</span></a>' );
      }

      // move item from parts to selected
      $(this).on('click', '.parts.list li .add.item-button', function() {
        var $item = $(this).closest('li');
        $(this).closest('.parts-selector').find('.selected.list ul').append($($(this).closest('li')).addClass('just moved').append( '<span class="context message">' + settings.added + '</span>' ));
        removeMoved();
        swapContextSelected($item);
        $($item).removeClass('selected');
      });

      // swap context button
      $(this).on('click', '.moveto.selected', function() {
        swapContextSelected(this);
      });

      // move item from selected to parts
      $(this).on('click', '.selected.list li .remove.item-button', function() {
        var $item = $(this).closest('li');
        $(this).closest('.parts-selector').find('.parts.list ul').append($($(this).closest('li')).addClass('just moved').append( '<span class="context message">' + settings.removed + '</span>' ));
        removeMoved();
        swapContextParts($item);
        $($item).removeClass('selected');
      });

      // swap context button
      $(this).on('click', '.moveto.parts', function() {
        swapContextParts(this);
      });

    }
  };

});

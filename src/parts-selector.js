// parts-selector: Core code.
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
      itemButtons: false,
      callback: function() {}
    }, options );

    // use finderSelect for select classes
    var instance = this.find('ul').finderSelect({selectClass:'selected'});

    // when clicking anchors, don't select list item
    instance.on("mousedown","a", function(e){
      e.stopPropagation();
    });

    // do stuff after selecting
    instance.finderSelect('addHook','highlight:after', function() {
      var $i = $(instance).closest('.parts-selector');
      var $partsList = $($i).find('.parts.list');
      var $partsCount = $($partsList).find('li.selected').length;
      var $selectedList = $($i).find('.selected.list');
      var $selectedCount = $($selectedList).find('li.selected').length;

      // add classes
      if ($partsCount > 0) {
        $($i).addClass('parts-selected');
      }
      if ($selectedCount > 0) {
        $($i).addClass('selected-selected');
      }
    });

    // do stuff after deselecting
    instance.finderSelect('addHook','unHighlight:after', function() {
      var $i = $(instance).closest('.parts-selector');
      var $partsList = $($i).find('.parts.list');
      var $partsCount = $($partsList).find('li.selected').length;
      var $selectedList = $($i).find('.selected.list');
      var $selectedCount = $($selectedList).find('li.selected').length;

      // remove classes
      if ($partsCount < 1) {
        $($i).removeClass('parts-selected');
      }
      if ($selectedCount < 1) {
        $($i).removeClass('selected-selected');
      }
    });


    // selector
    // remove messages
    function removeMoved() {
      setTimeout(function(){
        $('.moved').removeClass('just');
        $( '.context.message' ).slideUp('1000', function() {
          $('.moved').removeClass('moved');
          $( '.context.message' ).remove();
        });
      }, 1000);
    }

    // clicking on remove button
    $(this).on('click', '.moveto.parts', function() {
      var $i = $(this).closest('.parts-selector');
      var $c = $($i).find('.selected.list li.selected').length;

      if ($c > 0) {
        // move items to parts list
        $($i).find('.parts.list ul').append($($i).find('.selected.list li.selected').removeClass('selected').addClass('just moved').append( '<span class="context message">' + settings.removed + '</span>' ));
        removeMoved();
        $($i).removeClass('selected-selected');
        settings.callback.call(this);
      } else {
        // show a message
        $($i).find('.selected.list ul').prepend('<span class="info alert">' + settings.noneSelected + '</span>');
        setTimeout(function(){
          $( '.alert' ).slideUp('1000', function() {
            $( '.alert' ).remove();
          });
        }, 3000);
      }
    });

    // clicking on add button
    $(this).on('click', '.moveto.selected', function() {
      var $i = $(this).closest('.parts-selector');
      var $c = $($i).find('.parts.list li.selected').length;

      if ($c > 0) {
        // move items to selected list
        $($i).find('.selected.list ul').append($($i).find('.parts.list li.selected').removeClass('selected').addClass('just moved').append( '<span class="context message">' + settings.added + '</span>' ));
        removeMoved();
        $($i).removeClass('parts-selected');
        settings.callback.call(this);
      } else {
        // show a message
        $($i).find('.parts.list ul').prepend('<span class="info alert">' + settings.noneSelected + '</span>');
        setTimeout(function(){
          $( '.alert' ).slideUp('1000', function() {
            $( '.alert' ).remove();
          });
        }, 3000);
      }
    });

    // item buttons
    if (settings.itemButtons == true) {
      // add buttons
      this.find('.parts.list ul li').append( '<a class="add item-button"><span class="icon"></span><span class="text">Add</span></a>' );

      this.find('.selected.list ul li').append( '<a class="remove item-button"><span class="icon"></span><span class="text">Remove</span></a>' );

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
        var $i = $($item).closest('.parts-selector');
        // item
        $($i).find('.selected.list ul').append($($(this).closest('li')).addClass('just moved').append( '<span class="context message">' + settings.added + '</span>' ));
        // selected items
        $($i).find('.selected.list ul').append($($i).find('.parts.list li.selected').removeClass('selected').addClass('just moved').append( '<span class="context message">' + settings.added + '</span>' ));
        removeMoved();
        $($i).removeClass('parts-selected');
        swapContextSelected($item);
        $($item).removeClass('selected');
        settings.callback.call(this);
      });

      // swap context button
      $(this).on('click', '.moveto.selected', function() {
        swapContextSelected(this);
      });

      // move item from selected to parts
      $(this).on('click', '.selected.list li .remove.item-button', function() {
        var $item = $(this).closest('li');
        var $i = $($item).closest('.parts-selector');
        // item
        $($i).find('.parts.list ul').append($($(this).closest('li')).addClass('just moved').append( '<span class="context message">' + settings.removed + '</span>' ));
        // selected items
        $($i).find('.parts.list ul').append($($i).find('.selected.list li.selected').removeClass('selected').addClass('just moved').append( '<span class="context message">' + settings.removed + '</span>' ));
        removeMoved();
        $($i).removeClass('selected-selected');
        swapContextParts($item);
        $($item).removeClass('selected');
        settings.callback.call(this);
      });

      // swap context button
      $(this).on('click', '.moveto.parts', function() {
        swapContextParts(this);
      });

    }
  };

});

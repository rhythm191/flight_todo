/**
 * Todo リスト全体の描画に関するコンポーネント
 */

'use strict';

define(
	[
    'components/flight/lib/component',
    'components/mustache/mustache'
  ],

  function(defineComponent, Mustache) {
  	return defineComponent(todoItems);

  	function todoItems() {

  		this.defaultAttrs({
  			done: false
  		});

  		this.render = function(ev, items) {
        this.$node.html(Mustache.render($('#item-template').html(), {items: items.items}));
  		}


  		this.deleteTodo = function() {
  			this.$node.remove();
  			defineComponent.teardownAll();
  		}


  		this.after('initialize', function() {
  			this.on('deleteTodo', this.deleteTodo);
  			this.on(document, 'todoItemsChanged', this.render);
  		})
  	}


  }
)
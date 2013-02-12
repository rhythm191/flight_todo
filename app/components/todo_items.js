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
        rootClass: '.item',
        toggleButton: '.toggle',
        editButton: 'label',
        editor: '.editor',
        edit: '.edit',
  			deleteButton: '.destroy'
  		});

  		this.render = function(ev, data) {
        this.$node.html(Mustache.render($('#item-template').html(), {items: data.items}));
  		}

      this.toggleDone = function(ev, data) {
        var $todo = $(data.el).parents(this.attr.rootClass);
        this.trigger(document, 'dataToggleTodo', {id: $todo.attr('id')});
      }

      this.editTodo = function(ev, data) {
        var $todo = $(data.el).parents(this.attr.rootClass);
        $todo.children().toggle();
        $todo.find(this.attr.edit).focus();
      }

      this.updateOnEnter = function(ev, data) {
        if (ev.keyCode != 13) return;
        var $todo = $(data.el).parents(this.attr.rootClass);
        if (!$todo.find(this.attr.edit).val()) return;

        this.trigger('dataUpdateTodo', {
          id: $todo.attr('id'),
          label: $todo.find(this.attr.edit).val()
        });

        $todo.children().toggle();
      }

  		this.deleteTodo = function(ev, data) {
  			var $todo = $(data.el).parents(this.attr.rootClass);
        this.trigger(document, 'dataDeleteTodo', {id: $todo.attr('id')});
  		}


  		this.after('initialize', function() {
        this.on( 'click', {
          toggleButton: this.toggleDone,
          deleteButton: this.deleteTodo
        });
  			this.on(document, 'uiItemsRender', this.render);
        this.on('dblclick', {editButton: this.editTodo});
        this.on('keypress', {edit: this.updateOnEnter});
  		})
  	}


  }
)
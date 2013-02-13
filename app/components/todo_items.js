/**
 * Todo リスト全体の描画に関するコンポーネント.
 *
 * Todoリストのデータが変更された場合に'uiItemsRender'イベントが発火するので，それを受け取ってレンダリングする.
 * ユーザからデータ更新のイベントが発生した場合は，idを付与してTodoデータを管理するコンポーネントへイベントを発火する.
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

      /**
       * Todoリストを画面に表示する.
       * 引数のdata.itemsに表示すべきTodoリストデータが格納されている.
       */
  		this.render = function(ev, data) {
        this.$node.html(Mustache.render($('#item-template').html(), {items: data.items}));
  		}

      /**
       * チェックボックスがクリックされたときの処理.
       * todoリストデータを管理するコンポーネントに対してidのデータを更新するようにイベント発火
       */
      this.toggleDone = function(ev, data) {
        var $todo = $(data.el).parents(this.attr.rootClass);
        this.trigger(document, 'dataToggleTodo', {id: $todo.attr('id')});
      }

      /**
       * Todoラベルがダブルクリックされたときの処理.
       * Todoラベルを隠して編集テキストボックスを表示するようにイベント発火
       */
      this.editTodo = function(ev, data) {
        var $todo = $(data.el).parents(this.attr.rootClass);
        $todo.children().toggle();
        $todo.find(this.attr.edit).focus();
      }

      /**
       * 編集テキストボックスでEnterが押されたときの処理.
       * todoリストデータを管理するコンポーネントに対してidのデータを更新するようにイベント発火
       */
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

      /**
       * 削除ボタンが押されたときの処理.
       * todoリストデータを管理するコンポーネントに対してidのデータを削除するようにイベント発火
       */
  		this.deleteTodo = function(ev, data) {
  			var $todo = $(data.el).parents(this.attr.rootClass);
        this.trigger(document, 'dataDeleteTodo', {id: $todo.attr('id')});
  		}


  		this.after('initialize', function() {
        // Todoリストのデータが変更された場合に'uiItemsRender'イベントが発火するので描画し直す
        this.on(document, 'uiItemsRender', this.render);

        // チェック，削除ボタンを押されたときの処理
        this.on( 'click', {
          toggleButton: this.toggleDone,
          deleteButton: this.deleteTodo
        });

        this.on('dblclick', {editButton: this.editTodo});
        this.on('keypress', {edit: this.updateOnEnter});
  		})
  	}


  }
)
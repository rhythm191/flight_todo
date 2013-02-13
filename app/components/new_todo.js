/**
 * 新しいTodoを追加するテキストボックスを管理するコンポーネント.
 * 
 * Todoが入力された場合，todoリストデータを管理するコンポーネントに対して
 * Todoデータを追加するようにイベント発火する.
 */

define(
	[
		'components/flight/lib/component'
	],

	function(defineComponent) {
		return defineComponent(newTodo);

		function newTodo() {

			// Todoデータへの一意のid値を管理する
			this.defaultAttrs({
				id: 0
			});

			/**
			 * Todo追加テキストボックスでEnterが入力されたときの処理.
			 * todoリストデータを管理するコンポーネントに対してTodoデータを追加するようにイベント発火
			 */
			this.createOnEnter = function(e) {
				if (e.keyCode != 13) return;
      	if (!this.$node.val()) return;

      	this.trigger(document, 'dataAddTodo', {
      		id: this.attr.id++,
      		label: this.$node.val(),
      		done: false
      	});
      	this.$node.val('');
			}

			this.after('initialize', function() {
				this.on('keypress', this.createOnEnter);
			})
		}
	}
)
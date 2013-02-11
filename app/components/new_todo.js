/**
 * 新しいTodoを追加するコンポーネント
 */

define(
	[
		'components/flight/lib/component'
	],

	function(defineComponent) {
		return defineComponent(newTodo);

		function newTodo() {

			this.createOnEnter = function(e) {
				if (e.keyCode != 13) return;
      	if (!this.$node.val()) return;

      	this.trigger('createNewTodo', {
      		label: this.$node.val(),
      		done: false
      	});
      	this.$node.val('');
			}

			this.addOne = function(ev, todo) {
				this.trigger(document, 'addOne', todo)
			}

			this.after('initialize', function() {
				this.on('keypress', this.createOnEnter);
				this.on('createNewTodo', this.addOne);
			})
		}
	}
)
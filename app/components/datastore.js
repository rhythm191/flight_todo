/**
 * Todoリストを管理するデータソース
 */

'use strict';

define(
	[
		'components/flight/lib/component'
	],

	function(defineComponent) {
		return defineComponent(datastore);

		function datastore() {

			this.defaultAttrs({
				items: []
			});

			this.render = function() {
				this.trigger(document, 'uiItemsRender', {items: this.attr.items});
			}

			this.addTodo = function(ev, data) {
				this.attr.items[this.attr.items.length] = data;
				this.trigger(document, 'dataChanged');
			};

			this.toggleTodo = function(ev, data) {
				this.attr.items.forEach(function(each) {
					if(each.id == data.id) {
						each.done = !each.done;
					}
				});
				this.trigger(document, 'dataChanged');
			}

			this.updateTodo = function(ev, data) {
				this.attr.items.forEach(function(each) {
					if(each.id == data.id) {
						each.label = data.label;
					}
				});
				this.trigger(document, 'dataChanged');
			}

			this.deleteTodo = function(ev, data) {
				this.attr.items = this.attr.items.filter(function(each) {
					return each.id != data.id
				});
				this.trigger(document, 'dataChanged');
			}


			this.after('initialize', function() {
				this.on(document, 'dataChanged', this.render);
				this.on(document, 'dataAddTodo', this.addTodo);
				this.on(document, 'dataToggleTodo', this.toggleTodo);
				this.on(document, 'dataUpdateTodo', this.updateTodo);
				this.on(document, 'dataDeleteTodo', this.deleteTodo);
			});
		}

	}
)
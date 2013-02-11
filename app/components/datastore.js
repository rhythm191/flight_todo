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

			this.addOne = function(ev, data) {
				this.attr.items[this.attr.items.length] = data;
				this.trigger(document, 'todoItemsChanged', {items: this.attr.items});
			};


			this.after('initialize', function() {
				this.on(document, 'addOne', this.addOne);
			});
		}

	}
)
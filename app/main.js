require.config({
	baseUrl: './'
});


require(
	[
	  'components/flight/lib/compose',
	  'components/flight/lib/registry',
	  'components/flight/lib/advice',
	  'components/flight/lib/logger',
	  'components/flight/tools/debug/debug'
	],

	function(compose, registry, advice, withLogging, debug) {
	  debug.enable(true);
	  compose.mixin(registry, [advice.withAdvice, withLogging]);
	  require(['app/boot'], function(initialize) {
	    initialize();
	  });
	}
);
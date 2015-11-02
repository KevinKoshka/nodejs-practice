//Test específico que comprueba la existencia de un link a Contact en About.
suite('"About" Page Tests', function(){
	test('page should contain link to contact page.', function(){
		assert($('a[href="/contact"]').length);
	});
});
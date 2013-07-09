Status.get(function(status) {

    var bagsPrefix = status.username;
    // This condition will only be met if hosted on tiddlyspace
    if(status.space) {
        bagsPrefix = status.space.name;
    }

    var public_bag = bagsPrefix + '_public';
    var $publicBagOutput = $('#public-bag-output');
    var $publicTiddlerOutput = $('#public-tiddler-output');
    var $searchOutput = $('#search-output');

    $('#fetch-public-bag').click(function () {

        var bag = new Bag(public_bag,
            function(tiddlers) {
                $.each(tiddlers, function(index, tiddler) {
                    $publicBagOutput.append('<li>' + tiddler.title + '</li>');
                });
            }
        );
        bag.get();
    });

    $('#fetch-public-tiddler').click(function () {
        var render = isRenderOptionChecked('#render-tiddler');

        var tiddler = new Tiddler(public_bag, $('#fetch-tiddler-title').val(),
            function(data) {
                if(render) {
                    $('#public-tiddler-output').html(data.render);
                } else {
                    $('#public-tiddler-output').html(data.text);
                }
            },
        null, render);
        tiddler.get();
    });

    $('#search').click(function() {
        Search.query($('#search-query').val(), function(results) {
            $.each(results, function(index, tiddler) {
                $searchOutput.append('<li>' + tiddler.title + '</li>');
            });
        }, null, isRenderOptionChecked('#search-render'));
    });

    $('#clear-public-bag').click(function() {
        $publicBagOutput.empty();
    });

    $('#clear-public-tiddler').click(function() {
        $publicTiddlerOutput.empty();
    });

    $('#clear-search').click(function() {
        $searchOutput.empty();
    });
});

function isRenderOptionChecked(selector) {
    var render = false;
    if($(selector).is(':checked')) {
        render = true;
    }
    return render;
}
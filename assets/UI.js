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
            },
             null, isRadioButtonSelected('#render-bag'),
            isRadioButtonSelected('#fat-bag')
        );
        bag.get();
    });

    $('#fetch-public-tiddler').click(function () {
        var render = isRadioButtonSelected('#render-tiddler');

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

    $('#create-tiddler').click(function() {
        var tags = $('#new-tiddler-tags').val().split(' ');

        var tiddler = new Tiddler(public_bag, $('#new-tiddler-title').val(), function() {
            alert("tiddler created");
        });
        tiddler.put({ text: $('#new-tiddler-text').val(), tags: tags });
    });

    $('#delete-tiddler').click(function() {

        var tiddler = new Tiddler(public_bag, $('#delete-tiddler-title').val(), function() {
            alert("tiddler deleted");
        });
        tiddler.delete();
    });

    $('#search').click(function() {
        Search.query($('#search-query').val(), function(results) {
            $.each(results, function(index, tiddler) {
                $searchOutput.append('<li>' + tiddler.title + '</li>');
            });
        }, null, isRadioButtonSelected('#search-render'), isRadioButtonSelected('#search-fat'));
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

    $('input[type="radio"]').change(function() {
        if($(this).hasClass('1')) {
            $('input.2').attr('checked', false);
        } else {
            $('input.1').attr('checked', false);
        }
    });
});

function isRadioButtonSelected(selector) {
    var optionSelected = false;
    if($(selector).is(':checked')) {
        optionSelected = true;
    }
    return optionSelected;
}
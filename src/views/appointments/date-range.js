
    
    var $extra_date = $('[data-js-extra-date]');
    var $end_date = $('[data-js-end-date]');
    var $start_date = $('[data-js-start-date]');

    
    $extra_date.Zebra_DatePicker();

    $end_date.Zebra_DatePicker({
        direction: 1,
        onClear: function(){
            extraOnChange();
            extraOnClear();
        },
        onSelect: function(val){
            extraOnChange();
            extraUpdate();      
        }
    });
    var dp_end = $end_date.data('Zebra_DatePicker');

    $start_date.Zebra_DatePicker({
        direction: true,
        pair: $end_date,
        onClear: function(){        
            endDateClear(true);
            dp_end.clear_date();

            extraOnChange();
            extraOnClear();
        },
        onSelect: function(val){
            endDateClear(false);
            extraOnChange();
            extraUpdate();
        }
    });

    
    function endDateClear(bool) {
        $end_date.prop('disabled', bool);
    }

    
    function extraOnClear(){
        $extra_date.each(function(){
            $(this).data('Zebra_DatePicker').clear_date();
        });
    }
    function extraUpdate(){
        $extra_date.each(function(){
            $(this).data('Zebra_DatePicker').clear_date();
            $(this).data('Zebra_DatePicker').update({
                direction: [$start_date.val(),$end_date.val()]
            });
        });
    }
    function extraOnChange(){
        if($start_date.val() !== '' && $end_date .val() !== ''){
            $extra_date.prop('disabled', false);
        }  else {
            $extra_date.prop('disabled', true);
        }
    }
    extraOnChange();
 
$(document).ready(function(){
    // Apply initial transformations to each layer to compensate for initial scroll position
    var initialWinPos = $(window).scrollTop();
    var initialCloudTransform = 'translate(0px,'+ (initialWinPos/16) +'px)'; // Adjusted division factor from 8 to 16 for cloud layer
    var initialBackgroundTransform = 'translate(0px,'+ (initialWinPos/24) +'px)'; // Adjusted division factor from 12 to 24 for background layer
    var initialDottedTransform = 'translate(-50%,'+ (initialWinPos/20) +'px)'; // Adjusted division factor from 10 to 20 for dotted layer
    var initialIslaTransform = 'translate(-50%,'+ (initialWinPos/12) +'px)'; // Adjusted division factor from 6 to 12 for isla layer
    var initialTxt1Transform = 'translate(-50%,'+ (initialWinPos/10) +'px)'; // Adjusted division factor from 5 to 10 for txt1 layer
    var initialTxt2Transform = 'translate(-50%,'+ (initialWinPos/8) +'px)'; // Adjusted division factor from 4 to 8 for txt2 layer
    
    $("#big-hero .layer.cloud").css({
        'transform': initialCloudTransform
    });
    $("#big-hero .layer.background").css({
        'transform': initialBackgroundTransform
    });
    $("#big-hero .layer.dotted").css({
        'transform': initialDottedTransform
    });
    $("#big-hero .layer.isla").css({
        'transform': initialIslaTransform
    });
    $("#big-hero .layer.txt1").css({
        'transform': initialTxt1Transform
    });
    $("#big-hero .layer.txt2").css({
        'transform': initialTxt2Transform
    });

    // Scroll event handler
    $(window).scroll(function(){
        var winPos = $(this).scrollTop();
        
        // Calculate transformations for each layer with smaller division factors
        var cloudTransform = 'translate(0px,'+ (winPos/10) +'px)'; // Adjusted division factor from 8 to 16 for cloud layer
        var backgroundTransform = 'translate(0px,'+ (winPos/24) +'px)'; // Adjusted division factor from 12 to 24 for background layer
        var dottedTransform = 'translate(-50%,'+ (winPos/20) +'px)'; // Adjusted division factor from 10 to 20 for dotted layer
        var islaTransform = 'translate(-50%,'+ (winPos/28) +'px)'; // Adjusted division factor from 6 to 12 for isla layer
        var txt1Transform = 'translate(-50%,'+ (winPos/8) +'px)'; // Adjusted division factor from 5 to 10 for txt1 layer
        var txt2Transform = 'translate(-50%,'+ (winPos/16) +'px)'; // Adjusted division factor from 4 to 8 for txt2 layer
        
        // Apply transformations to each layer
        $("#big-hero .layer.cloud").css({
            'transform': cloudTransform
        });
        $("#big-hero .layer.background").css({
            'transform': backgroundTransform
        });
        $("#big-hero .layer.dotted").css({
            'transform': dottedTransform
        });
        $("#big-hero .layer.isla").css({
            'transform': islaTransform
        });
        $("#big-hero .layer.txt1").css({
            'transform': txt1Transform
        });
        $("#big-hero .layer.txt2").css({
            'transform': txt2Transform
        });
    });
});

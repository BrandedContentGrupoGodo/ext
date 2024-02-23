$(document).ready(function(){
    // Function to check if the device is iPhone 7
    function isiPhone7() {
        // Check device width and height
        return window.innerWidth === 375 && window.innerHeight === 667;
    }

    // Apply initial transformations to each layer to compensate for initial scroll position
    var applyInitialTransformations = function() {
        var initialWinPos = $(window).scrollTop();
        var initialCloudTransform = 'translate(0px,'+ (initialWinPos/16) +'px)'; // Adjusted division factor from 8 to 16 for cloud layer
        var initialBackgroundTransform = 'translate(0px,'+ (initialWinPos/24) +'px)'; // Adjusted division factor from 12 to 24 for background layer
        var initialDottedTransform = 'translate(-50%,'+ (initialWinPos/20) +'px)'; // Adjusted division factor from 10 to 20 for dotted layer
        var initialIslaTransform = 'translate(-50%,'+ (initialWinPos/12) +'px)'; // Adjusted division factor from 6 to 12 for isla layer
        var initialTxt1Transform = 'translate(-50%,'+ (initialWinPos/10) +'px)'; // Adjusted division factor from 5 to 10 for txt1 layer
        var initialTxt2Transform = 'translate(-50%,'+ (initialWinPos/8) +'px)'; // Adjusted division factor from 4 to 8 for txt2 layer
        
        $("#big-hero .layer.cloud").css({ 'transform': initialCloudTransform });
        $("#big-hero .layer.background").css({ 'transform': initialBackgroundTransform });
        $("#big-hero .layer.dotted").css({ 'transform': initialDottedTransform });
        $("#big-hero .layer.txt1").css({ 'transform': initialTxt1Transform });
        $("#big-hero .layer.txt2").css({ 'transform': initialTxt2Transform });

        if (!isiPhone7()) {
            var initialIslaTransform = 'translate(-50%,'+ (initialWinPos/12) +'px)';
            $("#big-hero .layer.isla").css({ 'transform': initialIslaTransform });
        }
    };

    // Initial call to apply initial transformations
    applyInitialTransformations();

    // Scroll event handler
    $(window).scroll(function(){
        var winPos = $(this).scrollTop();
        
        var cloudTransform = 'translate(0px,'+ (winPos/10) +'px)';
        var backgroundTransform = 'translate(0px,'+ (winPos/24) +'px)';
        var dottedTransform = 'translate(-50%,'+ (winPos/20) +'px)';
        var txt1Transform = 'translate(-50%,'+ (winPos/8) +'px)';
        var txt2Transform = 'translate(-50%,'+ (winPos/16) +'px)';

        $("#big-hero .layer.cloud").css({ 'transform': cloudTransform });
        $("#big-hero .layer.background").css({ 'transform': backgroundTransform });
        $("#big-hero .layer.dotted").css({ 'transform': dottedTransform });
        $("#big-hero .layer.txt1").css({ 'transform': txt1Transform });
        $("#big-hero .layer.txt2").css({ 'transform': txt2Transform });

        if (!isiPhone7()) {
            var islaTransform = 'translate(-50%,'+ (winPos/12) +'px)';
            $("#big-hero .layer.isla").css({ 'transform': islaTransform });
        }
    });
});

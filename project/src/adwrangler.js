//This function configures and loads ads using cocoon.js 3.0.5
Ptero.adwrangler = (function() {

    //get the installed plugin instance
    var service = Cocoon.Ad;

    //multiplatform default configuration
    service.configure({
        ios: {
            interstitial:"use your mopub info",
            interstitialIpad:"use your mopub info",
        },
        android: {
            interstitial:"use your mopub info"
        }
    });

    function init() {createAdListeners(); Cocoon.Ad.loadInterstitial();}

    createAdListeners = function(){
        Cocoon.Ad.interstitial.on("ready", function(){
            console.log("interstitial on deck");
        });
        Cocoon.Ad.interstitial.on("shown", function(){
            console.log("onFullScreenShown");
        });
        Cocoon.Ad.interstitial.on("hidden", function(){
            console.log("onFullScreenHidden");
        });

    };

    return {
        init: init,
        createAdListeners: createAdListeners,
    }; 

})();
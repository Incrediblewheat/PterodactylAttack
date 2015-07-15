//This function configures and loads ads using cocoon.js 3.0.5
Ptero.adwrangler = (function() {

    //get the installed plugin instance
    var service = Cocoon.Ad;

    //multiplatform default configuration
    service.configure({
        ios: {
            interstitial:"dd4f3801738b47b9ac99161d6f6c9de2",
            interstitialIpad:"7f2db51d87484d56a28f3b42673de672",
        },
        android: {
            interstitial:"8ad5a21723f145e3bb6f56f2baa096de"
        }
    });

    var adState = {
        isHidden: false,
        ctx:null,
        fullScreenAdvertisement : null,
        fullScreenAlreadyDownloaded: false,
        params: {
            fullscreen : {
                "status" : null
            }
        }
    };

    function init() {createAdListeners(); Cocoon.Ad.loadInterstitial();}

    createAdListeners = function(){
        Cocoon.Ad.interstitial.on("ready", function(){
            adState.fullScreenAlreadyDownloaded = true;
            adState.params.fullscreen.status = "Full screen ready,";
            adState.params.fullscreen.sub_status = "press SHOW FULL SCREEN to watch the ad.";
            console.log("interstitial on deck");
        });
        Cocoon.Ad.interstitial.on("shown", function(){
            adState.params.fullscreen.status = "onFullScreenShown";
            adState.params.fullscreen.sub_status = "";
            console.log("onFullScreenShown");
        });
        Cocoon.Ad.interstitial.on("hidden", function(){
            console.log("onFullScreenHidden");
            adState.params.fullscreen.status = "Full screen hidden,";
            adState.params.fullscreen.sub_status = "press CACHE AD to download another ad.";
        });

    };

    return {
        init: init,
        createAdListeners: createAdListeners,
    }; 

})();
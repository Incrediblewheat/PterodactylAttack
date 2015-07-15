
Ptero.scene_credits = (function(){
//get the installed plugin instance
var service = Cocoon.Ad;

//multiplatform default configuration
service.configure({
    ios: {
         banner:"agltb3B1Yi1pbmNyDQsSBFNpdGUxxxxxxx",
         bannerIpad:"agltb3B1Yi1pbmNyDQsSBFNpdGUzzzzz", //optional
         interstitial:"agltb3B1Yi1pbmNyDQsSBFNpdGUyyyyyyy",
         interstitialIpad:"agltb3B1Yi1pbmNyDQsSBFNpdGUtttttt", //optional
    },
    android: {
         banner:"agltb3B1Yi1pbmNyDQsSBFNpdGUwwwwww",
         interstitial:"agltb3B1Yi1pbmNyDQsSBFNpdGUhhhhhh"
    }
});

//Create banner: optional AdUnit and BannerSize arguments
var banner = service.createBanner();

//Configure banner listeners
banner.on("load", function(){
   console.log("Banner loaded " + banner.width, banner.height);
   banner.show();
});

banner.on("fail", function(){
   console.log("Banner failed to load");
});

banner.on("show", function(){
   console.log("Banner shown a modal content");
});

banner.on("dismiss", function(){
   console.log("Banner dismissed the modal content");
});

banner.on("click", function(){
   console.log("Banner clicked");
});

 //load banner
banner.load();
/*
//Show or hide banner
banner.show();
banner.hide();

//Automatic banner layout
banner.setLayout(Cocoon.Ad.BannerLayout.TOP_CENTER);

//Custom banner layout
banner.setLayout(Cocoon.Ad.BannerLayout.CUSTOM);
banner.setPosition(x,y);
*/
//Create interstitial: optional AdUnit argument
var interstitial = service.createInterstitial();

//Configure interstitial listeners
interstitial.on("load", function(){
    console.log("Interstitial loaded");
});
interstitial.on("fail", function(){
    console.log("Interstitial failed");
});
interstitial.on("show", function(){
    console.log("Interstitial shown");
});
interstitial.on("dismiss", function(){
    console.log("Interstitial dismissed");
});

interstitial.on("click", function(){
    console.log("Interstitial clicked");
});

//load interstitial
interstitial.load();

//show interstitial
interstitial.show();
})();
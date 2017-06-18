window.onload = function(){ 
    document.querySelector("#nav-about").onclick = function(){
        positionOfElement = $('#about').offset().top - $('.navbar').height(); // Position of #about - nav height = correct position
        $("html, body").animate({scrollTop:positionOfElement}, '500', 'swing');
    };
    document.querySelector("#nav-education").onclick = function(){
        positionOfElement = $('#education').offset().top - $('.navbar').height(); // Position of #education - nav height = correct position
        $("html, body").animate({scrollTop:positionOfElement}, '500', 'swing');
    };
    document.querySelector("#nav-experience").onclick = function(){
        positionOfElement = $('#experience').offset().top - $('.navbar').height(); // Position of #experience - nav height = correct position
        $("html, body").animate({scrollTop:positionOfElement}, '500', 'swing');
    };
    document.querySelector("#nav-abilities").onclick = function(){
        positionOfElement = $('#abilities').offset().top - $('.navbar').height(); // Position of #abilities - nav height = correct position
        $("html, body").animate({scrollTop:positionOfElement}, '500', 'swing');
    };
};
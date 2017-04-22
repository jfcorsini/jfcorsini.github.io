window.onload = function(){ 
    document.querySelector("#nav-profile").onclick = function(){
    positionOfElement = $('#profile').offset().top - $('.navbar').height(); // Position of #profile - nav height = correct position
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
    document.querySelector("#nav-habilities").onclick = function(){
    positionOfElement = $('#habilities').offset().top - $('.navbar').height(); // Position of #habilities - nav height = correct position
    $("html, body").animate({scrollTop:positionOfElement}, '500', 'swing');
    };
};
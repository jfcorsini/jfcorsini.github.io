$(document).ready(function(){

    var menuIds = ["#menu-about", "#menu-projects", "#menu-experiences", "#menu-technologies"];
    var sectionIds = ["#about", "#projects", "#experiences", "#technologies"];

    for (let i = 0; i < menuIds.length; i++) {
        $(menuIds[i]).on('click', function (event) {
            toggleActiveInArrayAtPosition(menuIds, i);
        })
    }
          
    $("#content").scroll(function() {
        lastActiveId = 0;
        for (var i = 0; i < sectionIds.length; i++) {
            pos = $(sectionIds[i]).offset().top - 250;
            if (pos < 0 && lastActiveId <= i) {
                toggleActiveInArrayAtPosition(menuIds, i);
            }
        }
    });

    function toggleActiveInArrayAtPosition(arr, pos) {
        for (let i = 0; i < arr.length; i++) {
            if (i == pos) {
                $(arr[i]).addClass("active");
            } else {
                $(arr[i]).removeClass("active");
            }
        }
    }
});
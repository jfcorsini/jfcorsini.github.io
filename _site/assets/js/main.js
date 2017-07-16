$(document).ready(function(){

    var menuIds = ["#menu-about", "#menu-projects", "#menu-technologies"];
    var sectionIds = ["#about", "#projects", "#technologies"];

    for (let i = 0; i < menuIds.length; i++) {
        $(menuIds[i]).on('click', function (event) {
            toggleActiveInArrayAtPosition(menuIds, i);
        })
    }
          
    $("#content").scroll(function() {
        lastActiveId = 0;
        for (var i = 0; i < sectionIds.length; i++) {
            pos = $(sectionIds[i]).offset().top;
            if (pos < 0 && lastActiveId <= i) {
                toggleActiveInArrayAtPosition(menuIds, i);
            }
        }
    });

    function toggleActiveInArrayAtPosition(arr, pos) {
        for (let i = 0; i < arr.length; i++) {
            console.log(i, pos);
            if (i == pos) {
                $(arr[i]).addClass("active");
            } else {
                $(arr[i]).removeClass("active");
            }
        }
    }
});
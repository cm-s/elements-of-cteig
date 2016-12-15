function clear_styles(subject) {
    // Function to clear all animated styles from the object.
    // Setting them to '' removes them automatically.
    $(subject).css('top', '').css('left', '').css('height', '').css('width', '').css('margin', '').css('box-shadow', '');
};
function animate_sweep(subject) {
    clear_styles(subject);
    $(subject).animate({
        'top': window.scrollY - 31 + 'px',
        'left': '40%',
        'height': '96%',
        'width': '56vw',
    }, 700);
    setTimeout(function () {
        $(subject).css('box-shadow', 'inset 20px -12px 5px -12px rgba(0,0,0,0.3)');
    }, 800);
};
function animate_shrink(subject) {
    $(subject).css('box-shadow', 'none');
    $(subject).animate({
        'height': '170px',
        'width': '320px',
        'margin': '30px auto 30px auto',
        'top': '0',
        'left': '0',
    }, 700);
    setTimeout(function () {
        clear_styles(subject);
    }, 800);
};
function animate_rise(subject) {
    $(subject).css('box-shadow', '0 1px 1px rgba(0,0,0,0.11)');
    setTimeout(function () {
        $(subject).css('box-shadow', '0 2px 2px rgba(0,0,0,0.12)');
        setTimeout(function () {
            $(subject).css('box-shadow', '0 3px 3px rgba(0,0,0,0.13)');
            setTimeout(function () {
                $(subject).css('box-shadow', '0 4px 4px rgba(0,0,0,0.14)');
                setTimeout(function () {
                    $(subject).css('box-shadow', '0 5px 5px rgba(0,0,0,0.15)');
                    setTimeout(function () {
                        $(subject).css('box-shadow', '0 6px 6px rgba(0,0,0,0.16)');
                    }, 200);
                }, 150);
            }, 110);
        }, 90);
    }, 50);
}
function animate_fall(subject) {
    $(subject).css('box-shadow', '0 5px 5px rgba(0,0,0,0.15)');
    setTimeout(function () {
        $(subject).css('box-shadow', '0 4px 4px rgba(0,0,0,0.14)');
        setTimeout(function () {
            $(subject).css('box-shadow', '0 3px 3px rgba(0,0,0,0.13)');
            setTimeout(function () {
                $(subject).css('box-shadow', '0 2px 2px rgba(0,0,0,0.12)');
                setTimeout(function () {
                    $(subject).css('box-shadow', '0 1px 1px rgba(0,0,0,0.11)');
                    setTimeout(function () {
                        $(subject).css('box-shadow', 'none');
                    }, 200);
                }, 160);
            }, 140);
        }, 100);
    }, 50);
}
function feedback(container) {
    // make ripple effect
};

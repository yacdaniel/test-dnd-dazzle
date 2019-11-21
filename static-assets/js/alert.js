(function () {
    let alerts = document.getElementById('alertBoxContainer');
    let state = false;
    let hideBox = setTimeout(function() { 
        if (!state) {
            $('#alertBoxContainer').fadeOut();
        }
    }, 3000);
    alerts.addEventListener("mouseover", () => {
        state = true;
        clearTimeout(hideBox);
    });
    alerts.addEventListener("mouseleave", () => {
        state = false;
        hideBox = setTimeout(function() { 
            if (!state) {
                $('#alertBoxContainer').fadeOut();
            }
        }, 3000);
    });
    document.getElementById('closeBoxAlert').addEventListener('click', function() {
        $('#alertBoxContainer').fadeOut();
    });
}) ();
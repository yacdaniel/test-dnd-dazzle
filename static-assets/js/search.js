(function () {
    document.getElementById('eac-container-keyword').className="";

    document.getElementById('keyword').addEventListener('focus', function() {
        document.getElementById('eac-container-keyword').className="easy-autocomplete-container";
    });
}) ();
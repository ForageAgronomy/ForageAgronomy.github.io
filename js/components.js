document.addEventListener("DOMContentLoaded", function () {

    // Load shared header
    fetch("components/header.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Could not load header.html");
            }

            return response.text();
        })
        .then(data => {

            document.getElementById("header-placeholder").innerHTML = data;

        })
        .catch(error => {

            console.error("Header loading error:", error);

        });


    // Load shared footer
    fetch("components/footer.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Could not load footer.html");
            }

            return response.text();
        })
        .then(data => {

            document.getElementById("footer-placeholder").innerHTML = data;

        })
        .catch(error => {

            console.error("Footer loading error:", error);

        });

});

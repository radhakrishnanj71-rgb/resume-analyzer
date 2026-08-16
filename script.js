document.addEventListener("DOMContentLoaded", function () {

    const resumeInput = document.getElementById("resume");
    const analyzeBtn = document.getElementById("analyzeBtn");
    const status = document.getElementById("status");

    // Check whether elements exist
    if (!resumeInput) {
        console.error("Resume input not found");
        return;
    }

    // When a file is selected
    resumeInput.addEventListener("change", function () {

        if (resumeInput.files.length > 0) {

            const file = resumeInput.files[0];

            status.textContent = "Selected file: " + file.name;

            console.log("File selected:", file.name);

        } else {

            status.textContent = "No file selected.";

        }
    });

    // Analyze button
    if (analyzeBtn) {

        analyzeBtn.addEventListener("click", function () {

            if (resumeInput.files.length === 0) {
                status.textContent = "Please select a PDF resume first.";
                return;
            }

            const file = resumeInput.files[0];

            status.textContent =
                "Analyzing: " + file.name + "...";

            console.log("Analyzing file:", file);

            // Temporary test
            setTimeout(function () {
                status.textContent =
                    "File selected successfully: " + file.name;
            }, 1000);
        });
    }

});

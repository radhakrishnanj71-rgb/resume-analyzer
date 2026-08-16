document.addEventListener("DOMContentLoaded", function () {

    const resumeInput = document.getElementById("resume");
    const fileName = document.getElementById("fileName");
    const analyzeBtn = document.getElementById("analyzeBtn");
    const resetBtn = document.getElementById("resetBtn");
    const status = document.getElementById("status");


    // -------------------------------
    // PDF FILE SELECTION
    // -------------------------------

    resumeInput.addEventListener("change", function () {

        if (resumeInput.files.length > 0) {

            const file = resumeInput.files[0];

            fileName.textContent = "Selected: " + file.name;

            status.innerHTML = `
                <h3>📄 Resume Selected</h3>
                <p>Ready to analyze: <strong>${file.name}</strong></p>
            `;

        } else {

            fileName.textContent = "No file selected";

        }

    });


    // -------------------------------
    // ANALYZE RESUME
    // -------------------------------

    analyzeBtn.addEventListener("click", function () {

        if (resumeInput.files.length === 0) {

            status.innerHTML = `
                <h3>⚠️ No Resume Selected</h3>
                <p>Please select a PDF resume first.</p>
            `;

            return;
        }


        const file = resumeInput.files[0];


        status.innerHTML = `
            <h3>⏳ Analyzing Resume...</h3>
            <p>Please wait...</p>
        `;


        // Temporary analysis test
        setTimeout(function () {

            status.innerHTML = `
                <h3>✅ Resume Analysis Completed</h3>

                <p>
                    File analyzed successfully:
                    <strong>${file.name}</strong>
                </p>

                <p>
                    Your resume analysis will appear here.
                </p>
            `;

        }, 1000);

    });


    // -------------------------------
    // ANALYZE ANOTHER RESUME
    // -------------------------------

    resetBtn.addEventListener("click", function () {

        // Clear selected PDF
        resumeInput.value = "";

        // Reset file name
        fileName.textContent = "No file selected";

        // Reset result section
        status.innerHTML = `
            <h3>📄 Resume Analysis</h3>
            <p>
                Your AI analysis will appear here.
            </p>
        `;

        // Open PDF file picker
        resumeInput.click();

    });

});

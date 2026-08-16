document.addEventListener("DOMContentLoaded", function () {

    const resumeInput = document.getElementById("resume");
    const analyzeBtn = document.getElementById("analyzeBtn");
    const status = document.getElementById("status");
    const fileName = document.getElementById("fileName");
    const resetBtn = document.getElementById("resetBtn");


    // ==============================
    // Show selected PDF filename
    // ==============================

    resumeInput.addEventListener("change", function () {

        if (resumeInput.files.length > 0) {

            const file = resumeInput.files[0];

            fileName.textContent = "📄 " + file.name;

        } else {

            fileName.textContent = "No file selected";

        }

    });


    // ==============================
    // Reset / Analyze Another Resume
    // ==============================

    resetBtn.addEventListener("click", function () {

        resumeInput.value = "";

        fileName.textContent = "No file selected";

        status.innerHTML = `
            <h3>📄 Resume Analysis</h3>
            <p>Your AI analysis will appear here.</p>
        `;

    });


    // ==============================
    // Analyze Resume
    // ==============================

    analyzeBtn.addEventListener("click", async function () {

        // Check PDF selected

        if (resumeInput.files.length === 0) {

            status.innerHTML = `
                <p>⚠️ Please select a PDF resume first.</p>
            `;

            return;
        }


        const file = resumeInput.files[0];


        // Check PDF format

        if (file.type !== "application/pdf") {

            status.innerHTML = `
                <p>⚠️ Please upload a PDF file.</p>
            `;

            return;
        }


        // Loading message

        status.innerHTML = `
            <div class="analysis-result">

                <h2>⏳ Analyzing Resume...</h2>

                <p>
                    Please wait while AI analyzes your resume.
                </p>

            </div>
        `;


        // Create FormData

        const formData = new FormData();

        formData.append("resume", file);


        try {

            // ==============================
            // Send PDF to n8n
            // ==============================

            const response = await fetch(
                "https://nitiyaah.app.n8n.cloud/webhook/52937b1b-241f-4057-bf7f-e6728b1e3bb4",
                {
                    method: "POST",
                    body: formData
                }
            );


            // ==============================
            // Check n8n response
            // ==============================

            if (response.ok) {

                const result = await response.json();


                // ==============================
                // Display Resume Analysis
                // ==============================

                status.innerHTML = `

                    <div class="analysis-result">

                        <h2>📄 Resume Analysis</h2>


                        <!-- Candidate -->

                        <div class="section">

                            <h3>👤 Candidate</h3>

                            <p>
                                ${result.candidateName || "Not available"}
                            </p>

                        </div>


                        <!-- Education -->

                        <div class="section">

                            <h3>🎓 Education</h3>

                            <p>
                                ${
                                    result.education
                                        ? result.education.join("<br>")
                                        : "Not available"
                                }
                            </p>

                        </div>


                        <!-- Skills -->

                        <div class="section">

                            <h3>💻 Skills</h3>

                            <p>
                                ${
                                    result.skills
                                        ? result.skills.join(", ")
                                        : "Not available"
                                }
                            </p>

                        </div>


                        <!-- Projects -->

                        <div class="section">

                            <h3>📂 Projects</h3>

                            <p>
                                ${
                                    result.projects
                                        ? result.projects.join("<br>")
                                        : "Not available"
                                }
                            </p>

                        </div>


                        <!-- Certifications -->

                        <div class="section">

                            <h3>📜 Certifications</h3>

                            <p>
                                ${
                                    result.certifications
                                        ? result.certifications.join("<br>")
                                        : "Not available"
                                }
                            </p>

                        </div>


                        <!-- Experience -->

                        <div class="section">

                            <h3>💼 Experience</h3>

                            <p>
                                ${
                                    result.experience
                                        ? result.experience.join("<br>")
                                        : "Not available"
                                }
                            </p>

                        </div>


                        <!-- Strengths -->

                        <div class="section">

                            <h3>⭐ Strengths</h3>

                            <p>
                                ${
                                    result.strengths
                                        ? result.strengths.join("<br>")
                                        : "Not available"
                                }
                            </p>

                        </div>


                        <!-- Improvement Areas -->

                        <div class="section">

                            <h3>🔧 Areas for Improvement</h3>

                            <p>
                                ${
                                    result.improvementAreas
                                        ? result.improvementAreas.join("<br>")
                                        : "Not available"
                                }
                            </p>

                        </div>


                        <!-- Resume Score -->

                        <div class="section score">

                            <h3>📊 Resume Score</h3>

                            <p>
                                ${result.resumeScore || 0}/100
                            </p>

                        </div>


                        <!-- Suggested Skills -->

                        <div class="section">

                            <h3>🚀 Suggested Skills</h3>

                            <p>
                                ${
                                    result.suggestedSkills
                                        ? result.suggestedSkills.join("<br>")
                                        : "Not available"
                                }
                            </p>

                        </div>


                        <!-- Suitable Career Roles -->

                        <div class="section">

                            <h3>💼 Suitable Career Roles</h3>

                            <p>
                                ${
                                    result.suitableRoles
                                        ? result.suitableRoles.join("<br>")
                                        : "Not available"
                                }
                            </p>

                        </div>


                    </div>

                `;

            } else {

                status.innerHTML = `
                    <div class="analysis-result">

                        <h2>❌ Analysis Failed</h2>

                        <p>
                            n8n received the request but returned
                            an error.
                        </p>

                        <p>
                            Status: ${response.status}
                        </p>

                    </div>
                `;

            }


        } catch (error) {

            console.error("Error:", error);


            status.innerHTML = `
                <div class="analysis-result">

                    <h2>❌ Connection Error</h2>

                    <p>
                        Could not connect to n8n.
                    </

document.addEventListener("DOMContentLoaded", function () {
    // Extract userId from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');  // Extracts userId from ?userId= value in the URL

    if (userId) {
        console.log('User ID:', userId);

        // Now fetch the user data using the extracted userId
        fetch(`https://your-server-url.com/dashboard/${userId}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    updateDashboard(data);  // Call the function to update the charts and data
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    } else {
        console.error('userId is missing in the URL');
    }

    // Function to update the dashboard charts and data
    function updateDashboard(user_data) {
        // Destructure user data for easier reference
        const { siteVisits, tipsGenerated, score, tips } = user_data;
        
        // Chart.js setup
        const ctxVisits = document.getElementById("visitsChart").getContext("2d");
        const ctxTips = document.getElementById("tipsChart").getContext("2d");
        const ctxQuiz = document.getElementById("quizChart").getContext("2d");
        const ctxScoreStreak = document.getElementById("scoreStreakChart").getContext("2d");

        // Donut Chart - Most Visited Websites (Update with dynamic data)
        new Chart(ctxVisits, {
            type: "doughnut",
            data: {
                labels: ["Google", "Facebook", "YouTube", "Reddit", "Others"],
                datasets: [{
                    data: [siteVisits, 25, 15, 10, 10],  // Use dynamic siteVisits data
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#8A2BE2", "#2ECC71"]
                }]
            }
        });

        // Bar Chart - Number of Tips Given (Update with dynamic tipsGenerated data)
        new Chart(ctxTips, {
            type: "bar",
            data: {
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                datasets: [{
                    label: "Tips Given",
                    data: [tipsGenerated, 8, 6, 10, 7, 9, 11],  // Use dynamic tipsGenerated data
                    backgroundColor: "#36A2EB"
                }]
            }
        });

        // Quiz Performance Chart (If quizzes data is available)
        new Chart(ctxQuiz, {
            type: "bar",
            data: {
                labels: ["Correct", "Incorrect"],
                datasets: [{
                    label: "Quiz Attempts",
                    data: [score.correct, score.incorrect],  // Use dynamic quiz score data
                    backgroundColor: ["#2ECC71", "#E74C3C"]
                }]
            }
        });

        // Score Streak Graph (Use dynamic streak data if available)
        new Chart(ctxScoreStreak, {
            type: "line",
            data: {
                labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
                datasets: [{
                    label: "Questions Answered",
                    data: [2, 4, 3, 6, 8],  // Use dynamic streak data if available
                    backgroundColor: "rgba(0, 255, 0, 0.2)",
                    borderColor: "#00FF00",
                    borderWidth: 2,
                    fill: true
                }]
            },
            options: {
                plugins: {
                    legend: {
                        labels: {
                            color: "#00FF00"
                        }
                    }
                },
                scales: {
                    x: { ticks: { color: "#00FF00" } },
                    y: { ticks: { color: "#00FF00" } }
                }
            }
        });

        // FAQ Accordion for tips (Display user's tips dynamically)
        const tipsContainer = document.getElementById('tipsContainer');  // Assuming you have a container for tips
        tips.forEach(tip => {
            const tipElement = document.createElement('div');
            tipElement.classList.add('faq');
            tipElement.innerHTML = `
                <div class="faq-question">Tip</div>
                <div class="faq-answer">${tip}</div>
            `;
            tipsContainer.appendChild(tipElement);
        });

        console.log('Dashboard updated with user data');
    }
});

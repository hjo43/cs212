console.log("Hello World!");

const name = "Hayden O'Rourke";
let hasDownloadedResume = false;

function showGreeting(name) {
    return "Hello, my name is " + name + "! Welcome to my portfolio!";
}

const greeting = document.getElementById("greeting");
greeting.textContent = showGreeting(name);

const resumeButton = document.getElementById("resumeButton");

resumeButton.addEventListener("click", function() {
    if (hasDownloadedResume === false) {
        alert("Your resume is downloaded successfully!");
        hasDownloadedResume = true;
    }
});

function daysUntilDeadline(projectSubmissionDate) {
    const currentDate = new Date();
    const deadline = new Date(projectSubmissionDate);
    const difference = deadline - currentDate;
    const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
    return days;
}

const daysRemaining = daysUntilDeadline("2026-10-12");
document.getElementById("daysRemaining").textContent = daysRemaining + " days remaining until the deadline.";

console.log(daysRemaining + " days remaining until the deadline.");

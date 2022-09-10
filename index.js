// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown');

// TODO: Create an array of questions for user input
const questions = [
    {
        type: "input",
        name: "name",
        message: "Hello and welcome to the README generator! Please provide your name:",
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log("Please enter your name!");
                return false;
            }
        }
    },
    {
        type: "input",
        name: "github",
        message: "Enter your GitHub username:",
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log("Link your GitHub repo so users know where to find more of your work!");
                return false;
            }
        }
    },
    {
        type: "input",
        name: "email",
        message: "Enter your email address:",
        validate: emailInput => {
            if (emailInput) {
                return true;
            } else {
                console.log("Link your email in case anyone has questions about your project!");
                return false;
            }
        }
    },
    {
        type: "input",
        name: "title",
        message: "What is the title of your project?",
        validate: titleInput => {
            if (titleInput) {
                return true;
            } else {
                console.log("Please enter project name!");
                return false;
            }
        }
    },
    {
        type: "input",
        name: "description",
        message: 'Please provide a description of your project:',
        validate: descriptionInput => {
            if (descriptionInput) {
                return true;
            } else {
                console.log("It is essential to provide a description of your project!")
                return false;
            }
        }
    },
    {
        type: "input",
        name: "installation",
        message: "Please provide installation instructions.",
        validate: installationInput => {
            if (installationInput) {
                return true;
            } else {
                console.log("Please provide instructions for installation.")
                return false;
            }
        }
    },
    {
        type: "input",
        name: "usage",
        message: "Please provide instructions for usage:",
        validate: usageInput => {
            if (usageInput) {
                return true;
            } else {
                console.log("Please provide instructions for usage to help users properly naviagte your project.")
                return false;
            }
        }
    },
    {
        type: "input",
        name: "contributing",
        message: "How can others contribute to this project?",
        validate: contributingInput => {
            if (contributingInput) {
                return true;
            } else {
                console.log("Please provide instructions on how others can contribute to your project.")
                return false;
            }
        }
    },
    {
        type: "confirm",
        name: "confirmLicenses",
        message: "Would you like to include a license?",
        default: false
    },
    {
        type: "list",
        name: "licenses",
        message: "What license would you like to include?",
        choices: ['MIT', 'GPL', 'CC--0'],
        when: ({ confirmLicenses }) => {
            if (confirmLicenses) {
                return true;
            } else {
                return false;
            }
        }
    },
];

// TODO: Create a function to write README file
const writeToFile = data => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/README.md', data, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: console.log('Your README has been created! Navigate to the "dist" folder to view your README.')
            });
        })
    })
}

// TODO: Create a function to initialize app
function init() {
    return inquirer.prompt(questions);
}

// Function call to initialize app
init()
    .then(userInput => {
        return generateMarkdown(userInput);
    })
    .then(readmeInfo => {
        return writeToFile(readmeInfo);
    })
    .catch(err => {
        console.log(err);
    })
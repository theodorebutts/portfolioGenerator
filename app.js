const inquirer = require('inquirer')
const fs = require('fs')
const generatePage = require('./src/pageTemplate.js')


const promptUser = () => {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is your name?',
                validate: nameInput => {
                    if (nameInput) {
                        return true
                    } else {
                        console.log('Please enter your name.')
                        return false
                    }
                }
            },
            {
                type: 'input',
                name: 'github',
                message: 'Enter your GitHub Username',
                validate: hubInput => {
                    if (hubInput) {
                        return true
                    } else {
                        console.log('Please enter your GitHub Username.')
                        return false
                    }
                }
            },
            {
                type: 'confirm',
                name: 'confirmAbout',
                message: 'Would you like to enter some information about yourself for an "About" section?',
                default: true
            },
            {
                type: 'input',
                name: 'about',
                message: 'Provide some information about yourself',
                when: ({ confirmAbout }) => confirmAbout
            }
        ])
}


const promptProject = portfolioData => {
    portfolioData.projects = []
    if (!portfolioData.projects) {
        portfolioData.projects = []
    }

    console.log(`
        =================
        Add a New Project
        =================
        `)
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?',
            validate: projectNameInput => {
                if (projectNameInput) {
                    return true
                } else {
                    console.log('Please enter a project name.')
                    return false
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description for the project (Required)',
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true
                } else {
                    console.log('Please enter project description.')
                    return false
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you create this project with? (Check all that apply',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)',
            validate: linkInput => {
                if (linkInput) {
                    return true
                } else {
                    console.log('Please enter a GitHub link.')
                    return false
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter anoter project?',
            default: false
        }
    ])
        .then(projectData => {
            portfolioData.projects.push(projectData)
            if (projectData.comfirmAddProject) {
                return promptProject(portfolioData)
            } else {
                return portfolioData
            }
        })
}

promptUser()
    .then(promptProject)
    .then(portfolioData => {
        const pageHTML = generatePage(portfolioData)

        fs.writeFile('./index.html', pageHTML, err => {
            if (err) throw new Error(err)

        })
    })


// Save for Reference
// const fs = require('fs') 

// const profileDataArgs = process.argv.slice(2)

// const [name, github] = profileDataArgs

// fs.writeFile('./index.html', generatePage(name, github), err => {
//     if (err) throw new Error(err)

//     console.log('Portfolio Complete! Check out index.html to see the output')
// })
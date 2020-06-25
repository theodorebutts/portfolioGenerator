const inquirer = require('inquirer')

const promptUser = () => {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is your name?'
            },
            {
                type: 'input',
                name: 'github',
                message: 'Enter your GitHub Username',
            },
            {
                type: 'input',
                name: 'about',
                message: 'Provide some information about yourself'
            }
        ])
        .then(projectData => {
            protfolioData.projects.push(projectData)
            if (projectData.comfirmAddProject) {
                return promptProject(protfolioData)
            } else {
                return protfolioData
            }
        })
}


const promptProject = protfolioData => {
    protfolioData.projects = []
    if (!protfolioData.projects) {
        protfolioData.projects = []
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
                message: 'What is the name of your project?'
            },
            {
                type: 'input',
                name: 'description',
                message: 'Provide a description fo the project (Required)'
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
                message: 'Enter the GitHub link to your project. (Required)'
            },
            {
                type: 'confirm',
                name: 'feature',
                message: 'Would you liek to feature this project?',
                default: false
            },
            {
                type: 'confirm',
                name: 'confirmAddProject',
                message: 'Would you like to enter anoter project?',
                default: false
            }
        ])
}

promptUser()
    .then(promptProject)
    .then(protfolioData => {
        console.log(protfolioData)
    })


// Save for Reference
// const fs = require('fs') 

// const generatePage = require('./src/pageTemplate.js')

// const profileDataArgs = process.argv.slice(2)

// const [name, github] = profileDataArgs

// fs.writeFile('./index.html', generatePage(name, github), err => {
//     if (err) throw new Error(err)

//     console.log('Portfolio Complete! Check out index.html to see the output')
// })
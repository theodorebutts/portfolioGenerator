const profileDataArgs = process.argv.slice(2, process.argv.length)
console.log(profileDataArgs)

const printProfileData = profiledataArr => {
    for (let i = 0; i < profiledataArr.length; i += 1) {
        console.log(profiledataArr[i])
    }
    console.log('============')

    profiledataArr.forEach(profileItem => console.log(profileItem))
}


printProfileData(profileDataArgs)
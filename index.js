const readline = require('readline');
const Table = require('cli-table');
const { apiCall } = require('./utils');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("What's your github Handler", async (ans)=> {
    var profileInfo = await apiCall(`https://api.github.com/users/${ans}`);
    const {name, company, location, followers, following} = profileInfo.data
    console.log(name, company, location, followers, following)
    const profileTable = new Table();
    const orgsTable = new Table({
        head: ["Organization", "Description"],
    });

    profileTable.push(
        { Name: name },
        { Company: company || "" },
        { Location: location || "" },
        { Followers: followers || "" },
        { Following: following || "" },
    )

    var orgsInfo = await apiCall(`https://api.github.com/users/${ans}/orgs`);
    orgsInfo.data.forEach((orgs)=>{
        orgsTable.push(
            [orgs.login, orgs.description.slice(0,40)+"..."],
        )
    })

    console.log(profileTable.toString());
    console.log(orgsTable.toString());
    rl.close();
});
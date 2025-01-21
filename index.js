const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');


const FILE_PATH = 'data.json';

const makeCommit = async (n) => {
    if (n === 0) return simpleGit().push();

    const x = Math.floor(Math.random() * 55);
    const y = Math.floor(Math.random() * 10);
    const DATE = moment().subtract(1, 'y').add(1, 'd').add(x, 'w').add(y, 'd').format();

    const data = { date: DATE };
    console.log(DATE);

    try {
        const obj = await jsonfile.readFile(FILE_PATH).catch(() => ({})); // read file or initialize if not exist
        obj.commits = obj.commits || [];
        obj.commits.push(data);

        await jsonfile.writeFile(FILE_PATH, obj);  // Write updated data to file

        await simpleGit().add([FILE_PATH]).commit(DATE, { '--date': DATE });

        makeCommit(n - 1);  // Recurse to next commit
    } catch (error) {
        console.error('Error during commit process:', error);
    }
}

makeCommit(100);

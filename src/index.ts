import { extractFileData } from './extractFileData';
import { generateTable, createSqlite, importData } from './dbUtils';



const tablename = 'tags';
const sqlLiteFilenameAndPath = './mydb.sqlite'
const dataFilenameAndPath = './data.csv'

const run = async () => {
    


    const knex = createSqlite(sqlLiteFilenameAndPath);
    await generateTable(knex, tablename);
    const data = await extractFileData(dataFilenameAndPath);
    await importData(knex, tablename, data);

   // await knex('tags');

};

run();

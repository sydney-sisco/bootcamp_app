const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = process.argv[2];
const limit = process.argv[3];

pool.query(`
SELECT s.id, s.name AS name, c.name AS cohort
FROM students s
JOIN cohorts c ON c.id = s.cohort_id
WHERE c.name like '%${cohortName}%'
LIMIT ${limit || 5};
`)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort} cohort`);
  })
});

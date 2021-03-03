const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});


const cohortName = process.argv[2];
const values = [`${cohortName || 'JUL02'}`];
const queryString = `
  SELECT DISTINCT t.name AS teacher, c.name AS cohort
  FROM cohorts c
  JOIN students s ON s.cohort_id = c.id
  JOIN assistance_requests ar ON ar.student_id = s.id
  JOIN teachers t ON t.id = ar.teacher_id
  WHERE c.name = $1
  ORDER BY t.name;
`;


pool.query(queryString, values)
.then(res => {
  res.rows.forEach(teacher => {
    console.log(`${teacher.cohort}: ${teacher.teacher}`);
  })
});

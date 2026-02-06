const { faker } = require('@faker-js/faker');
const fs = require('fs');
const path = require('path');

const CANDIDATE_COUNT = 40;
const SKILLS = ['Leadership', 'Waste Management', 'Sustainability', 'Logistics', 'Safety Protocols', 'Data Analysis', 'Team Building', 'Process Optimization'];

function randomSkills() {
    const num = faker.number.int({ min: 2, max: 4 });
    const shuffled = SKILLS.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num).join(', ');
}

const candidates = [];
const evaluations = [];
let sqlOutput = 'INSERT INTO candidates (id, name, experience_years, skills) VALUES\n';
let evalSqlOutput = 'INSERT INTO evaluations (candidate_id, crisis_management_score, sustainability_score, team_motivation_score) VALUES\n';

for (let i = 1; i <= CANDIDATE_COUNT; i++) {
    // Generate Candidate
    const candidate = {
        id: i,
        name: faker.person.fullName(),
        experience_years: faker.number.int({ min: 1, max: 20 }),
        skills: randomSkills(),
    };
    candidates.push(candidate);
    sqlOutput += `(${i}, "${candidate.name}", ${candidate.experience_years}, "${candidate.skills}")${i === CANDIDATE_COUNT ? ';' : ','}\n`;

    // Generate Evaluation
    // Random float between 5.0 and 10.0
    const crisis = faker.number.float({ min: 5, max: 10, precision: 0.1 });
    const sustain = faker.number.float({ min: 5, max: 10, precision: 0.1 });
    const motivate = faker.number.float({ min: 5, max: 10, precision: 0.1 });
    
    // Calculate average for JSON (DB trigger does this in SQL)
    const avg = parseFloat(((crisis + sustain + motivate) / 3).toFixed(2));

    evaluations.push({
        candidate_id: i,
        candidate_name: candidate.name,
        crisis_management_score: crisis,
        sustainability_score: sustain,
        team_motivation_score: motivate,
        average_score: avg
    });
    
    evalSqlOutput += `(${i}, ${crisis}, ${sustain}, ${motivate})${i === CANDIDATE_COUNT ? ';' : ','}\n`;
}

// Combine for frontend easy usage
const fullData = candidates.map(c => {
    const ev = evaluations.find(e => e.candidate_id === c.id);
    return { ...c, ...ev };
});

// Write Files
const dbDir = path.join(__dirname, 'database');
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir);
}

fs.writeFileSync(path.join(dbDir, 'dummy_data.json'), JSON.stringify(fullData, null, 2));
fs.writeFileSync(path.join(dbDir, 'insert_data.sql'), sqlOutput + '\n' + evalSqlOutput);

console.log('✅ Generated 40 candidates in database/dummy_data.json and database/insert_data.sql');

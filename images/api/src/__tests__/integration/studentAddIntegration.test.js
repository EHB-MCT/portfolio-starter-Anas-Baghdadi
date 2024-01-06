const request = require('supertest');
const app = require('../../../../../app.js'); 
const {v4: uuid}= require("uuid");
const knexfile = require('../../db/migrations/knexfile.js');
const db = require("knex")(knexfile.development);

const exampleStudent = {
    name: 'test',
    age: Math.floor(Math.random()* 99),
    classgroup: "DEV V",
    grade: Math.floor(Math.random()* 99)
};

describe('POST /students/:id', () => {

beforeAll(async () => {
    await db.raw('BEGIN');
});
afterAll(async () => {
    await db.destroy(); 
});

test('should return the correct student record', async () => {
    const response = await request (app)
    .post(`/students/`)
    .send(exampleStudent);

    const studentResponse = response.body;

    expect (response.status).toBe (200);

    const dbRecord = await db('students').select("*").first.where("id", studentResponse.id);
    expect(dbRecord).toHaveProperty('id', studentResponse.id);
    expect(dbRecord).toHaveProperty('UUID', studentResponse.UUID);
    expect(dbRecord).toHaveProperty('name', exampleStudent.name);
    expect(dbRecord).toHaveProperty('age', exampleStudent.age);
    expect(dbRecord).toHaveProperty('classgroup', exampleStudent.classgroup);
    expect(dbRecord).toHaveProperty('grade', exampleStudent.grade);
    });




    test('should return 401, wrong student record', async () => {
        const response = await request (app)
        .post(`/students/`)
        .send({
        ...exampleStudent,
        name: null
    });
    
        expect (response.status).toBe(401);
        const studentResponse = response.body;
    
        
    
        const dbRecord = await db('students').select("*").where("name", null);
        expect(dbRecord.length).toBe(0)
       
        });

});


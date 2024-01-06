const {
    checkStudentName
} = require("./../helpers/endpointHelpers.js")

/**
 * Represents a student object.
 * @typedef {object} Student
 * @property {integer} id - Unique identifier for the student.
 * @property {string} name - Name of the student.
 * @property {integer} age - Age of the student.
 * @property {string} classgroup - Class group information for the student.
 * @property {double} grade - Grade information for the student.
 * @property {string} created_at - Timestamp of when the student record was created.
 * @property {string} updated_at - Timestamp of when the student record was last updated.
 */

/**
 * Initializes endpoints for the Express application.
 * @param {object} app - The Express application.
 * @param {object} db - The database connection object.
 */
function initEndpoints(app, db) {

    /**
     * POST /students
     * This route handles the creation of a new student record in the database.
     * It expects a JSON object containing student information in the request body.
     * Upon successful creation, it returns the newly created student's information.
     *
     * @param {object} req - The HTTP request object.
     * @param {Student} req.body - The HTTP request body contains the student.
     * @param {object} res - The HTTP response object.
     * @returns {object} JSON response with either the newly created student or an error message.
     */
    app.post('/students', async (req, res) => {
        const student = req.body;
        if (checkStudentName(student.name)) {
            db('students').insert(student).returning('*').then((insertedStudent) => {
                    res.status(201).json(insertedStudent[0]);
                })
                .catch((err) => {
                    res.status(500).json({
                        error: err
                    });
                });
        } else {
            res.status(401).send({
                message: "name not formatted correctly"
            });
        }
    });


    /**
     * GET /students
     * This route retrieves a list of all students from the database.
     * It returns a JSON array containing student records if successful.
     *
     * @param {object} req - The HTTP request object.
     * @param {object} res - The HTTP response object.
     * @returns {object} JSON response with either an array of student records or an error message.
     */
    app.get('/students', async (req, res) => {
        try {
            const students = await db('students')
                .join('classes', 'classes.class', 'students.classgroup')
                .select('students.*', 'classes.class_name');

            res.json(students);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: 'An error occurred while fetching students.'
            });
        }
    });

    /**
     * GET /students/:id
     * This route retrieves a specific student's information from the database based on the provided ID.
     * It expects the student's ID as a parameter in the URL.
     * If the student is found, it returns the student's information as JSON.
     * If the student is not found, it returns a 404 Not Found error.
     */
    app.get('/students/:id', async (req, res) => {
            const id = parseInt(req.params.id); 
            if(id >= 0 && typeof(id) == 'number' && id < 9999999) {
            db('students').where({ id }).first().then ((student) => {
            if (student) {
                res.json(student);
            } else {
                res.status(404).json({error: 'Student not found.'});
            }
        }).catch((error) => {
            console.error(error);
            res.status(500).json({error: 'An error occurred while fetching the student.'});
        })
    }else {
        res.status(401).json({ error: 'negative id provided'});
    }
});

};

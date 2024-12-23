const createUser  = require('../crudOperations/createUser');
const getUser = require('../crudOperations/readUser');
const updateUser = require('../crudOperations/updateUser');
const deleteUser = require('../crudOperations/deleteUser');  
const { faker } = require('@faker-js/faker');


describe('GoRest User CRUD Operations', function () {
  this.timeout(10000);
  let userId;
      before(async function () {
      chai = await import('chai');
      expect = chai.expect; 
    });


  // CREATE OPERATIONS
  // Positive Test: CREATE A NEW USER USING POST METHOD
  it('Should create a new user with valid data', async () => {
    const newUser = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      gender: faker.helpers.arrayElement(['male', 'female']),
      status: faker.helpers.arrayElement(['active', 'inactive']),
    };

    const response = await createUser(newUser);
    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('id');
    userId = response.body.id; // Store the created user ID for future tests
  });

  // Negative Test: CREATE A NEW USER WITH MISSING FIELDS USING POST METHOD
  it('Should not create a user without a name', async () => {
    const invalidUser = {
      email: faker.internet.email(),
      gender: 'male',
      status: 'active',
    };

    const response = await createUser(invalidUser);
    expect(response.status).to.equal(422); 
    expect(response.body).to.be.an('array').that.is.not.empty;
    expect(response.body[0]).to.have.property('field').that.equals('name');
    expect(response.body[0]).to.have.property('message').that.equals("can't be blank");
  });


  // FETCH OPERATIONS
  // Positive Test: FETCH THE NEWLY CREATED USER USING GET METHOD
  it('Should fetch the created user', async () => {
    const response = await getUser(userId);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('id', userId);
  });

  // Negative Test: FETCH A USER WITH INVALID ID USING GET METHOD
  it('Should return 404 when trying to fetch a user with an invalid ID', async () => {
    const invalidUserId = 999999; 
    const response = await getUser(invalidUserId);
    expect(response.status).to.equal(404);
    expect(response.body).to.have.property('message').that.equals("Resource not found");
  });


  // UPDATE OPERATIONS
  // Positive Test: UPDATE THE USER DETAILS USING PUT METHOD
  it('Should update the user details', async () => {
    const updatedData = { name: 'Updated Name', status: 'inactive' };
    const response = await updateUser(userId, updatedData);
    expect(response.status).to.equal(200);
    expect(response.body.name).to.equal(updatedData.name);
    expect(response.body.status).to.equal(updatedData.status);
  });

  // Negative Test: UPDATE DETAILS OF A USER WITH INVALID DETAILS USING PUT METHOD
  it('Should not update the user with invalid data', async () => {
    const invalidUpdate = { name: '', status: 'inactive' };
    const response = await updateUser(userId, invalidUpdate);
    expect(response.status).to.equal(422); // Unprocessable Entity
    expect(response.body[0]).to.have.property('field').that.equals('name');
    expect(response.body[0]).to.have.property('message').that.equals("can't be blank");
  });


  // DELETE OPERTAIONS
  // Positive Test: DELETE THE NEWLY CREATED USER USING DELETE METHOD
  it('Should delete the created user', async () => {
    const response = await deleteUser(userId);
    expect(response.status).to.equal(204); 
  });

  // Negative Test: DELETE AN INVALID (NON-EXISTENT) USER
  it('Should return 404 when trying to delete a non-existing user', async () => {
    const nonExistingUserId = 999999; 
    const response = await deleteUser(nonExistingUserId);
    expect(response.status).to.equal(404);
    expect(response.body).to.have.property('message').that.equals("Resource not found");
  });

  // Negative Test: FETCH THE DELETED USER USING GET METHOD
  it('Should return 404 when trying to fetch a deleted user', async () => {
    const response = await getUser(userId); // Fetching a deleted user
    expect(response.status).to.equal(404);
    expect(response.body).to.have.property('message').that.equals("Resource not found");
  });

  // Negative Test: UPDATE THE DELETED USER USING PUT METHOD
  it('Should return 404 when trying to update a deleted user', async () => {
    const updatedData = { name: 'Updated After Deletion', status: 'inactive' };
    const response = await updateUser(userId, updatedData);
    expect(response.status).to.equal(404);
    expect(response.body).to.have.property('message').that.equals("Resource not found");
  });
});

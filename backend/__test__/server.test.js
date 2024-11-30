const request = require('supertest'); // Import supertest to make HTTP requests
const app = require('../server'); // Import the Express app (server.js)

// Unit test for the /api route
describe('GET /api', () => {
  it('should return a message with status 200', async () => {
    const response = await request(app)  // Make a GET request to the /api route
      .get('/api')                      // Call the /api route
      .expect('Content-Type', /json/)   // Expect the response to be JSON
      .expect(200);                     // Expect HTTP status code 200

    // Check if the message key is returned in the JSON response
    expect(response.body.message).toBe('Hello from the backend!');
  });
});
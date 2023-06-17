import UserPage from "../../support/pages/userPage";

describe("API Test Cases for Create, Update and Delete User", () => {
  const userPage = new UserPage();
  let createdUserId;

  afterEach(() => {
    if (createdUserId) {
      cy.log(`User ID: ${createdUserId}`);
    }
  });

  it("should create a new user, verify the response, and print the user details", () => {
    const name = "waqas";
    const job = "software eng";

    userPage.createUser(name, job).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body).to.have.property("name", name);
      expect(response.body).to.have.property("job", job);
      expect(response.body).to.have.property("id").that.is.a("string");
      expect(response.body).to.have.property("createdAt").that.is.a("string");

      createdUserId = response.body.id;

      cy.log("New User Details:");
      cy.log(`Name: ${response.body.name}`);
      cy.log(`Job: ${response.body.job}`);
      cy.log(`ID: ${response.body.id}`);
      cy.log(`Created At: ${response.body.createdAt}`);
    });
  });

  it("should update the created user, verify the response, and print the updated user details", () => {
    const updatedName = "Zulfiqar";
    const updatedJob = "QA";

    userPage
      .updateUser(createdUserId, updatedName, updatedJob)
      .then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("name", updatedName);
        expect(response.body).to.have.property("job", updatedJob);
        expect(response.body).to.have.property("updatedAt").that.is.a("string");

        cy.log("Updated User Details:");
        cy.log(`Name: ${response.body.name}`);
        cy.log(`Job: ${response.body.job}`);
        cy.log(`Updated At: ${response.body.updatedAt}`);
      });
  });

  it("should delete the updated user and verify it is deleted", () => {
    userPage.deleteUser(createdUserId).then((response) => {
      expect(response.status).to.equal(204);

      // Try to fetch the deleted user
      userPage.fetchUsers(createdUserId).then((getResponse) => {
        expect(getResponse.status).to.equal(200);
        cy.log("User is successfully deleted");
      });
    });
  });
});

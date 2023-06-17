import UserPage from "../../support/pages/userPage";
import TestData from "../../fixtures/testData";

describe("Fetch user data from specfic pages and verify", () => {
  const userPage = new UserPage();
  const testData = TestData.getUsersData();

  it("should return the correct response for fetching users on page 1", () => {
    const pageNumber = 1;

    userPage.fetchUsers(pageNumber).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an("object");

      const { page, per_page, total, total_pages, data, support } =
        response.body;

      expect(page).to.equal(1);
      expect(per_page).to.equal(6);
      expect(total).to.equal(12);
      expect(total_pages).to.equal(2);

      expect(data).to.be.an("array").and.to.have.lengthOf(6);

      data.forEach((user) => {
        expect(user).to.have.property("id").that.is.a("number");
        expect(user).to.have.property("email").that.is.a("string");
        expect(user).to.have.property("first_name").that.is.a("string");
        expect(user).to.have.property("last_name").that.is.a("string");
        expect(user).to.have.property("avatar").that.is.a("string");
      });

      expect(support).to.be.an("object");
      expect(support).to.have.property("url").that.is.a("string");
      expect(support).to.have.property("text").that.is.a("string");
    });
  });

  it("should fetch user data and find the specific record from page 2", () => {
    const pageNumber = 2;
    const expectedUser = testData.data.find((user) => user.id === 10);

    userPage.fetchUsers(pageNumber).then((response) => {
      const { data } = response.body;
      const foundUser = data.find(
        (user) =>
          user.id === expectedUser.id &&
          user.email === expectedUser.email &&
          user.first_name === expectedUser.first_name &&
          user.last_name === expectedUser.last_name &&
          user.avatar === expectedUser.avatar
      );

      expect(response.status).to.equal(200);
      expect(foundUser).to.not.be.undefined;
    });
  });

  it("should return the correct response for fetching users on page 2", () => {
    const pageNumber = 2;

    userPage.fetchUsers(pageNumber).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an("object");

      const { page, per_page, total, total_pages, data, support } =
        response.body;

      expect(page).to.equal(2);
      expect(per_page).to.equal(6);
      expect(total).to.equal(12);
      expect(total_pages).to.equal(2);

      expect(data).to.be.an("array").and.to.have.lengthOf(6);

      data.forEach((user) => {
        expect(user).to.have.property("id").that.is.a("number");
        expect(user).to.have.property("email").that.is.a("string");
        expect(user).to.have.property("first_name").that.is.a("string");
        expect(user).to.have.property("last_name").that.is.a("string");
        expect(user).to.have.property("avatar").that.is.a("string");
      });

      expect(support).to.be.an("object");
      expect(support).to.have.property("url").that.is.a("string");
      expect(support).to.have.property("text").that.is.a("string");
    });
  });

  it("should have unique user IDs", () => {
    const pageNumber = 2;

    userPage.fetchUsers(pageNumber).then((response) => {
      const { data } = response.body;
      const userIds = data.map((user) => user.id);

      expect(userIds).to.have.lengthOf(new Set(userIds).size);
    });
  });
});

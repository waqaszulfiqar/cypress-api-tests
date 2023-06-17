class UserPage {
  createUser(name, job) {
    const user = {
      name: name,
      job: job
    };

    return cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      body: user,
      headers: {
        'Content-Type': 'application/json',
        'accept': "application/json",
      }
    });
  }

  updateUser(userId, name, job) {
    const updatedUser = {
      name: name,
      job: job
    };

    return cy.request({
      method: 'PUT',
      url: `https://reqres.in/api/users/${userId}`,
      body: updatedUser,
      headers: {
        'Content-Type': 'application/json',
        'accept': "application/json",
      }
    });
  }

  deleteUser(userId) {
    return cy.request({
      method: 'DELETE',
      url: `https://reqres.in/api/users/${userId}`
    });
  }

  fetchUsers(pageNumber) {
    return cy.request({
      method: 'GET',
      url: `https://reqres.in/api/users?page=${pageNumber}`,
      headers: {
        'Content-Type': 'application/json',
        'accept': "application/json",
      }
    });
  }
}

export default UserPage;
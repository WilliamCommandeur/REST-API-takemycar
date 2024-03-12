class User {
  constructor(firstname, lastname, username, email, password, nationality, birthdate) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.email = email;
    this.password = password;
    this.nationality = nationality;
    this.birthdate = birthdate;
  }
}

module.exports = User;

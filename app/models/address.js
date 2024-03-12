class Address {
  constructor(city, country, street, zipcode, additionnal, ownerId) {
    this.city = city;
    this.country = country;
    this.street = street;
    this.zipcode = zipcode;
    this.additionnal = additionnal;
    this.ownerId = ownerId;
  }
}

module.exports = Address;

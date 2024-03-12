class Vehicle {
  constructor(type, nbPlaces, vehiclePlate, modele, price, ownerId) {
    this.type = type;
    this.nbPlaces = nbPlaces;
    this.vehiclePlate = vehiclePlate;
    this.modele = modele;
    this.price = price;
    this.ownerId = ownerId;
  }
}

module.exports = Vehicle;

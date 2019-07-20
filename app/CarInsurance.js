const Product = require('./Product').Product;

class CarInsurance extends Product {

  constructor(products = []) {
    super();
    this.products = products;
  }

  updatePrice() {
    for (var i = 0; i < this.products.length; i++) {
      this.products[i] = this.depreciate(this.products[i]);
    }
    return this.products;
  }
}

module.exports = {
  CarInsurance
}

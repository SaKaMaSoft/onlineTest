const expect = require('chai').expect;

const coTest = require('../app/CarInsurance');
const Product = require('../app/Product').Product;
const CarInsurance = coTest.CarInsurance;

const productsAtDayZero = [
  new Product('Medium Coverage', 10, 20),
  new Product('Full Coverage', 2, 0),
  new Product('Low Coverage', 5, 7),
  new Product('Mega Coverage', 0, 80),
  new Product('Mega Coverage', -1, 80),
  new Product('Special Full Coverage', 15, 20),
  new Product('Special Full Coverage', 10, 49),
  new Product('Special Full Coverage', 5, 49),
  new Product('Super Sale', 3, 6),
];

describe("[CarInsurance]", function () {

  describe("[Medium Coverage Product]", function () {
    it("Standard price update", function () {
      const coTest = new CarInsurance([new Product('Medium Coverage', 10, 20)]);
      const products = coTest.updatePrice();
      const product = new Product('Medium Coverage', 9, 19);
      expect(products[0]).to.eql(product);
    });

    it("SellIn < 0 should update price in -2", function () {
      const coTest = new CarInsurance([new Product('Medium Coverage', -1, 20)]);
      const products = coTest.updatePrice();
      const product = new Product('Medium Coverage', -2, 18);
      expect(products[0]).to.eql(product);
    });
  });

  describe("[Full Coverage Product]", function () {
    it("Standard price update", function () {
      const coTest = new CarInsurance([new Product('Full Coverage', 2, 0)]);
      const products = coTest.updatePrice();
      const product = new Product('Full Coverage', 1, 1);
      expect(products[0]).to.eql(product);
    });

    it("SellIn < 0 should update price in +2", function () {
      const coTest = new CarInsurance([new Product('Full Coverage', -1, 20)]);
      const products = coTest.updatePrice();
      const product = new Product('Full Coverage', -2, 22);
      expect(products[0]).to.eql(product);
    });
  });

  describe("[Low Coverage Product]", function () {
    it("Standard price update", function () {
      const coTest = new CarInsurance([new Product('Low Coverage', 5, 7)]);
      const products = coTest.updatePrice();
      const product = new Product('Low Coverage', 4, 6);
      expect(products[0]).to.eql(product);
    });

    it("SellIn < 0 should update price in -2", function () {
      const coTest = new CarInsurance([new Product('Low Coverage', -1, 20)]);
      const products = coTest.updatePrice();
      const product = new Product('Low Coverage', -2, 18);
      expect(products[0]).to.eql(product);
    });
  });

  describe("[Mega Coverage Product]", function () {
    it("Standard price update", function () {
      const coTest = new CarInsurance([new Product('Mega Coverage', 0, 80)]);
      const products = coTest.updatePrice();
      const product = new Product('Mega Coverage', 0, 80);
      expect(products[0]).to.eql(product);
    });

    it("SellIn < 0 should update price in -2", function () {
      const coTest = new CarInsurance([new Product('Mega Coverage', -1, 20)]);
      const products = coTest.updatePrice();
      const product = new Product('Mega Coverage', -1, 20);
      expect(products[0]).to.eql(product);
    });
  });

  describe("[Special Full Coverage Product]", function () {
    it("Standard price update", function () {
      const coTest = new CarInsurance([new Product('Special Full Coverage', 15, 20)]);
      const products = coTest.updatePrice();
      const product = new Product('Special Full Coverage', 14, 21);
      expect(products[0]).to.eql(product);
    });

    it("SellIn <= 10 days update price in +2", function () {
      const coTest = new CarInsurance([new Product('Special Full Coverage', 9, 20)]);
      const products = coTest.updatePrice();
      const product = new Product('Special Full Coverage', 8, 22);
      expect(products[0]).to.eql(product);
    });

    it("SellIn <= 5 days update price in +3", function () {
      const coTest = new CarInsurance([new Product('Special Full Coverage', 5, 20)]);
      const products = coTest.updatePrice();
      const product = new Product('Special Full Coverage', 4, 23);
      expect(products[0]).to.eql(product);
    });

    it("SellIn < 0 should put price in 0.", function () {
      const coTest = new CarInsurance([new Product('Special Full Coverage', -1, 20)]);
      const products = coTest.updatePrice();
      const product = new Product('Special Full Coverage', -2, 0);
      expect(products[0]).to.eql(product);
    });

  });

  // new Product('Super Sale', 3, 6)

  describe("Border Case", function () {
    it("Price < 0 and different FC, SFC", function () {
      const coTest = new CarInsurance([new Product('Medium Coverage', 10, -10)]);
      const products = coTest.updatePrice();
      const product = new Product('Medium Coverage', 9, -10);
      expect(products[0]).to.eql(product);
    });

    it("Price > 50 and Full Coverage", function () {
      const coTest = new CarInsurance([new Product('Full Coverage', 10, 50)]);
      const products = coTest.updatePrice();
      const product = new Product('Full Coverage', 9, 50);
      expect(products[0]).to.eql(product);
    });
  });

});

const expect = require('chai').expect;

const carInsurance = require('../app/CarInsurance');
const Product = require('../app/Product').Product;
const CarInsurance = carInsurance.CarInsurance;

describe("[CarInsurance]", function () {

  describe("[Medium Coverage Product]", function () {
    it("Standard price update", function () {
      const carInsurance = new CarInsurance([new Product('Medium Coverage', 10, 20)]);
      const products = carInsurance.updatePrice();
      const product = new Product('Medium Coverage', 9, 19);
      expect(products[0]).to.eql(product);
    });

    it("SellIn < 0 should update price in -2", function () {
      const carInsurance = new CarInsurance([new Product('Medium Coverage', -1, 20)]);
      const products = carInsurance.updatePrice();
      const product = new Product('Medium Coverage', -2, 18);
      expect(products[0]).to.eql(product);
    });
  });

  describe("[Full Coverage Product]", function () {
    it("Standard price update", function () {
      const carInsurance = new CarInsurance([new Product('Full Coverage', 2, 0)]);
      const products = carInsurance.updatePrice();
      const product = new Product('Full Coverage', 1, 1);
      expect(products[0]).to.eql(product);
    });

    it("SellIn < 0 should update price in +2", function () {
      const carInsurance = new CarInsurance([new Product('Full Coverage', -1, 20)]);
      const products = carInsurance.updatePrice();
      const product = new Product('Full Coverage', -2, 22);
      expect(products[0]).to.eql(product);
    });

    it("Price > 50 and SellIn < 0 should dont change price", function () {
      const carInsurance = new CarInsurance([new Product('Full Coverage', -1, 51)]);
      const products = carInsurance.updatePrice();
      const product = new Product('Full Coverage', -2, 51);
      expect(products[0]).to.eql(product);
    });
  });

  describe("[Low Coverage Product]", function () {
    it("Standard price update", function () {
      const carInsurance = new CarInsurance([new Product('Low Coverage', 5, 7)]);
      const products = carInsurance.updatePrice();
      const product = new Product('Low Coverage', 4, 6);
      expect(products[0]).to.eql(product);
    });

    it("SellIn < 0 should update price in -2", function () {
      const carInsurance = new CarInsurance([new Product('Low Coverage', -1, 20)]);
      const products = carInsurance.updatePrice();
      const product = new Product('Low Coverage', -2, 18);
      expect(products[0]).to.eql(product);
    });
  });

  describe("[Mega Coverage Product]", function () {
    it("Shouln't change values", function () {
      const carInsurance = new CarInsurance([new Product('Mega Coverage', 0, 80)]);
      const products = carInsurance.updatePrice();
      const product = new Product('Mega Coverage', 0, 80);
      expect(products[0]).to.eql(product);
    });

    it("SellIn < 0 should shouldn't change values", function () {
      const carInsurance = new CarInsurance([new Product('Mega Coverage', -1, 20)]);
      const products = carInsurance.updatePrice();
      const product = new Product('Mega Coverage', -1, 20);
      expect(products[0]).to.eql(product);
    });
  });

  describe("[Special Full Coverage Product]", function () {
    it("Should update price +1", function () {
      const carInsurance = new CarInsurance([new Product('Special Full Coverage', 15, 20)]);
      const products = carInsurance.updatePrice();
      const product = new Product('Special Full Coverage', 14, 21);
      expect(products[0]).to.eql(product);
    });

    it("SellIn <= 10 days update price in +2", function () {
      const carInsurance = new CarInsurance([new Product('Special Full Coverage', 9, 20)]);
      const products = carInsurance.updatePrice();
      const product = new Product('Special Full Coverage', 8, 22);
      expect(products[0]).to.eql(product);
    });

    it("SellIn <= 5 days update price in +3", function () {
      const carInsurance = new CarInsurance([new Product('Special Full Coverage', 5, 20)]);
      const products = carInsurance.updatePrice();
      const product = new Product('Special Full Coverage', 4, 23);
      expect(products[0]).to.eql(product);
    });

    it("SellIn < 0 should put price in 0.", function () {
      const carInsurance = new CarInsurance([new Product('Special Full Coverage', -1, 20)]);
      const products = carInsurance.updatePrice();
      const product = new Product('Special Full Coverage', -2, 0);
      expect(products[0]).to.eql(product);
    });

    it("SellIn = 0 and price > 50 should update price in 0.", function () {
      const carInsurance = new CarInsurance([new Product('Special Full Coverage', 0, 52)]);
      const products = carInsurance.updatePrice();
      const product = new Product('Special Full Coverage', -1, 0);
      expect(products[0]).to.eql(product);
    });

    it("SellIn < 10 and price > 50 should maintain price", function () {
      const carInsurance = new CarInsurance([new Product('Special Full Coverage', 9, 51)]);
      const products = carInsurance.updatePrice();
      const product = new Product('Special Full Coverage', 8, 51);
      expect(products[0]).to.eql(product);
    });
  });

  describe("[Super Sale Product]", function () {
    it("Should update price in +2", function () {
      const carInsurance = new CarInsurance([new Product('Super Sale', 15, 20)]);
      const products = carInsurance.updatePrice();
      const product = new Product('Super Sale', 14, 18);
      expect(products[0]).to.eql(product);
    });

    it("SellIn < 0 should update price +4.", function () {
      const carInsurance = new CarInsurance([new Product('Super Sale', -1, 20)]);
      const products = carInsurance.updatePrice();
      const product = new Product('Super Sale', -2, 16);
      expect(products[0]).to.eql(product);
    });
  });

  describe("New Product", function () {
    it("Standard price update.", function () {
      const carInsurance = new CarInsurance([new Product('New Product', 10, 20)]);
      const products = carInsurance.updatePrice();
      const product = new Product('New Product', 9, 19);
      expect(products[0]).to.eql(product);
    });

    it("SellIn < 0 should update price in -2", function () {
      const carInsurance = new CarInsurance([new Product('New Product', -1, 20)]);
      const products = carInsurance.updatePrice();
      const product = new Product('New Product', -2, 18);
      expect(products[0]).to.eql(product);
    });
  });

  describe("Border Case", function () {

    it("Price < 0 and different FC, SFC", function () {
      const carInsurance = new CarInsurance();
      const products = carInsurance.updatePrice();
      expect(products[0]).to.be.an('undefined');
    });

    it("Price < 0 and different FC, SFC", function () {
      const carInsurance = new CarInsurance([new Product('Medium Coverage', 10, -10)]);
      const products = carInsurance.updatePrice();
      const product = new Product('Medium Coverage', 9, -10);
      expect(products[0]).to.eql(product);
    });

    it("Price > 50 and Full Coverage", function () {
      const carInsurance = new CarInsurance([new Product('Full Coverage', 10, 50)]);
      const products = carInsurance.updatePrice();
      const product = new Product('Full Coverage', 9, 50);
      expect(products[0]).to.eql(product);
    });

    it("Price < 0 and SellIn < 0 different FC, SFC should change price.", function () {
      const carInsurance = new CarInsurance([new Product('Medium Coverage', -1, -1)]);
      const products = carInsurance.updatePrice();
      const product = new Product('Medium Coverage', -2, -1);
      expect(products[0]).to.eql(product);
    });

  });

});

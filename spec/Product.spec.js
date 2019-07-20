const expect = require('chai').expect;

const Product = require('../app/Product').Product;
const products = [
  new Product('Medium Coverage', 9, 19),
  new Product('Full Coverage', 14, 21),
  new Product('Low Coverage', 5, 7),
  new Product('Mega Coverage', -1, 80),
  new Product('Special Full Coverage', 14, 21),
  new Product('Super Sale', 9, 18),
  new Product('New Product', 14, 19),
];


describe("[Product]", function () {

  describe("[getType]", function () {
    it("Should be ST", function () {
      expect(products[0].getType()).to.eql('ST');
    });
    it("Should be FC", function () {
      expect(products[1].getType()).to.eql('FC');
    });
    it("Should be ST", function () {
      expect(products[2].getType()).to.eql('ST');
    });
    it("Should be MC", function () {
      expect(products[3].getType()).to.eql('MC');
    });
    it("Should be SFC", function () {
      expect(products[4].getType()).to.eql('SFC');
    });
    it("Should be SS", function () {
      expect(products[5].getType()).to.eql('SS');
    });
    it("Should be ST", function () {
      expect(products[6].getType()).to.eql('ST');
    });
  });

  describe("[depreciate]", function () {
    it("Should be return Product with calculateStandard", function () {
      const product = new Product('Medium Coverage', 10, 20);
      expect(product.depreciate(product)).to.eql(products[0]);
    });
    it("Should be return Product with personalized calculateStandard", function () {
      const product = new Product('Super Sale', 10, 20);
      expect(product.depreciate(product)).to.eql(products[5]);
    });
    it("Should be return Product with calculateSFC", function () {
      const product = new Product('Special Full Coverage', 15, 20);
      expect(product.depreciate(product)).to.eql(products[4]);
    });
    it("Should be return Product with calculateFC", function () {
      const product = new Product('Full Coverage', 15, 20);
      expect(product.depreciate(product)).to.eql(products[1]);
    });
    it("Should be return Product with calculateStandard", function () {
      const product = new Product('New Product', 15, 20);
      expect(product.depreciate(product)).to.eql(products[6]);
    });
    it("Should be return the same values", function () {
      const product = new Product();
      const info = { type: 'XX' };
      expect(product.depreciate(info)).to.eql(info);
    });
  });

  describe("[calculateSellIn]", function () {
    it("Should return same days", function () {
      const product = new Product();
      expect(product.calculateSellIn(10, 'MC')).to.equal(10);
    });
    it("Should return days -1", function () {
      const product = new Product();
      expect(product.calculateSellIn(10, 'XX')).to.equal(9);
    });
  });

  describe("[calculateStandard]", function () {
    it("Should return standard price calculated", function () {
      const info = { price: 10, sellIn: 5, type: 'XX' };
      const product = new Product();
      const depProduct = { price: 9, sellIn: 4, type: 'XX' };
      expect(product.calculateStandard(info)).to.eql(depProduct);
    });
    it("Should return days -1 and same price", function () {
      const info = { price: -10, sellIn: 5, type: 'XX' };
      const product = new Product();
      const depProduct = { price: -10, sellIn: 4, type: 'XX' };
      expect(product.calculateStandard(info)).to.eql(depProduct);
    });
    it("Should return days -1 and price +2", function () {
      const info = { price: 10, sellIn: -5, type: 'XX' };
      const product = new Product();
      const depProduct = { price: 8, sellIn: -6, type: 'XX' };
      expect(product.calculateStandard(info)).to.eql(depProduct);
    });
  });

  describe("[calculateSFC]", function () {
    it("Should return calculateSFC price calculated", function () {
      const info = { price: 10, sellIn: 5, type: 'XX' };
      const product = new Product();
      const depProduct = { price: 13, sellIn: 4, type: 'XX' };
      expect(product.calculateSFC(info)).to.eql(depProduct);
    });
    it("Should return days -1 and price +3", function () {
      const info = { price: 1, sellIn: 5, type: 'XX' };
      const product = new Product();
      const depProduct = { price: 4, sellIn: 4, type: 'XX' };
      expect(product.calculateSFC(info)).to.eql(depProduct);
    });
    it("Should return days -1 and price 0", function () {
      const info = { price: 10, sellIn: -5, type: 'XX' };
      const product = new Product();
      const depProduct = { price: 0, sellIn: -6, type: 'XX' };
      expect(product.calculateSFC(info)).to.eql(depProduct);
    });
    it("Should return days -1 and price 0 when price > 50", function () {
      const info = { price: 51, sellIn: -5, type: 'XX' };
      const product = new Product();
      const depProduct = { price: 0, sellIn: -6, type: 'XX' };
      expect(product.calculateSFC(info)).to.eql(depProduct);
    });
  });

  describe("[calculateFC]", function () {
    it("Should return calculateFC price calculated", function () {
      const info = { price: 10, sellIn: 5, type: 'XX' };
      const product = new Product();
      const depProduct = { price: 11, sellIn: 4, type: 'XX' };
      expect(product.calculateFC(info)).to.eql(depProduct);
    });
    it("Should return days -1 and price +3", function () {
      const info = { price: 1, sellIn: 5, type: 'XX' };
      const product = new Product();
      const depProduct = { price: 2, sellIn: 4, type: 'XX' };
      expect(product.calculateFC(info)).to.eql(depProduct);
    });
    it("Should return days -1 and price 0", function () {
      const info = { price: 10, sellIn: -5, type: 'XX' };
      const product = new Product();
      const depProduct = { price: 12, sellIn: -6, type: 'XX' };
      expect(product.calculateFC(info)).to.eql(depProduct);
    });
    it("Should return days -1 and price 0", function () {
      const info = { price: 51, sellIn: -5, type: 'XX' };
      const product = new Product();
      const depProduct = { price: 51, sellIn: -6, type: 'XX' };
      expect(product.calculateFC(info)).to.eql(depProduct);
    });
  });

  describe("[getIncreaseFactor]", function () {
    it("Should return same days", function () {
      const product = new Product();
      expect(product.getIncreaseFactor(10)).to.equal(2);
    });
    it("Should return days -1", function () {
      const product = new Product();
      expect(product.getIncreaseFactor(3)).to.equal(3);
    });
  });
});

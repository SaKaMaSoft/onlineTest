class Product {
  constructor(name, sellIn, price) {
    this.name = name;
    this.sellIn = sellIn;
    this.price = price;
    this.type = this.getType(this.name);
  }

  getType() {
    let type = '';
    switch (this.name) {
      case 'Medium Coverage':
        type = 'ST';
        break;
      case 'Full Coverage':
        type = 'FC';
        break;
      case 'Low Coverage':
        type = 'ST';
        break;
      case 'Mega Coverage':
        type = 'MC';
        break;
      case 'Special Full Coverage':
        type = 'SFC';
        break;
      case 'Super Sale':
        type = 'SS';
        break;
      default:
        type = 'ST';
        break;
    }
    return type;
  }

  depreciate(info) {
    let product = {};
    switch (info.type) {
      case 'ST':
        product = this.calculateStandard(info);
        break;
      case 'SS':
        product = this.calculateStandard(info, 2);
        break;
      case 'SFC':
        product = this.calculateSFC(info);
        break;
      case 'FC':
        product = this.calculateFC(info);
        break;
      default:
        product = info;
        break;
    }
    // console.log(product);
    return product;
  }

  calculateSellIn(sellIn, type) {
    let days = sellIn;
    if (type !== 'MC') {
      days = days - 1;
    }
    return days;
  }

  calculateStandard(info, factor = 1) {
    const product = info;
    product.sellIn = this.calculateSellIn(info.sellIn, info.type);
    if (info.price > 0) {
      product.price = product.price - factor;
      if (info.sellIn < 0) {
        product.price = product.price - factor;
      }
    }
    return product;
  }

  calculateSFC(info) {
    const product = info;
    const factor = this.getIncreaseFactor(product.sellIn);
    product.sellIn = this.calculateSellIn(info.sellIn, info.type);
    if (info.price < 50) {
      product.price = product.price + factor;
    }
    if (info.sellIn < 0) {
      product.price = 0;
    }
    return product;
  }

  calculateFC(info, factor = 1) {
    const product = info;
    product.sellIn = this.calculateSellIn(info.sellIn, info.type);
    if (info.price < 50) {
      product.price = product.price + factor;
      if (info.sellIn < 0) {
        product.price = product.price + 1;
      }
    }
    return product;
  }

  getIncreaseFactor(days) {
    let factor = 1;
    if (days < 6) {
      factor += 2;
    } else if (days < 11) {
      factor += 1;
    }
    return factor;
  }
}

module.exports = {
  Product
}

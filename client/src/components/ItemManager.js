export class ItemManager {
  constructor() {
    this.items = {}
  }

  getItems = () => this.items

  addItem = (item) => {
    if (this.doesNotExist(item)) {
      this.items[item.name.toLowerCase()] = item
      console.log('successfully added item')
    }
    else console.log('duplicate not added')
  }

  doesNotExist(item) {
    return this.items[item.name.toLowerCase()] === undefined
  }
}

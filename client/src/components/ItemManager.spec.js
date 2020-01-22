import { ItemManager } from './ItemManager'

describe('ItemManager', () => {
  test('should return when getting an empty list', () => {
    const itemManager = new ItemManager()
    expect(itemManager.getItems()).toEqual({})
  })

  const testItem = {
    name: 'bob', 
    size: 'XL', 
    comment: 'this is cool'
  }

  test('it should be able to add items to stor', () => {
    const itemManager = new ItemManager()
    itemManager.addItem(testItem)
    expect(itemManager.getItems()).toEqual({
      [testItem.name]: testItem
    })
  })

  const testItem2 = {
    name: 'bob', 
    size: 'S', 
    comment: 'some other'
  }
  
  test('duplictes will not be added and will log to console', () => {
    const itemManager = new ItemManager()

    const consoleLog = console.log
    const consoleOutPut = [];
    console.log = (text) => consoleOutPut.push(text);

    itemManager.addItem(testItem)
    itemManager.addItem(testItem2)

    const messageExists = (arr) => arr.includes('duplicate not added');
    expect(messageExists(consoleOutPut)).toBe(true);
    expect(itemManager.getItems()).toEqual({
      [testItem.name]: testItem
    })
    
    console.log = consoleLog;
  })

  

  const testItem3 = {
    name: 'BOB', 
    size: 'S', 
    comment: 'some other'
  }

  test('names are not case specific', () => {
    const itemManager = new ItemManager()
    itemManager.addItem(testItem)
    itemManager.addItem(testItem3)

    expect(itemManager.getItems()).toEqual({
      [testItem.name]: testItem
    })
  })
})
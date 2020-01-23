import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import TableList from "./TableList";
import '@testing-library/jest-dom';
import { ItemManager } from "./ItemManager"

afterEach(cleanup);

test("Table List exists (canary)", () => {
  const { getByTestId } = render(<TableList itemManager={new ItemManager()}/>);
  const taElement = getByTestId("input-listwrapper");
  expect(taElement).toBeInTheDocument();
});

test("Table Row Count is equal to data count", () => {
  const itemManager = new ItemManager();
  itemManager.addItem({
    name: 'bob', 
    size: 'XL', 
    comment: 'this is cool',
    status: false
  });
  itemManager.addItem({
    name: 'bobby', 
    size: 'XL', 
    comment: 'this is cool',
    status: false
  });
  const { getByTestId } = render(<TableList itemManager={itemManager}/>);
  const taElement = getByTestId("test-row-count");
  const boolean = Boolean(taElement.getAttribute('value'));
  expect(boolean).toBe(true);
});

test("Checkmark Status", () => {
  const itemManager = new ItemManager();
  itemManager.addItem({
    name: 'bob', 
    size: 'XL', 
    comment: 'this is cool',
    status: false
  });

  const { getByTestId } = render(<TableList itemManager={itemManager}/>);
  const taElement = getByTestId("check");
  fireEvent.click(taElement);

  expect(taElement.checked).toBe(true);
});

test('should add input field to row when row is checked', () => {
  const itemManager = new ItemManager();
  itemManager.addItem({
    name: 'bob', 
    size: 'XL', 
    comment: 'this is cool',
    status: false
  });

  const { getByTestId } = render(<TableList itemManager={itemManager}/>);
  const taElement = getByTestId("check");
  fireEvent.click(taElement);

  const quantityField = getByTestId("quantity");
  expect(quantityField).toBeInTheDocument();

  fireEvent.click(taElement);
  expect(() => {getByTestId("quantity")}).toThrowError();
})

test('shoud save quantity to model when add button is clicked', () => {
  const itemManager = new ItemManager();
  itemManager.addItem({
    name: 'bob', 
    size: 'XL', 
    comment: 'this is cool',
    status: false
  });

  console.log(itemManager)

  const { getByTestId } = render(<TableList itemManager={itemManager}/>);
  const taElement = getByTestId("check");
  fireEvent.click(taElement);

  const quantityField = getByTestId("quantity");
  fireEvent.change(quantityField, { target: { value: '999' } });

  // const addButton = getByTestId("add");
  // fireEvent.click(addButton)

  console.log(itemManager)

  expect(itemManager.getItems()['bob'].quantity).toBe('999');

})
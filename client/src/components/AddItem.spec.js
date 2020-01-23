import React from 'react';
import AddItem from './AddItem';

import '@testing-library/jest-dom';

import { render, fireEvent } from "@testing-library/react";
import { ItemManager } from "./ItemManager"

describe('AddItem', () => {
  const consoleLog = console.log
  test('canary verifies test infrastructure', () => {
     expect(true).toEqual(true);
  });

  test('form should have fields for "name, size and comment"', () => {
    const { getByTestId } = render(<AddItem itemManager={new ItemManager()}/>);

    const name = getByTestId(/name/);
    expect(name).toBeInTheDocument();

    const size = getByTestId(/size/);
    expect(size).toBeInTheDocument();

    const comment = getByTestId(/comment/);
    expect(comment).toBeInTheDocument();

    const submit = getByTestId(/submit/);
    expect(submit).toBeInTheDocument();
  });

  const setup = (utils, testId) => {
    const input = utils.getByTestId(testId);
    return {
      input,
      ...utils,
    }
  }

  test('it should clear all input fields upone cliking submit', () => {
    const utils = render(<AddItem itemManager={new ItemManager()}/>);
    const submit = utils.getByTestId('submit');

    //adds text to name input
    const name = setup(utils, 'name');
    fireEvent.change(name.input, { target: { value: 'Bob Trufant' } });
    expect(name.input.value).toBe('Bob Trufant');

    //adds text to size input
    const size = setup(utils, 'size');
    fireEvent.change(size.input, { target: { value: 'Bob Trufant' } });
    expect(size.input.value).toBe('Bob Trufant');

    //adds text to comments input
    const comment = setup(utils, 'comment');
    fireEvent.change(comment.input, { target: { value: 'Bob Trufant' } });
    expect(comment.input.value).toBe('Bob Trufant');

    //adds text to store location input
    const store0 = setup(utils, 'store-0');
    fireEvent.change(store0.input, { target: { value: 'Bob Trufant' } });
    expect(store0.input.value).toBe('Bob Trufant');

    //adds text to aisle location input
    const aisle0 = setup(utils, 'aisle-0');
    fireEvent.change(aisle0.input, { target: { value: 'Bob Trufant' } });
    expect(aisle0.input.value).toBe('Bob Trufant');

    //clicks submit button
    fireEvent.click(submit);
    expect(name.input.value).toBe('');
    expect(size.input.value).toBe('');
    expect(comment.input.value).toBe('');
    expect(store0.input.value).toBe('');
    expect(aisle0.input.value).toBe('');
  });

  test('form should log to console upon successful submit', () => {
    const utils = render(<AddItem itemManager={new ItemManager()}/>);
    const submit = utils.getByTestId('submit');

    //mock console log
    const consoleOutPut = [];
    console.log = (text) => consoleOutPut.push(text);

    //adds text to name input
    const name = setup(utils, 'name');
    fireEvent.change(name.input, { target: { value: 'Bob Trufant' } });
    expect(name.input.value).toBe('Bob Trufant');

    //submit item
    fireEvent.click(submit);

    //tests if console log operation occurred
    const messageExists = (arr) => arr.includes('successfully added item');
    expect(messageExists(consoleOutPut)).toBe(true);

    console.log = consoleLog;
  });

  test('it should update the itemList list', () => {
    const itemManager = new ItemManager()
    const utils = render(<AddItem itemManager={itemManager} />);
    const submit = utils.getByTestId('submit');

    //adds text to name input
    const name = setup(utils, 'name');
    fireEvent.change(name.input, { target: { value: 'Bob Trufant' } });

    //adds text to size input
    const size = setup(utils, 'size');
    fireEvent.change(size.input, { target: { value: 'Bob Trufant' } });

    //adds text to comments input
    const comment = setup(utils, 'comment');
    fireEvent.change(comment.input, { target: { value: 'Bob Trufant' } });

    //clicks submit button
    fireEvent.click(submit);

    expect(itemManager.getItems()).toEqual({
      'bob trufant': {
        name: 'Bob Trufant',
        size: 'Bob Trufant',
        comment: 'Bob Trufant',
        locations: []
      }
    })
  })

  test('clicking plus adds new location row', () => {
    const utils = render(<AddItem itemManager={new ItemManager()}/>);
    const addLocation = utils.getByTestId('addLocation');

    fireEvent.click(addLocation);

    const store1 = utils.getByTestId(/store-1/);
    const aisle1 = utils.getByTestId(/aisle-1/);

    expect(store1).toBeInTheDocument();
    expect(aisle1).toBeInTheDocument();
  })

  test('should save location input data to state', () => {
    const utils = render(<AddItem itemManager={new ItemManager()}/>);

    const store0 = setup(utils, 'store-0');
    fireEvent.change(store0.input, { target: { value: 'Bob Trufant' } });
    expect(store0.input.value).toBe('Bob Trufant');

    const aisle0 = setup(utils, 'aisle-0');
    fireEvent.change(aisle0.input, { target: { value: 'Bob Trufant' } });
    expect(aisle0.input.value).toBe('Bob Trufant');
  })

  test('should add locations to itemManger upon submit', () => {
    const itemManager = new ItemManager();
    const utils = render(<AddItem itemManager={itemManager}/>); 
    const submit = utils.getByTestId('submit');

    const name = setup(utils, 'name');
    fireEvent.change(name.input, { target: { value: 'Bob Trufant' } });

    const store0 = setup(utils, 'store-0');
    fireEvent.change(store0.input, { target: { value: 'Bob Trufant' } });

    const aisle0 = setup(utils, 'aisle-0');
    fireEvent.change(aisle0.input, { target: { value: 'Bob Trufant' } });

    fireEvent.click(submit);

    expect(itemManager.getItems()['bob trufant'].locations).toEqual([['Bob Trufant', 'Bob Trufant']])
  })

  test('should purge emtpy location rows', () => {
    const itemManager = new ItemManager()
    const utils = render(<AddItem itemManager={itemManager}/>);
    const addLocation = utils.getByTestId('addLocation');
    const submit = utils.getByTestId('submit');

    const name = setup(utils, 'name');
    fireEvent.change(name.input, { target: { value: 'Bob Trufant' } });

    fireEvent.click(addLocation);

    const store1 = setup (utils, 'store-1');
    fireEvent.change(store1.input, { target: { value: 'Bob Trufant' } });
    const aisle1 = setup (utils, 'aisle-1');
    fireEvent.change(aisle1.input, { target: { value: 'Bob Trufant' } });


    fireEvent.click(submit);

    expect(itemManager.getItems()['bob trufant'].locations.length).toBe(1)
  })

});

import React from 'react';
import ReactDOM from 'react-dom';
import ItemsForm from './ItemsForm';

import '@testing-library/jest-dom';

import { render, fireEvent } from "@testing-library/react";

describe('ItemsForm', () => {
  test('canary verifies test infrastructure', () => {
     expect(true).toEqual(true);
  });

  test('form should have fields for "name, size and comment"', () => {
    const { getByTestId } = render(<ItemsForm />);

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
    const utils = render(<ItemsForm />);
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

    //clicks submit button
    fireEvent.click(submit);
    expect(name.input.value).toBe('');
    expect(size.input.value).toBe('');
    expect(comment.input.value).toBe('');
  })

  test('form should submit if name is empty', () => {
    const utils = render(<ItemsForm />);
    const submit = utils.getByTestId('submit');

    //adds text to name input
    const name = setup(utils, 'name');
    fireEvent.change(name.input, { target: { value: 'Bob Trufant' } });
    expect(name.input.value).toBe('Bob Trufant');

    //clears test from name imput
    fireEvent.change(name.input, { target: { value: '' } });
    expect(name.input.value).toBe('');

    fireEvent.click(submit);
    console.log(Object.keys(name.input[Object.keys(name.input)[0]].stateNode))
    // expect(name).toBe(true);
  })
});

import { render, screen } from '@testing-library/react';
import App from './App';
import useFetch from "./services/useFetch";
import {getBusinessTrips} from "./services/tripsService";

//
// test('the fetch fails with an error', async () => {
//   await expect(getBusinessTrips()).rejects.toMatch('error');
// });

// test('the data is peanut butter', async () => {
//   await expect(getBusinessTrips()).resolves.toContain('San Francisco World Trade Center on new Server/IOT/Client ');
// });

//
// test('the data is peanut butter', async () => {
//   await expect(useFetch()).resolves.toBe('peanut butter');
// });

//----
  const sum = function sum(a, b) {
    return a + b;
  }
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

//----
  test('two plus two is four', () => {
    expect(2 + 2).toBe(4);
  });


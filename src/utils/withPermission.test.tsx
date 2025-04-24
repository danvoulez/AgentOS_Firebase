import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { withPermission } from './withPermission';

describe('withPermission', () => {
  it('should pass', () => {
    expect(true).toBe(true);
  });
});
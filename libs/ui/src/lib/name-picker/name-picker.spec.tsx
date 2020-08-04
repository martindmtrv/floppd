import React from 'react';
import { render } from '@testing-library/react';

import NamePicker from './name-picker';

describe(' NamePicker', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NamePicker />);
    expect(baseElement).toBeTruthy();
  });
});

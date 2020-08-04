import React from 'react';
import { render } from '@testing-library/react';

import EventCreator from './event-creator';

describe(' EventCreator', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EventCreator />);
    expect(baseElement).toBeTruthy();
  });
});

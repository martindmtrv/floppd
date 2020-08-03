import React from 'react';
import { render } from '@testing-library/react';

import DarkmodeTrigger from './darkmode-trigger';

describe(' DarkmodeTrigger', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DarkmodeTrigger />);
    expect(baseElement).toBeTruthy();
  });
});

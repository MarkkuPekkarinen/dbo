import locales from '@/locales';
import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest';
import AboutPanel from './AboutPanel';

describe('AboutPanel.tsx', () => {
  test('should render the the about panel', () => {
    render(
      <MemoryRouter>
        <AboutPanel />
      </MemoryRouter>
    );
    expect(screen.getAllByText(locales.releases_url)).not.toBeNull();
    expect(screen.getAllByText(locales.report_an_issue)).not.toBeNull();
  });

  test('should show app version when platform is desktop', () => {
    process.env.VITE_VERSION = 'VITE_VERSION';

    render(
      <MemoryRouter>
        <AboutPanel />
      </MemoryRouter>
    );
    expect(screen.getAllByText('VITE_VERSION')).not.toBeNull();
  });
});

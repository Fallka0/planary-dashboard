import React from 'react';
import type { ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import '../styles/fonts.css';
import '../styles/transitions.css';
import '../lib/transitions';
import '../lib/analytics';

export function mount(page: ReactNode) {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<React.StrictMode>{page}</React.StrictMode>);
}

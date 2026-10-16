import React from 'react';
import type { ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import '../styles/fonts.css';

export function mount(page: ReactNode) {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<React.StrictMode>{page}</React.StrictMode>);
}

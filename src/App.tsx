import { pageFor } from './pages/routes';

export default function App() {
  return pageFor(window.location.pathname);
}

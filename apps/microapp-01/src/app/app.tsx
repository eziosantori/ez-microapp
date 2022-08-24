// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import NxWelcome from './nx-welcome';
import Button from '@mui/material/Button';

export function App() {
  return (
    <>
      {/* <NxWelcome title="microapp-01" /> */}
      <Button variant="contained">Hello World</Button>
      <div />
    </>
  );
}

export default App;

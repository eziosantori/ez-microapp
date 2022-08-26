// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import NxWelcome from './nx-welcome';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { useEffect, useState } from 'react';
import { FramePostMessage } from '@ez-microapp/contracts';

export function App() {
  const [uid, setUid] = useState<string | null>("");

  useEffect(()=> {
    const queryParams = new URLSearchParams(window.location.search)
    const uidP = queryParams.get("uid")
    // const location = queryParams.get("location")
    setUid(uidP);
  }, []);

  const onItemClick = (name: string) => {
    const data: FramePostMessage = {
      source: 'ez-microapp',
      uid,
      message: `You clicked ${name}}`,
      value: Date.now(),
    };
    // Called from the iframe
    window.parent.postMessage(data, '*');
    console.log(data);
  };

  return (
    <>
      {/* <NxWelcome title="microapp-01" /> */}
      <Button variant="contained">Hello World</Button>
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => onItemClick("Inbox")}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => onItemClick("Drafts")}>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Drafts" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider />
      <nav aria-label="secondary mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => onItemClick("Trash")}>
              <ListItemText primary="Trash" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => onItemClick("Spam")}>
              <ListItemText primary="Spam" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
    </>
  );
}

export default App;

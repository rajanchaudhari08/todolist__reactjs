/* Import React.js Hooks */

import { Fragment, useState, useRef, useEffect } from "react";

/* Import Mantine Core Components */

import {
  Modal,
  Group,
  Container,
  Card,
  Code,
  Text,
  TextInput,
  Button,
  Title,
  ActionIcon,
} from "@mantine/core";

import { MantineProvider, ColorSchemeProvider } from "@mantine/core";

/* Import Mantine Hooks (State & UI Management)  */

import { useColorScheme, useHotkeys, useLocalStorage } from "@mantine/hooks";

/* Import Tabler Icons */

import { Sun, MoonStars, Trash } from "tabler-icons-react";

const App = () => {
  return (
    <Fragment>
      <ColorSchemeProvider>
        <MantineProvider>
          <Modal>
            <TextInput></TextInput>
            <TextInput></TextInput>
            <Group>
              <Button></Button>
              <Button></Button>
            </Group>
          </Modal>
          <Container>
            <Group>
              <Title></Title>
              <ActionIcon></ActionIcon>
            </Group>
            <Button>Create Task</Button>
          </Container>
        </MantineProvider>
      </ColorSchemeProvider>
    </Fragment>
  );
};

export default App;

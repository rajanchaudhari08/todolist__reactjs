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
  /* Toggle Color Scheme Function: Light and Dark Theme Mode for Browser Screen */

  const preferredColorScheme = useColorScheme();

  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value) => {
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  };

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  /* React UI State Management */
  
  const [task, setTask] = useState([]);
  const [open, setOpen] = useState(false);

  /* Reat Hook - "useRef" :: store references to DOM nodes and React Components */

  const refTaskTitle = useRef("");
  const refTaskDescription = useRef("");

  /* Create Task Function */

  const createTask = () => {
    setTask([
      ...task,
      {
        title: refTaskTitle.current.value,
        description: refTaskDescription.current.value,
      },
    ]);
    storeTask([
      ...task,
      {
        title: refTaskTitle.current.value,
        description: refTaskDescription.current.value,
      },
    ]);
  };

  /* Remove Task Function */

  const removeTask = (index) => {
    var deleteTask = [...task];
    deleteTask.splice(index, 1);
    setTask(deleteTask);
    storeTask([...deleteTask]);
  };

  /* Store data to Local Storage */

  const fetchTask = () => {
    let loadTask = localStorage.getItem("task");
    let task = JSON.parse(loadTask);

    if (task) {
      setTask(task);
    }
  };

  const storeTask = (task) => {
    localStorage.setItem("task", JSON.stringify(task));
  };

  /* React Hook - "useEffect" :: perform side effects from within functional components */
  
  useEffect(() => {
    fetchTask();
  }, []);

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

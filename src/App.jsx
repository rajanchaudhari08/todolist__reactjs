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
    localStorage.removeItem("task");
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
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme, defaultRadius: "md" }}
          withGlobalStyles
          withNormalizeCSS
        >
          <Modal
            opened={open}
            title={"Create Task"}
            withCloseButton={false}
            onClose={() => {
              setOpen(false);
            }}
            size={"sm"}
            centered
          >
            <TextInput
              ref={refTaskTitle}
              label={"Task Title"}
              placeholder={"Task Title"}
              mt={"md"}
              required
            />
            <TextInput
              ref={refTaskDescription}
              label={" Task Description"}
              placeholder={"Task Description"}
              mt={"md"}
            />
            <Group position={"apart"} mt={"md"}>
              <Button
                onClick={() => {
                  setOpen(false);
                }}
                variant={"subtle"}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  createTask();
                  setOpen(false);
                }}
              >
                Create Task
              </Button>
            </Group>
          </Modal>
          <Container size={400} my={1}>
            <Group position={"apart"}>
              <Title
                sx={(theme) => ({
                  fontFamily: `Cambria, ${theme.fontFamily}`,
                  fontWeight: 400,
                  fontSize: 24,
                })}
              >
                Task List
              </Title>
              <ActionIcon
                color={"blue"}
                onClick={() => toggleColorScheme()}
                size={"lg"}
              >
                {colorScheme === "dark" ? (
                  <Sun size={16} />
                ) : (
                  <MoonStars size={16} />
                )}
              </ActionIcon>
            </Group>
            {task.length > 0 ? (
              task.map((task, index) => {
                if (task.title) {
                  return (
                    <Card withBorder ket={index} mt={"sm"}>
                      <Group position={"apart"}>
                        <Text weight={"bold"}>{task.title}</Text>
                        <ActionIcon
                          onClick={() => {
                            removeTask(index);
                          }}
                          variant={"transparent"}
                          color={"red"}
                        >
                          <Trash />
                        </ActionIcon>
                      </Group>
                      <Text color={"dimmed"} size={"md"} mt={"sm"}>
                        {task.description ? task.description : "No Descriprion"}
                      </Text>
                    </Card>
                  );
                }
              })
            ) : (
              <Text color={"dimmed"} size={"md"} mt={"sm"}>
                No Task created
              </Text>
            )}
            <Button
              onClick={() => {
                setOpen(true);
              }}
              fullWidth
              mt={"md"}
            >
              Create Task
            </Button>
          </Container>
        </MantineProvider>
      </ColorSchemeProvider>
    </Fragment>
  );
};

export default App;

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Form, Grid, Button } from "semantic-ui-react";

export default function TaskFormPage() {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });

  const {query, push} = useRouter();

  const validate = () => {
    const errors = {};

    if (!newTask.title) errors.title = "Title is required";
    if (!newTask.description) errors.description = "Description is required";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length) return setErrors(errors);
    if(query.id) {
      await updateTask();
    } else {
      await createTask();
    }
    await push("/");
  };

  const updateTask = async () => {
    try {
      await fetch("http://localhost:3000/api/tasks/" + query.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
    } catch (e) {
      console.log(e);
    }
  }

  const createTask = async () => {
    try {
      await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handlechange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const getTask = async () => {
    const res = await fetch(`http://localhost:3000/api/tasks/${query.id}`)
    const data = await res.json()
    setNewTask({title: data.title, description: data.description})
  }

  useEffect(() => {
    if(query.id) {getTask()}
  }, [])

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns="3"
      style={{ height: "100vh" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <h1>{query.id ? "Update Task" : "Create Task"}</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              label="Title"
              placeholder="Title..."
              name="title"
              onChange={handlechange}
              error={
                errors.title
                  ? { content: "Please enter a title", pointing: "below" }
                  : null
              }
              value={newTask.title}
            />
            <Form.TextArea
              label="Description"
              placeholder="Description..."
              name="description"
              onChange={handlechange}
              error={
                errors.description
                  ? { content: "Please enter a description", pointing: "below" }
                  : null
              }
              value={newTask.description}
            />
            <Button primary>{query.id ? "Update" : "Create"}</Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

import { Button, Card, Container, Grid } from "semantic-ui-react";
import React from "react";
import { useRouter } from "next/router";

export default function HomePage({ tasks }) {
  
const route = useRouter()

  if (tasks.length === 0) return (
    <Grid centered verticalAlign="middle" columns='1' style={{height: '80vh'}}>
      <Grid.Row>
        <Grid.Column textAlign="center">
          <h1>There are no tasks yet</h1>
          <img src='https://static.thenounproject.com/png/1854455-200.png' alt='No tasks here' />
          <div>
            <Button primary>
              Create your first task
            </Button>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
  
  //render a list of tasks
  return (
    <Container style={{padding:'20px'}}>
      <Card.Group itemsPerRow={4}>
        {tasks.map((t) => (
          <Card key={t._id}>
            <Card.Content>
              <Card.Header>{t.title}</Card.Header>
              <p>{t.description}</p>
            </Card.Content>
            <Card.Content extra>
              <Button primary onClick={() => route.push(`/tasks/${t._id}`)}>View</Button>
              <Button secondary onClick={() => route.push(`/tasks/${t._id}/edit`)}>Edit</Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
}

export const getServerSideProps = async (ctx) => {
  const res = await fetch("http://localhost:3000/api/tasks");
  const tasks = await res.json();

  return {
    props: {
      tasks,
    },
  };
};

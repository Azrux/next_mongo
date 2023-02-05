import Link from "next/link";
import { useRouter } from "next/router";
import { Menu, Container, Button } from "semantic-ui-react";

export const NavBar = () => {

  const router = useRouter()

  return (
    <Menu inverted borderless attached>
      <Container>
        <Menu.Item>
          <Link href='/'>
            <img height='30px' width='30px' src='/favicon.ico' alt='Task Icon' />
          </Link>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Button primary size='mini' onClick={() => router.push('/tasks/new')}>
              New Task
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  )
}
import { Container, Title } from "@mantine/core";

export function meta() {
  return [{ title: "Rust OAuth2 Server Admin" }];
}

export default function Home() {
  return (
    <Container pt="md">
      <Title>Rust OAuth2 Server Admin</Title>
    </Container>
  );
}

import { Anchor, Stack } from "@mantine/core";
import { Link } from "react-router";

export default function Sidebar() {
  return (
    <Stack bg="gray.1" h="100vh" justify="center" p="md">
      <Anchor component={Link} to="/">
        Clients
      </Anchor>
      <Anchor component={Link} to="/sessions">
        Sessions
      </Anchor>
    </Stack>
  );
}

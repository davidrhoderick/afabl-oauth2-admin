import { Stack, Table, Title } from "@mantine/core";

export function meta() {
  return [{ title: "Rust OAuth2 Server Admin" }];
}

type Client = {
  id: string;
  name: string;
  redirectUri: string;
};

const mockClients: Array<Client> = [
  {
    id: "oih2198asdg09109sad",
    name: "leagabl-dev",
    redirectUri: "dev.leagabl.com",
  },
  {
    id: "ssadfj3lk9032jooijs",
    name: "leagabl-prod",
    redirectUri: "leagabl.com",
  },
];

export default function Home() {
  return (
    <Stack>
      <Title order={2}>Clients</Title>

      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Redirect URI</Table.Th>
          </Table.Tr>
        </Table.Thead>
      </Table>
    </Stack>
  );
}

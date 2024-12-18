import {
  Alert,
  Button,
  Center,
  Flex,
  Loader,
  rem,
  Stack,
  Table,
  Title,
} from "@mantine/core";
import { Link, Outlet } from "react-router";
import { useGetClients } from "~/clients-api";

export function meta() {
  return [{ title: "Rust OAuth2 Server Admin" }];
}

export default function Home() {
  const { data, error, isLoading } = useGetClients();

  return (
    <>
      <Stack>
        <Flex justify="space-between">
          <Title order={2}>Clients</Title>

          <Button component={Link} to="/add-client">
            Add client
          </Button>
        </Flex>

        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>ID</Table.Th>
              <Table.Th>Secret</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>

          {data?.data && data.data.length > 0 && (
            <Table.Tbody>
              {data.data.map(({ id, name, secret }) => (
                <Table.Tr key={id}>
                  <Table.Td>{name}</Table.Td>
                  <Table.Td>{id}</Table.Td>
                  <Table.Td>{secret}</Table.Td>
                  <Table.Td>
                    <Flex justify="end" gap="md">
                      <Button component={Link} to={`/update-client/${id}`}>
                        Edit
                      </Button>
                      <Button
                        component={Link}
                        color="red"
                        to={`/delete-client/${id}`}>
                        Delete
                      </Button>
                    </Flex>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          )}
        </Table>

        {data?.data?.length === 0 && <Alert>No clients found</Alert>}

        {isLoading && (
          <Center w="100%" h={rem(280)}>
            <Loader />
          </Center>
        )}

        {error && <Alert color="red">Oh no! Something went wrong...</Alert>}
      </Stack>

      <Outlet />
    </>
  );
}

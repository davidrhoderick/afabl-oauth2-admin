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
import { Link, Outlet, useNavigate } from "react-router";
import { useGetClients } from "~/clients-api";

export function meta() {
  return [{ title: "Rust OAuth2 Server Admin" }];
}

export default function Home() {
  const { data, error, isLoading } = useGetClients();

  const navigate = useNavigate();

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
              <Table.Th w="33%">ID</Table.Th>
              <Table.Th>Name</Table.Th>
            </Table.Tr>
          </Table.Thead>

          {data?.data && data.data.length > 0 && (
            <Table.Tbody>
              {data.data.map(({ id, name }) => (
                <Table.Tr
                  key={id}
                  onClick={() => navigate(`/update-client/${id}`)}
                >
                  <Table.Td>{id}</Table.Td>
                  <Table.Td>{name}</Table.Td>
                  <Table.Td>
                    <Button
                      onClick={(event) => {
                        event.stopPropagation();
                        event.preventDefault();

                        navigate(`/delete-client/${id}`);
                      }}
                    >
                      Delete
                    </Button>
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

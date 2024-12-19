import { Alert, Button, Flex, Modal, Stack, Text, Title } from "@mantine/core";
import type { AxiosResponse } from "axios";
import { Link, useNavigate, useParams } from "react-router";
import {
  useDeleteClientsClientId,
  useGetClients,
  type Clients,
} from "~/clients-api";
import { queryClient } from "~/root";

export default function DeleteClient() {
  const navigate = useNavigate();

  const { clientId } = useParams();

  const { data } = useGetClients({
    query: {
      queryKey: ["clients"],
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  });

  const mutation = useDeleteClientsClientId({
    mutation: {
      onSuccess: () => {
        queryClient.setQueryData(
          ["clients"],
          (oldData: AxiosResponse<Clients>) => ({
            data: oldData.data.filter((oldClient) => oldClient.id !== clientId),
          })
        );

        navigate("/");
      },
    },
  });

  return (
    <Modal opened={true} onClose={() => navigate("/")} title="Delete Client">
      <Stack>
        <Title order={3}>Warning!</Title>

        <Text>
          Are sure you want to delete client{" "}
          {data?.data.find(({ id }) => id === clientId)?.name}?
        </Text>

        <Flex justify="space-between">
          <Button variant="outline" component={Link} to="/">
            Cancel
          </Button>

          <Button
            color="red"
            onClick={() => mutation.mutate({ clientId: clientId! })}
            loading={mutation.isPending}>
            Delete
          </Button>
        </Flex>

        {mutation.isError && (
          <Alert color="red">
            <Title order={3}>Uh oh! Something went wrong.</Title>
            <Text>{mutation.error.message}</Text>
          </Alert>
        )}
      </Stack>
    </Modal>
  );
}

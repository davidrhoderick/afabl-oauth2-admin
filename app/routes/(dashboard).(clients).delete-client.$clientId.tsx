import { Alert, Button, Flex, Modal, Stack, Text, Title } from "@mantine/core";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useDeleteClientsClientId, useGetClients } from "~/clients-api";

export default function DeleteClient() {
  const navigate = useNavigate();

  const { clientId } = useParams();

  const { data } = useGetClients();

  const mutation = useDeleteClientsClientId();

  useEffect(() => {
    if (mutation.isSuccess) navigate("/");
  }, [mutation]);

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

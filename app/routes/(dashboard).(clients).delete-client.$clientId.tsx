import { Button, Flex, Modal, Stack, Text, Title } from "@mantine/core";
import { Link, useNavigate, useParams } from "react-router";
import { useDeleteClientsClientId, useGetClients } from "~/clients-api";

export default function DeleteClient() {
  const navigate = useNavigate();

  const { clientId } = useParams();

  const { data } = useGetClients();

  const { mutate } = useDeleteClientsClientId();

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

          <Button color="red" onClick={() => mutate({ clientId: clientId! })}>
            Delete
          </Button>
        </Flex>
      </Stack>
    </Modal>
  );
}

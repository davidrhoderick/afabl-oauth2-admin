import { Alert, Center, Loader, Modal, Text, Title } from "@mantine/core";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useGetClientsClientId, usePatchClientsClientId } from "~/clients-api";
import ClientForm from "~/components/client-form";

export default function UpdateClient() {
  const navigate = useNavigate();

  const { clientId } = useParams();

  const { data, isLoading, isError, error } = useGetClientsClientId(clientId!);

  const mutation = usePatchClientsClientId();

  useEffect(() => {
    if (mutation.isSuccess) navigate("/");
  }, [mutation]);

  return (
    <Modal.Root opened={true} onClose={() => navigate("/")}>
      <Modal.Overlay />

      {isLoading ? (
        <Center>
          <Loader />
        </Center>
      ) : (
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Update Client</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>

          <Modal.Body>
            {isError ? (
              <Alert color="red">
                <Title order={3}>Oh no! Something went wrong:</Title>

                <Text>{error.message}</Text>
              </Alert>
            ) : (
              <ClientForm mutation={mutation} initialValues={data?.data} />
            )}
          </Modal.Body>
        </Modal.Content>
      )}
    </Modal.Root>
  );
}

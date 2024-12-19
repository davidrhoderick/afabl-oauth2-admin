import { Alert, Center, Loader, Modal, Text, Title } from "@mantine/core";
import type { AxiosResponse } from "axios";
import { useNavigate, useParams } from "react-router";
import {
  useGetClientsClientId,
  usePatchClientsClientId,
  type Clients,
} from "~/clients-api";
import ClientForm from "~/components/client-form";
import { queryClient } from "~/root";

export function meta() {
  return [{ title: "afabl OAuth2 | Update client" }];
}

export default function UpdateClient() {
  const navigate = useNavigate();

  const { clientId } = useParams();

  const { data, isLoading, isError, error } = useGetClientsClientId(clientId!, {
    query: { queryKey: ["clients", { id: clientId }] },
  });

  const mutation = usePatchClientsClientId({
    mutation: {
      onSuccess: (data) => {
        const { name, id, secret } = data.data;

        queryClient.setQueryData(
          ["clients"],
          (oldData: AxiosResponse<Clients, any>) => ({
            data: (oldData?.data ?? []).map((oldClient) =>
              oldClient.id === id ? { name, id, secret } : oldClient
            ),
          })
        );

        queryClient.setQueryData(["clients", { id }], data);

        navigate("/");
      },
    },
  });

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

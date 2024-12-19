import { Alert, Center, Loader, Modal, Text, Title } from "@mantine/core";
import type { AxiosResponse } from "axios";
import { useNavigate, useParams } from "react-router";
import ClientForm from "~/components/client-form";
import {
  useGetClientsClientId,
  usePatchClientsClientId,
} from "~/generated/endpoints/clients/clients";
import type { Clients } from "~/generated/models";
import { queryClient } from "~/root";

export function meta() {
  return [{ title: "oauthabl | update client" }];
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

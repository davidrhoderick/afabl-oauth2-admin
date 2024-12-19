import { Modal } from "@mantine/core";
import type { AxiosResponse } from "axios";
import { useNavigate } from "react-router";
import { usePostClients, type Clients } from "~/clients-api";
import ClientForm from "~/components/client-form";
import { queryClient } from "~/root";

export default function AddClient() {
  const navigate = useNavigate();

  const mutation = usePostClients({
    mutation: {
      onSuccess: (data) => {
        const { name, id, secret } = data.data;

        queryClient.setQueryData(
          ["clients"],
          (oldData: AxiosResponse<Clients, any>) => ({
            data: [...(oldData?.data ?? []), { name, id, secret }],
          })
        );

        queryClient.setQueryData(["clients", { id }], data);

        navigate("/");
      },
    },
  });

  return (
    <Modal opened={true} onClose={() => navigate("/")} title="Add Client">
      <ClientForm mutation={mutation} />
    </Modal>
  );
}

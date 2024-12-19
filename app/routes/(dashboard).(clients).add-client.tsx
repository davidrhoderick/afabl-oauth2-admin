import { Modal } from "@mantine/core";
import type { AxiosResponse } from "axios";
import { useNavigate } from "react-router";
import ClientForm from "~/components/client-form";
import { usePostClients } from "~/generated/endpoints/clients/clients";
import type { Clients } from "~/generated/models";
import { queryClient } from "~/root";

export function meta() {
  return [{ title: "oauthabl | add client" }];
}

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

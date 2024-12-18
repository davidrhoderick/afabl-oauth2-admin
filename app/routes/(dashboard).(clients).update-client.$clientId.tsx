import { Modal } from "@mantine/core";
import { useNavigate, useParams } from "react-router";
import { useGetClientsClientId, usePatchClientsClientId } from "~/clients-api";
import ClientForm from "~/components/client-form";

export default function UpdateClient() {
  const navigate = useNavigate();

  const { clientId } = useParams();

  const { data } = useGetClientsClientId(clientId!);

  const { mutate } = usePatchClientsClientId();

  return (
    <Modal opened={true} onClose={() => navigate("/")} title="Update Client">
      <ClientForm mutate={mutate} initialValues={data?.data} />
    </Modal>
  );
}

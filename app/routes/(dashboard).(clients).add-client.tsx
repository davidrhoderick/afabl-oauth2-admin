import { Modal } from "@mantine/core";
import { useNavigate } from "react-router";
import { usePostClients } from "~/clients-api";
import ClientForm from "~/components/client-form";

export default function AddClient() {
  const navigate = useNavigate();

  const { mutate } = usePostClients();

  return (
    <Modal opened={true} onClose={() => navigate("/")} title="Add Client">
      <ClientForm mutate={mutate} />
    </Modal>
  );
}

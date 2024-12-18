import { Modal } from "@mantine/core";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { usePostClients } from "~/clients-api";
import ClientForm from "~/components/client-form";

export default function AddClient() {
  const navigate = useNavigate();

  const mutation = usePostClients();

  useEffect(() => {
    if (mutation.isSuccess) navigate("/");
  }, [mutation]);

  return (
    <Modal opened={true} onClose={() => navigate("/")} title="Add Client">
      <ClientForm mutation={mutation} />
    </Modal>
  );
}

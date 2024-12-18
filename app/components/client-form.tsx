import {
  ActionIcon,
  ActionIconGroup,
  Button,
  Checkbox,
  Fieldset,
  Flex,
  Input,
  NumberInput,
  Stack,
  TextInput,
  Text,
  rem,
  Alert,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus, IconX } from "@tabler/icons-react";
import { randomId } from "@mantine/hooks";
import type {
  Client,
  NewClient,
  UpdatedClient,
  usePatchClientsClientId,
  usePostClients,
} from "~/clients-api";
import { useParams } from "react-router";
import type { AxiosError } from "axios";

type FormRedirectUris = {
  redirectUris: Array<{ value: string; key: string }>;
};

type NewClientForm = Omit<NewClient, "redirectUris"> & FormRedirectUris;

type UpdatedClientForm = Omit<UpdatedClient, "redirectUris"> & FormRedirectUris;

export default function ClientForm({
  mutation,
  initialValues: rawInitialValues,
}: Readonly<{
  mutation:
    | ReturnType<typeof usePostClients>
    | ReturnType<typeof usePatchClientsClientId>;
  initialValues?: Client;
}>) {
  const { clientId } = useParams();

  const initialValues = rawInitialValues
    ? {
        ...rawInitialValues,
        redirectUris: rawInitialValues.redirectUris.map((value) => ({
          value,
          key: randomId(),
        })),
      }
    : {
        name: "",
        redirectUris: [{ value: "", key: randomId() }],
        refreshRefreshToken: true,
        accessTokenValidity: 3600,
        refreshTokenValidity: 1209600,
      };

  const form = useForm<NewClientForm | UpdatedClientForm>({
    mode: "controlled",
    initialValues,
  });

  const handleSubmit = ({
    redirectUris: formRedirectUris,
    ...formData
  }: NewClientForm) => {
    const redirectUris = formRedirectUris.map(({ value }) => value);

    console.log({ ...formData, redirectUris });

    // @ts-expect-error we are shoe-horning 2 mutations into one
    mutation.mutate({ data: { ...formData, redirectUris }, clientId });
  };

  return (
    // @ts-expect-error we are shoe-horning 2 mutations into one
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          withAsterisk
          label="Name"
          key={form.key("name")}
          {...form.getInputProps("name")}
        />

        <Fieldset legend="Redirect URIs">
          <Stack>
            {form.getValues().redirectUris.map(({ key }, index) => (
              <Flex align="center" gap="md" key={key}>
                <Input
                  key={form.key(`redirectUris.${index}.value`)}
                  w="100%"
                  {...form.getInputProps(`redirectUris.${index}.value`)}
                />

                <ActionIconGroup>
                  <ActionIcon>
                    <IconPlus
                      stroke={2}
                      onClick={() =>
                        form.insertListItem("redirectUris", {
                          value: "",
                          key: randomId(),
                        })
                      }
                    />
                  </ActionIcon>
                  <ActionIcon
                    disabled={index === 0}
                    onClick={() => form.removeListItem("redirectUris", index)}>
                    <IconX stroke={2} />
                  </ActionIcon>
                </ActionIconGroup>
              </Flex>
            ))}
          </Stack>
        </Fieldset>

        <Fieldset legend="Token Validity">
          <Stack>
            <NumberInput
              label="Access Token Validity"
              key={form.key("accessTokenValidity")}
              {...form.getInputProps("accessTokenValidity")}
              rightSection={<Text>seconds</Text>}
              rightSectionWidth={rem(80)}
            />

            <NumberInput
              label="Refresh Token Validity"
              key={form.key("refreshTokenValidity")}
              {...form.getInputProps("refreshTokenValidity")}
              rightSection={<Text>seconds</Text>}
              rightSectionWidth={rem(80)}
            />
          </Stack>
        </Fieldset>

        <Fieldset legend="Refresh Token Settings">
          <Stack>
            <Checkbox
              label="Refresh Refresh Token"
              key={form.key("refreshRefreshToken")}
              {...form.getInputProps("refreshRefreshToken", {
                type: "checkbox",
              })}
            />

            <Checkbox
              label="Disable Refresh Token"
              key={form.key("disableRefreshToken")}
              {...form.getInputProps("disableRefreshToken", {
                type: "checkbox",
              })}
            />
          </Stack>
        </Fieldset>

        <Button type="submit" loading={mutation.isPending}>
          Submit
        </Button>

        {mutation.isError && (
          <Alert color="red">
            <Title order={3}>Uh oh! Something went wrong.</Title>
            <Text>
              {/* @ts-expect-error error should always have a message */}
              {typeof mutation.error.message === "string"
                ? (mutation.error as AxiosError).message
                : "Please check the server logs"}
            </Text>
          </Alert>
        )}
      </Stack>
    </form>
  );
}

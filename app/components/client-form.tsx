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
  InputError,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconPlus, IconX } from "@tabler/icons-react";
import { randomId } from "@mantine/hooks";
import { useParams } from "react-router";
import type { AxiosError } from "axios";
import { z } from "zod";
import type { Client, NewClient, UpdatedClient } from "~/generated/models";
import type {
  usePatchClientsClientId,
  usePostClients,
} from "~/generated/endpoints/clients/clients";

type FormRedirectUris = {
  redirectUris: Array<{ value: string; key: string }>;
};

type NewClientForm = Omit<NewClient, "redirectUris"> & FormRedirectUris;

type UpdatedClientForm = Omit<UpdatedClient, "redirectUris"> & FormRedirectUris;

const zodRequiredString = (message = "Required") =>
  z.string({ required_error: message }).trim().min(1, { message });

const schema = z.object({
  name: zodRequiredString(),
  redirectUris: z
    .array(z.object({ value: zodRequiredString().url(), key: z.string() }))
    .nonempty(),
  accessTokenValidity: z.number().min(60),
  refreshTokenValidity: z.number().min(60),
  disableRefreshToken: z.boolean().optional(),
  refreshRefreshToken: z.boolean().optional(),
});

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
        accessTokenValidity: 3600,
        refreshTokenValidity: 1209600,
        refreshRefreshToken: true,
        disableRefreshToken: false,
      };

  const form = useForm<NewClientForm | UpdatedClientForm>({
    mode: "controlled",
    initialValues,
    validate: zodResolver(schema),
  });

  const handleSubmit = ({
    redirectUris: formRedirectUris,
    ...formData
  }: NewClientForm) => {
    const redirectUris = formRedirectUris.map(({ value }) => value);

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
              <Stack key={key}>
                <Flex align="center" gap="md">
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
                      onClick={() =>
                        form.removeListItem("redirectUris", index)
                      }>
                      <IconX stroke={2} />
                    </ActionIcon>
                  </ActionIconGroup>
                </Flex>

                {form.errors[`redirectUris.${index}.value`] && (
                  <InputError>
                    {form.errors[`redirectUris.${index}.value`]}
                  </InputError>
                )}
              </Stack>
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

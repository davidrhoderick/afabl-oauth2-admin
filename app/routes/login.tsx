import {
  Button,
  Center,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router";

export function meta() {
  return [{ title: "oauthabl | login" }];
}

type LoginFormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const form = useForm<LoginFormValues>({
    mode: "controlled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length ? null : "Required"),
    },
  });

  const navigate = useNavigate();

  const handleSubmit = (values: LoginFormValues) => {
    // TODO handle login
    console.log("values", values);

    navigate("/");
  };

  return (
    <Center bg="gray" h="100vh">
      <form style={{ width: "33%" }} onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md" bg="white" p="lg">
          <Title ta="center" order={3}>
            Login
          </Title>

          <TextInput
            key={form.key("email")}
            {...form.getInputProps("email")}
            label="Email address"
            withAsterisk
          />

          <PasswordInput
            label="Password"
            key={form.key("password")}
            {...form.getInputProps("password")}
            withAsterisk
          />

          <Button type="submit">Log in</Button>
        </Stack>
      </form>
    </Center>
  );
}

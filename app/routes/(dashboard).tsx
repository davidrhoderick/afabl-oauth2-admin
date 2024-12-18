import { Grid, Title } from "@mantine/core";
import { Outlet } from "react-router";
import Sidebar from "~/components/sidebar";

export default function DashboardLayout() {
  return (
    <Grid gutter="0">
      <Grid.Col span={3}>
        <Sidebar />
      </Grid.Col>

      <Grid.Col span={9} p="md">
        <Title>Rust OAuth2 Server Admin</Title>
        <Outlet />
      </Grid.Col>
    </Grid>
  );
}

import { Grid } from "@mantine/core";
import { Outlet } from "react-router";
import Sidebar from "~/components/sidebar";

export default function DashboardLayout() {
  return (
    <Grid gutter="0">
      <Grid.Col span={3}>
        <Sidebar />
      </Grid.Col>

      <Grid.Col span={9} p="md">
        <Outlet />
      </Grid.Col>
    </Grid>
  );
}

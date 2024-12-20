import { ActionIcon, CopyButton, Input, rem, Tooltip } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";

export default function CopyInput({ value }: Readonly<{ value: string }>) {
  return (
    <CopyButton value={value} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? "Copied" : "Copy"} withArrow position="right">
          <Input
            value={value}
            readOnly
            variant="filled"
            styles={{
              input: {
                cursor: "pointer",
                userSelect: "none",
              },
            }}
            onClick={copy}
            rightSection={
              <ActionIcon
                color={copied ? "palePurple" : "gray"}
                variant="subtle">
                {copied ? (
                  <IconCheck style={{ width: rem(16) }} />
                ) : (
                  <IconCopy style={{ width: rem(16) }} />
                )}
              </ActionIcon>
            }
          />
        </Tooltip>
      )}
    </CopyButton>
  );
}

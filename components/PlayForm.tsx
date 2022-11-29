import { Button } from "./Button";
import { Flex } from "./Flex";
import { TextField } from "./Forms";
import { Text } from "./Text";

export const PlayForm = ({
  onSubmit,
  defaultValues,
}: {
  onSubmit: () => void;
  defaultValues: unknown;
}) => {
  return (
    <form onSubmit={onSubmit}>
      <Flex
        direction="column"
        justify="center"
        align="center"
        gap="2"
        css={{
          height: "90vh",
        }}
      >
        <Text variant="number">
          This is the start of the journey. Login with your bgg username to
          start
        </Text>
        <Flex gap="2" justify="center" align="center" direction="column">
          <TextField placeholder="Location" name="location" />
          <TextField placeholder="Play Date" name="playdate" />
          <Text>The password would never be stored by this service</Text>
          <Button>Go</Button>
        </Flex>
      </Flex>
    </form>
  );
};

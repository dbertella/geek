import { Box } from "./Box";
import { Flex } from "./Flex";
import { Image } from "./Image";
import { Text } from "./Text";

export const GameHeader = ({
  rating,
  thumbnail,
}: {
  rating: string;
  thumbnail: string;
}) => {
  return (
    <Flex
      css={{
        position: "relative",
        borderBottom: "1px solid",
        borderColor: "$gray5",
        pb: "$1",
      }}
      justify="center"
    >
      <Box css={{ position: "absolute", top: 0, right: 0 }}>
        <Text variant="number">#{rating}</Text>
      </Box>
      <Image src={thumbnail} alt="" />
    </Flex>
  );
};

import { Avatar, Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import ConversationOperations, {
  ConversationsData,
} from "../../../graphql/operations/conversations";
import moment from "moment";
import { useQuery } from "@apollo/client";
import toast from "react-hot-toast";

interface ConversationsProps {
  convId: string;
  setConvId: React.Dispatch<React.SetStateAction<string>>;
}

const testConversations = [
  {
    id: "12345",
    otherPersonName: "Sunny",
    latestMessage: {
      body: "Hey dude lol",
      created_at: Date.now(),
    },
  },
];

const Conversations: React.FC<ConversationsProps> = ({ convId, setConvId }) => {
  const { data, loading, error } = useQuery<ConversationsData, null>(
    ConversationOperations.Queries.conversations
  );

  console.log("HERE IS CONVERSATION DATA", data, loading, error);

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    toast.error("There was an error fetching conversations");
  }

  return (
    <Flex
      direction="column"
      display={{ base: convId ? "none" : "flex", md: "flex" }}
      width={{ base: "100%", md: "30%" }}
      maxWidth={{ base: "none", md: "360px" }}
      bg="whiteAlpha.50"
      p={2}
    >
      {testConversations.map((conversation) => (
        <Stack
          key={conversation.id}
          direction="row"
          spacing={4}
          p={4}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "whiteAlpha.200" }}
          onClick={() => setConvId(conversation.id)}
        >
          <Avatar />
          <Flex justify="space-between" width="100%">
            <Flex direction="column">
              <Text fontWeight={600}>{conversation.otherPersonName}</Text>
              <Text color="whiteAlpha.700">
                {conversation.latestMessage.body}
              </Text>
            </Flex>
            <Text color="whiteAlpha.700">
              {moment(conversation.latestMessage.created_at).format("LT")}
            </Text>
          </Flex>
        </Stack>
      ))}
    </Flex>
  );
};
export default Conversations;

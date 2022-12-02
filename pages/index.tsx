import { Button } from "@chakra-ui/button";
import {
  Box,
  Card,
  CardBody,
  Center,
  Input,
  InputGroup,
  InputAddon,
  CardHeader,
  Heading,
  CardFooter,
  ListItem,
  List,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useAppContext } from "../provider/app.context";

export default function Home() {
  const {
    loading,
    message,
    errors,
    check,
    submit,
    handleUsername,
    handlePassword,
    user,
  } = useAppContext();

  return (
    <Box as="form" onSubmit={submit} h={"100vh"} w={"full"}>
      <Center h={"full"} w={"full"}>
        <Card w={{ base: "80%", md: "50%", lg: "30%" }}>
          <CardHeader>
            <Heading fontSize={'lg'}>Add Users</Heading>
          </CardHeader>
          <CardBody>
            {message ? (
              <Box
                fontWeight={"medium"}
                fontSize={"xs"}
                borderRadius={5}
                bg={"blue.100"}
                p={2}
              >
                {message}
              </Box>
            ) : (
              <></>
            )}

            <InputGroup my={2}>
              <Input
                placeholder="Username"
                onChange={(e) => handleUsername(e.target.value)}
              />
              <InputAddon borderRadius={0} bg={"none"} border={"none"}>
                <Button disabled={loading} onClick={check}>
                  Check
                </Button>
              </InputAddon>
            </InputGroup>

            <InputGroup my={5}>
              <Input
                placeholder="Password"
                type={"password"}
                onChange={(e) => handlePassword(e.target.value)}
              />
            </InputGroup>

            {errors && errors.length !== 0 ? (
              <Box
                fontWeight={"medium"}
                fontSize={"xs"}
                borderRadius={5}
                bg={"red.100"}
                p={2}
              >
                <List>
                  {errors.map((error, index) => (
                    <ListItem key={index}>{error}</ListItem>
                  ))}
                </List>
              </Box>
            ) : (
              <></>
            )}

            {user ? (
              <HStack
                justifyContent={"space-between"}
                fontWeight={"medium"}
                mt={10}
              >
                <Text>Current User</Text>
                <Text>{user.id}</Text>
                <Text>{user.username}</Text>
                <Text>{new Date(user.created_at).toLocaleString()}</Text>
              </HStack>
            ) : (
              <></>
            )}
          </CardBody>

          <CardFooter>
            <Button
              type="submit"
              disabled={loading}
              colorScheme={"green"}
              variant={"ghost"}
              w={"full"}
            >
              Add
            </Button>
          </CardFooter>
        </Card>
      </Center>
    </Box>
  );
}

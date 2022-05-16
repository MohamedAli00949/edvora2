import React from 'react';
import { Box, Text, Avatar, Heading, SkeletonCircle, Skeleton } from '@chakra-ui/react';
import { useSelector } from "react-redux";

function Navbar() {
  const { isLoading, user } = useSelector((state) => state.user);

  return (
    <Box className="padding" bg="black.200" w="100%" display="flex" alignItems="center" justifyContent="space-between">
      <Heading as='h2' size='xl' style={{
        fontFamily: 'SF Pro Display',
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: "36px",
        lineHeight: "43px",
        /* identical to box height */
        color: "#FFFFFF",
        textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
      }}>Edvora</Heading>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        {isLoading ? (
          <Box display="flex" alignItems="center">
            <Skeleton className="user-name" width="80px" height="24px" marginInlineEnd="25px" />
            <SkeletonCircle height="48px" width="48px" />
          </Box>
        ) : (
          <>
            <Text className="user-name">{user.name}</Text>
            <Avatar size='md' name={user.name} src={user.url} />
          </>
        )}
      </Box>
    </Box >
  )
}

export default Navbar
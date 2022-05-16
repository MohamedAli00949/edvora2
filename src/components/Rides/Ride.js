import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react';
import moment from 'moment';

function Ride({ ride }) {
  return (
    <Box background="black.400" padding="22px" marginBottom="13px" borderRadius="10px" width="100%"
      display="flex" flexFlow="wrap" justifyContent="space-between"
      alignItems="center" className="ride">
      <div className="image">
        <Image fetchpriority="high" src={ride.map_url} alt="ride-picture" borderRadius="5px" width="296px" height="148px" objectFit="cover" />
      </div>
      <div className="ride-text">
        <div>
          <Text className="ride-data">Ride Id : <span>{ride.id}</span></Text>
          <Text className="ride-data">Origin Station : <span>{ride.origin_station_code}</span></Text>
          <Text className="ride-data">station_path : <span>{`[${ride.station_path.join(", ")}]`}</span></Text>
          <Text className="ride-data">Date : <span>{moment(ride.date).format('Do MMM YYYY h:mm')}</span></Text>
          <Text className="ride-data">Distance : <span>{ride.distance}</span></Text>
        </div>

        <div className="ride-locations">
          <Text className="ride-location">{ride.city}</Text>
          <Text className="ride-location">{ride.state}</Text>
        </div>
      </div>
    </Box>
  )
}

export default Ride
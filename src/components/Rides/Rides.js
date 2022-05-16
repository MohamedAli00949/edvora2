import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Text } from '@chakra-ui/react';
const Ride = lazy(() => import('./Ride'));

const renderLoader = () => <p>Loading...</p>;

function Rides({ id }) {
    const rides = useSelector((state) => state.rides)
    console.log('Rides', id, rides[id]?.length);
    return (
        <>
            {rides[id]?.length === 0 ? (
                <Text>Not found</Text>
            ) : (
                <ul style={{ width: "100%", paddingInline: "3px" }}>
                    {rides[id]?.map((ride, index) => (
                        <li key={index}>
                            <Suspense fallback={renderLoader()}>
                                <Ride ride={ride} />
                            </Suspense>
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}

export default Rides
import React, { useState, useEffect, lazy, Suspense } from 'react';

import { Box, Button } from '@chakra-ui/react';

import { BsFilterLeft } from "react-icons/bs";

import { useSelector, useDispatch } from "react-redux";
import { getData } from "../utils/actions";
const Rides = lazy(() => import('./Rides/Rides'));
const Filter = lazy(() => import('./Filter'));
const Loading = lazy(() => import('../utils/Loading'));

const renderLoader = () => <p>Loading...</p>;

function RidesContainer() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { isLoading, nearest, upcaming, past } = useSelector((state) => state.rides);
  const rides = useSelector((state) => state.rides)
  const [activeRides, setActiveRides] = useState("nearest");

  useEffect(() => {
    if (user.station_code === undefined) {
      dispatch(getData(user.station_code));
    }
  }, []); // eslint-disable-line

  function toggleActiveTab(e) {
    const activeTab = document.getElementsByClassName('tab active');
    activeTab[0].classList.remove('active');
    e.target.classList.add('active');
    setActiveRides(e.target.id);
  }

  function toggleFilterSection() {
    const filterSection = document.getElementsByClassName('filter-container')[0];

    filterSection.classList.toggle("open");
  }

  return (
    <Box className="padding" bg="black.500" w="100%" display="flex" alignItems="center" justifyContent="center" flexDirection="column" width="100%">
      <div style={{
        display: 'flex', flexFlow: "wrap",
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignContent: 'center',
      }}>
        <div className="rides-categories" style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexFlow: "row",
          alignContent: "center",
        }}>
          <button className="tab active" id="nearest" onClick={(e) => toggleActiveTab(e)}>Nearest rides</button>
          <button className="tab" id="upcoming" onClick={(e) => toggleActiveTab(e)}>Upcoming rides {`(${upcaming.length})`}</button>
          <button className="tab" id="past" onClick={(e) => toggleActiveTab(e)}>Past rides {`(${past.length})`}</button>
        </div>
        <Button className="filter-button" style={{
          backgroundColor: "transparent",
          borderColor: "transparent",
        }} onClick={toggleFilterSection} leftIcon={<BsFilterLeft size="20px" />} >
          Filter
        </Button>
      </div>
      {isLoading ? (
        <>
          <Suspense fallback={renderLoader()}>
            <Loading />
          </Suspense>
        </>
      ) : (
        <div style={{ alignItems: "self-start", marginTop: "24px" }} className="rides-container">
          <Box className="filter-container open">
            <Suspense fallback={renderLoader()}>
              <Filter />
            </Suspense>
          </Box>
          {activeRides === "nearest" ? (
            <Suspense fallback={renderLoader()}>
              <Rides id={activeRides} rides={nearest.sort((a, b) => a.distance - b.distance)} />
            </Suspense>
          ) : (
            <>{activeRides === "upcaming" ? (
              <Suspense fallback={renderLoader()}>
                <Rides id={activeRides} rides={rides.upcaming} />
              </Suspense>
            ) : (
              <Rides id={activeRides} rides={rides.past} />
            )}</>
          )}
        </div>
      )}
    </Box >
  )
}

export default RidesContainer;
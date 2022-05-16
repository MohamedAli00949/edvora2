import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Checkbox, Text } from '@chakra-ui/react';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

import Loading from '../utils/Loading';
import {filterStates} from '../utils/actions';

const Section = ({ sName, sOptions }) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState([]);
  const [openSelector, setOpenSelector] = useState("");

  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    let newChecked = [...checked];

    if (currentIndex === -1) {
      if (value !== 'all') {
        newChecked.push(value);
      } else {
        newChecked = [];
      }
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);

    dispatch(filterStates(sName, newChecked));

    console.log(newChecked, currentIndex);
  };

  return (
    <div style={{ marginBlock: "10px" }}>
      <Button
        variant="contained"
        onClick={() => setOpenSelector((p) => (p === sName ? "" : sName))}
        rightIcon={
          openSelector === sName ? <IoMdArrowDropup color='#A5A5A5' /> : <IoMdArrowDropdown color='#A5A5A5' />
        }
        className="sButton"
        style={{ boxShadow: openSelector === sName && '0 0 7px 2px #50505080', background: '#232323', }}
      >
        {sName}
      </Button>
      {openSelector === sName && (
        <ul style={{ marginBlock: "15px" }}>
          {sOptions.map((option, i) => (
            <li key={i}>
              <Checkbox onChange={() => handleToggle(option)} defaultChecked={checked.indexOf(option) !== -1}>{option}</Checkbox>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function Filter() {
  const { isLoading, cities, states } = useSelector(
    (state) => state.rides
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="filter">
      <Text className="filter-heading">
        Filters
      </Text>
      <hr className="filter-break" />
      <Section sName='state' sOptions={states.map((rS) => rS.value).sort()} />
      <Section sName='city' sOptions={cities.sort()} />
    </div>
  );
}

export default Filter;
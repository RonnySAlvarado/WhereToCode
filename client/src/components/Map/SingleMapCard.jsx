import React from "react";

const SingleMapCard = props => {
  return (
    <>
      {props.location !== "" ? (
        <div style={{ border: "1px solid black", margin: 10, padding: 10 }}>
          <p>{`name: ${props.location}`}</p>
          <p>{`address: ${props.address}`}</p>
          <button
            id="detailButton"
            type="button"
            onClick={() => props.requestDetails(props.id)}
          >
            Details
          </button>
        </div>
      ) : null}
    </>
  );
};

export default SingleMapCard;

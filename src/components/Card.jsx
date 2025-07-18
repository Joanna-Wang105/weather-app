import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWind } from "@fortawesome/free-solid-svg-icons";
import { faUmbrella } from "@fortawesome/free-solid-svg-icons";
import { faDroplet } from "@fortawesome/free-solid-svg-icons";

export const Card = (props) => {
  return (
    <div className="flex flex-col border border-blue-200 p-4 rounded-2xl shadow-lg shadow-grey-100">
      {/* element icon */}
      <div>
        {props.element === "Wind speed" ? (
          <FontAwesomeIcon icon={faWind} className="text-2xl text-gray-500" />
        ) : props.element === "Rain" ? (
          <FontAwesomeIcon
            icon={faUmbrella}
            className="text-2xl text-indigo-800"
          />
        ) : (
          <FontAwesomeIcon
            icon={faDroplet}
            className="text-2xl text-blue-500"
          />
        )}
        <h1 className="mt-1 element-font">{props.element}</h1>
      </div>

      <p>
        {props.data} {props.unit}
      </p>
    </div>
  );
};

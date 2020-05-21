import React from "react";

export const ErrorIndicator = () => {
  return (
    <div className="container mt-3">
      <div className="text-center">
      <div >whooops, something bad happened, try again later</div>
      <a className="btn btn-primary mt-3" href="/">
        Back to Main Page
      </a>
      </div>
    </div>
  );
};

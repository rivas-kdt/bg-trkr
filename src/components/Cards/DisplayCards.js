import React, { createContext, useContext } from "react";

const CardContext = createContext(false);

const Card = ({ className, children }) => {
  return (
    <CardContext.Provider value={true}>
      <div className={`bg-zinc-700 shadow-lg rounded-lg ${className}`}>
        {children}
      </div>
    </CardContext.Provider>
  );
};

const CardHeader = ({ className, children }) => {
  const isInsideCard = useContext(CardContext);

  if (!isInsideCard) {
    throw new Error("CardHeader must be used inside a Card component.");
  }

  return (
    <div
      className={`p-4 bg-zinc-700 text-white rounded-t-lg border-b border-black ${className}`}
    >
      {children}
    </div>
  );
};

const CardBody = ({ className, children }) => {
  const isInsideCard = useContext(CardContext);

  if (!isInsideCard) {
    throw new Error("CardBody must be used inside a Card component.");
  }

  return <div className={`p-6 ${className}`}>{children}</div>;
};

const CardDescription = ({ className, children }) => {
  const isInsideCard = useContext(CardContext);

  if (!isInsideCard) {
    throw new Error("CardDescription must be used inside a Card component.");
  }

  return <p className={`text-gray-700 ${className}`}>{children}</p>;
};

const CardFooter = ({ className, children }) => {
  const isInsideCard = useContext(CardContext);

  if (!isInsideCard) {
    throw new Error("CardFooter must be used inside a Card component.");
  }

  return (
    <div className={`p-4 bg-zinc-700 text-center rounded-b-lg ${className}`}>
      {children}
    </div>
  );
};

export { Card, CardHeader, CardBody, CardDescription, CardFooter };

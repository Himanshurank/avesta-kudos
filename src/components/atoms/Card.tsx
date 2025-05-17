import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  testId?: string;
}

const Card = (props: CardProps) => {
  const { children, className = "", testId } = props;

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}
      data-testid={testId || "card"}
    >
      {children}
    </div>
  );
};

export default Card;

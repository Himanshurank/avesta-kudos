import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  testId?: string;
  elevation?: "sm" | "md" | "lg" | "xl" | "none";
}

const Card = (props: CardProps) => {
  const { children, className = "", testId, elevation = "sm" } = props;

  const shadowClasses = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
  };

  return (
    <div
      className={`bg-white rounded-lg ${shadowClasses[elevation]} overflow-hidden ${className}`}
      data-testid={testId || "card"}
    >
      {children}
    </div>
  );
};

export default Card;

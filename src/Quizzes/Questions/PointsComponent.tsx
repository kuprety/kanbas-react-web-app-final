
  import React from "react";

interface TotalPointsDisplayProps {
    totalPoints: number;
}

const TotalPointsDisplay: React.FC<TotalPointsDisplayProps> = ({ totalPoints }) => {
    return <p>Total Points: {totalPoints + 7}</p>;
};

export default TotalPointsDisplay;
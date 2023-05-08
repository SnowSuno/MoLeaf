import React from "react";
import { AnimatedOutlet } from "../../components/AnimatedOutlet";
import { Link } from "react-router-dom";

export const Home: React.FC = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/total">Total usage</Link>
      <AnimatedOutlet/>
    </div>
  );
};

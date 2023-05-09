import React from "react";
import { AnimatedOutlet } from "../../components/AnimatedOutlet";
import { Link } from "react-router-dom";
import { Header } from "../../components/Header";

export const Home: React.FC = () => {
  return (
    <div>
      <AnimatedOutlet/>
      <Header title="Overview"/>
      <Link to="/total">Total usage</Link>
    </div>
  );
};

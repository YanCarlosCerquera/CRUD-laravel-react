import React from "react";
import { useLoaderData } from "react-router-dom";



const AboutGrandChild = () => {
  const page = useLoaderData();




  return (
    <div>
      {page}
      <h2>About Grand Child</h2>
      <p>This is the about page.</p>
      <p>This is the about page.</p>
      <p>This is the about page.</p>
      <p>This is the about page.</p>
      <p>This is the about page.</p>
      <p>This is the about page.</p>
      <p>This is the about page.</p>
    </div>
  );
};

export default AboutGrandChild;

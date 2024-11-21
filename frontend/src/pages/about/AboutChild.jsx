import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";




const AboutChild = () => {
  const page = useLoaderData();




  return (
    <div>
      {page}
      <Outlet />
      <h2>About Child</h2>
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

export default AboutChild;

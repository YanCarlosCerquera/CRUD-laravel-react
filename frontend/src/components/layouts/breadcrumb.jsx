import * as React from 'react';
import { useNavigate } from "react-router-dom";
import {Breadcrumbs, Link} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import useCurrentPages from 'components/layouts/hooks/currentPagesHook';




const CCBreadcrumbs = () => {
  const navigate = useNavigate();

  const {
    currentPages, 
    currentPagesName
  } = useCurrentPages()

  function handleClick(segment) {
    navigate(segment)
  }
  
  let segments = currentPages.split(',').filter(segment => segment);
  let segmentsName = currentPagesName.split(',').filter(segment => segment);
  
  const breadcrumbLinks = segments.map((segment, index) => {
    return (

      // If router dom link:
      // <Link 
      //   key={index+1} 
      //   to={`/${segment}`}
      // >
      //   {
      //     wordsUpperCase(segment)
      //   }
      // </Link>

      <Link 
        key={index+1}
        underline="hover" 
        color="inherit" 
        href={`/${segment}`}
        sx={{ 
          fontWeight: ((segments.length - 1) === index) ? (
            'bold' 
          ) : (
            'normal'
          )
        }}
        onClick={e => {
          e.preventDefault()
          handleClick(`/${segment}`)
        }}
      >
        {segmentsName[index]}
      </Link>
    )
  })

  return (
    <Breadcrumbs 
      separator="›"
      aria-label="breadcrumb"
    >
      { 
        // If router dom link:
        /* <Link 
          key={0} 
          to={`/`}
        >
          Home
        </Link> */
      }

      <Link 
        key={0}
        underline="hover" 
        color="inherit" 
        href="/"
        sx={{ 
          display: 'flex', 
          alignItems: 'center',
          fontWeight: segments.length ? 'normal' : 'bold'  
        }}
        onClick={e => {
          e.preventDefault()
          handleClick('/')
        }}
      >
        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        Home
      </Link>
      {breadcrumbLinks}
    </Breadcrumbs>
  );
}

export default CCBreadcrumbs;
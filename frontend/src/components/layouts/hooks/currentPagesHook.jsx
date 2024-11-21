import {useLocation} from "react-router-dom";
import { useEffect, useState } from "react";
import wordsUpperCase from "utilities/wordsUpperCase";




const useCurrentPages = () => {
  const location = useLocation();
  const { pathname } = location;

  const [currentPages, setCurrentPages] = useState('');
  const [currentPagesName, setCurrentPagesName] = useState('');
  const [currentIndivPages, setCurrentIndivPages] = useState('');
  const [currentLastPage, setCurrentLastPage] = useState('');
  const [currentLastPageName, setCurrentLastPageName] = useState('');
  const [currentLastPath, setCurrentLastPath] = useState('');
  const [currentFirstPath, setCurrentFirstPath] = useState('');

  useEffect(() => {
    // console.log('Pathname changed:', pathname);
    let tempPaths = '';
    const paths = pathname
      .split('/')
      .filter(path => path);

    const computedCurrentPages = paths
      .map((path, index) => {
        index !== 0 ? (
          tempPaths += `/${path}`
        ) : (
          tempPaths += `${path}`
        );
        return tempPaths;
      })
      .join(',');

    const computedCurrentPagesName = paths
      .map(path => wordsUpperCase(path))
      .join(',');

    const computedCurrentIndivPages = paths.join(',');

    const computedCurrentLastPage = paths[paths.length - 1];
    const computedCurrentLastPageName = wordsUpperCase(paths[paths.length - 1]);

    let lastPath = computedCurrentPages.split(',');
    const computedCurrentLastPath = lastPath[lastPath.length - 1];

    let firstPath = computedCurrentPages.split(',');
    const computedCurrentFirstPath = firstPath[0];

    setCurrentPages(computedCurrentPages);
    setCurrentPagesName(computedCurrentPagesName);
    setCurrentIndivPages(computedCurrentIndivPages);
    setCurrentLastPage(computedCurrentLastPage);
    setCurrentLastPageName(computedCurrentLastPageName);
    setCurrentLastPath(computedCurrentLastPath);
    setCurrentFirstPath(computedCurrentFirstPath);
  }, [pathname]);

  return {
    currentPages, 
    currentPagesName, 
    currentIndivPages,
    currentLastPage, 
    currentLastPageName,
    currentLastPath,
    currentFirstPath,
  };
};

// const useCurrentPages = () => {
//   const location = useLocation();
//   const { pathname } = location;

//   const [currentPages, setCurrentPages] = useState('');
//   const [currentPagesName, setCurrentPagesName] = useState('');
//   const [currentIndivPages, setCurrentIndivPages] = useState('');
//   const [currentLastPage, setCurrentLastPage] = useState('');
//   const [currentLastPageName, setCurrentLastPageName] = useState('');
//   const [currentLastPath, setCurrentLastPath] = useState('');
//   const [currentFirstPath, setCurrentFirstPath] = useState('');

//   useEffect(() => {
//     let tempPaths = '';
//     const paths = pathname
//       .split('/')
//       .filter(path => path);

//     const computedCurrentPages = paths
//       .map((path, index) => {
//         index !== 0 ? (
//           tempPaths += `/${path}`
//         ) : (
//           tempPaths += `${path}`
//         );
//         return tempPaths;
//       })
//       .join(',');

//     const computedCurrentPagesName = paths
//       .map(path => wordsUpperCase(path))
//       .join(',');

//     const computedCurrentIndivPages = paths.join(',');

//     const computedCurrentLastPage = paths[paths.length - 1];
//     const computedCurrentLastPageName = wordsUpperCase(paths[paths.length - 1]);

//     let lastPath = computedCurrentPages.split(',');
//     const computedCurrentLastPath = lastPath[lastPath.length - 1];

//     let firstPath = computedCurrentPages.split(',');
//     const computedCurrentFirstPath = firstPath[0];

//     setCurrentPages(computedCurrentPages);
//     setCurrentPagesName(computedCurrentPagesName);
//     setCurrentIndivPages(computedCurrentIndivPages);
//     setCurrentLastPage(computedCurrentLastPage);
//     setCurrentLastPageName(computedCurrentLastPageName);
//     setCurrentLastPath(computedCurrentLastPath);
//     setCurrentFirstPath(computedCurrentFirstPath);
//   }, [pathname]);

//   return {
//     currentPages, 
//     currentPagesName, 
//     currentIndivPages,
//     currentLastPage, 
//     currentLastPageName,
//     currentLastPath,
//     currentFirstPath,
//   };
// };

// const useCurrentPages = () => {
//   const location = useLocation();
//   const {pathname} = location;

//   let tempPaths = '';
//   const paths = pathname
//     .split('/')
//     .filter(path => path)

//   const currentPages = paths
//     .map((path, index) => {
//       index !==0 ? (
//         tempPaths += `/${path}` 
//       ): (
//         tempPaths += `${path}`
//       );  
//       return tempPaths
//     })
//     .join(',')

//   const currentPagesName = paths
//     .map(path => {
//       return wordsUpperCase(path)
//     })
//     .join(',');


//   const currentIndivPages = paths
//   .map(path => {
//     return path
//   })
//   .join(',');

//   const currentLastPage = paths[paths.length - 1];
//   const currentLastPageName = wordsUpperCase(paths[paths.length - 1]);
  
//   let lastPath = currentPages.split(',');
//   const currentLastPath = lastPath[lastPath.length - 1];

//   let firstPath = currentPages.split(',');
//   const currentFirstPath = firstPath[0];




//   return {
//     currentPages, 
//     currentPagesName, 
//     currentIndivPages,
//     currentLastPage, 
//     currentLastPageName,
//     currentLastPath,
//     currentFirstPath,
//   }
// }

export default useCurrentPages;
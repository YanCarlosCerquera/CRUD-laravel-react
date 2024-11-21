import * as React from 'react';
import { useNavigate } from "react-router-dom";
import {ExpandLess, ExpandMore} from '@mui/icons-material';
import {userRouter, roleRouter, rootChildRouter} from 'router/services/routerService';
import wordsUpperCase from 'utilities/wordsUpperCase';
import {
  Box, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Typography,
  ListSubheader,
  Collapse
} from '@mui/material';
import { 
  CCDividerHorizontal, 
  ccAreaBgColor, 
  ccLargeFontColor, 
  ccVar1Color, 
  ccVar4Color
} from 'components/mui-customizations/styleCustomization';




const Menu = () => {
  const navigate = useNavigate()
  const [selectedIndex, setSelectedIndex] = React.useState('');
  const [open2, setOpen2] = React.useState([]);
  const handleClick = (e, path) => {
    e.preventDefault()
    setSelectedIndex(path);
    setOpen2((prevOpen) =>
      prevOpen.includes(path) ? prevOpen.filter((item) => item !== path) : [...prevOpen, path]
    );
    navigate(`/${path}`)
  };
  const isOpen = (path) => open2.includes(path);

  return (
    <>
      <List 
        component="nav"
        aria-labelledby="nested-list-subheader"
        sx={{pb: 0}}
        subheader={
          <ListSubheader 
            component="div" 
            id="nested-list-subheader"
            sx={{
              py:1,
              color: ccAreaBgColor,
              backgroundColor: ccVar4Color,
            }}
          >
            <Typography variant='subtitle1'>Admin Area Items</Typography>
          </ListSubheader>
        }
      >
        {rootChildRouter.map((text1, index1) => (
          wordsUpperCase(text1.path) !== 'Edit' && (
            <Box key={index1}>
              <ListItem 
                disablePadding
                // List item button ripple color change
                sx={() => ({

                    // backgroundColor:`${ccVar4Color}38`,
          
                  flexDirection:'column',
                  alignItems: 'stretch',
                  "& .MuiTouchRipple-child": {
                    backgroundColor: `${ccLargeFontColor}!important`,
                  },
                })}
              >
                <ListItemButton 
                  selected={selectedIndex === `${text1.path}`}
                  onClick={e => handleClick(e, `${text1.path}`)}
                  // List button hover focus and selected color change
                  sx={{
                    '&:hover, &:focus, &.Mui-selected': {
                      backgroundColor: ccVar1Color+'a3',
                      ".MuiTouchRipple-root .MuiTouchRipple-ripple": {
                        "&:hover": {
                          backgroundColor: "red!important"
                        }
                      }
                    },
                    '&.Mui-selected': {
                      '&:hover, &:focus': {
                        backgroundColor: ccVar1Color,
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{minWidth:'35px'}}>{text1.icon}</ListItemIcon>
                  <ListItemText primary={wordsUpperCase(text1.path)} />
                  {text1.children ? isOpen(`${text1.path}`) ? <ExpandLess /> : <ExpandMore /> : ''}
                </ListItemButton>
              </ListItem>
              {text1.children && (
                <Collapse 
                  sx={{backgroundColor:`${ccVar4Color}38`}} 
                  in={isOpen(`${text1.path}`)} 
                  timeout="auto" 
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                  {text1.children.map((text2, index2) => (
                    wordsUpperCase(text2.path) !== 'Edit' && (
                      <Box key={index2}>
                        <ListItem 
                          disablePadding
                          // List item button ripple color change
                          sx={() => ({
                            flexDirection:'column',
                            alignItems: 'stretch',
                            "& .MuiTouchRipple-child": {
                              backgroundColor: `${ccLargeFontColor}!important`,
                            },
                          })}
                        >
                          <ListItemButton 
                            selected={selectedIndex === `${text1.path}/${text2.path}`}
                            onClick={e => handleClick(e, `${text1.path}/${text2.path}`)}
                            sx={{
                              pl: 3.5,
                              '&:hover, &:focus, &.Mui-selected': {
                                backgroundColor: ccVar1Color+'a3',
                                ".MuiTouchRipple-root .MuiTouchRipple-ripple": {
                                  "&:hover": {
                                    backgroundColor: "red!important"
                                  }
                                }
                              },
                              '&.Mui-selected': {
                                '&:hover, &:focus': {
                                  backgroundColor: ccVar1Color,
                                },
                              },
                            }}
                          >
                            <ListItemIcon sx={{minWidth:'35px'}}>{text2.icon}</ListItemIcon>
                            <ListItemText primary={wordsUpperCase(text2.path)} />
                            {text2.children ? isOpen(`${text1.path}/${text2.path}`) ? <ExpandLess /> : <ExpandMore /> : ''}
                          </ListItemButton>
                        </ListItem>
                        {text2.children && (
                          <Collapse in={isOpen(`${text1.path}/${text2.path}`)} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                            {text2.children.map((text3, index3) => (
                              wordsUpperCase(text3.path) !== 'Edit' && (
                                <Box key={index3}>
                                  <ListItem 
                                    disablePadding
                                    // List item button ripple color change
                                    sx={() => ({
                                      flexDirection:'column',
                                      alignItems: 'stretch',
                                      "& .MuiTouchRipple-child": {
                                        backgroundColor: `${ccLargeFontColor}!important`,
                                      },
                                    })}
                                  >
                                    <ListItemButton 
                                      selected={selectedIndex === `${text1.path}/${text2.path}/${text3.path}`}
                                      onClick={e => handleClick(e, `${text1.path}/${text2.path}/${text3.path}`)}
                                      // List button hover focus and selected color change
                                      sx={{
                                        pl:4.5,
                                        '&:hover, &:focus, &.Mui-selected': {
                                          backgroundColor: ccVar1Color+'a3',
                                          ".MuiTouchRipple-root .MuiTouchRipple-ripple": {
                                            "&:hover": {
                                              backgroundColor: "red!important"
                                            }
                                          }
                                        },
                                        '&.Mui-selected': {
                                          '&:hover, &:focus': {
                                            backgroundColor: ccVar1Color,
                                          },
                                        },
                                      }}
                                    >
                                      <ListItemIcon sx={{minWidth:'35px'}}>{text3.icon}</ListItemIcon>
                                      <ListItemText primary={wordsUpperCase(text3.path)} />
                                    </ListItemButton>
                                  </ListItem>
                                </Box>
                              )
                            ))}
                            </List>
                          </Collapse>
                        )}
                      </Box>
                    )
                  ))}
                  </List>
                </Collapse>
              )}
              <CCDividerHorizontal sx={{mb:'opx',pb:'0px'}}/>
            </Box>
          )
        ))}
      </List>

      <List 
        component="nav"
        aria-labelledby="nested-list-subheader"
        sx={{pb: 0}}
        subheader={
          <ListSubheader 
            component="div" 
            id="nested-list-subheader"
            sx={{
              py:1,
              color: ccAreaBgColor,
              backgroundColor: ccVar4Color,
            }}
          >
            <Typography variant='subtitle1'>User Area Items</Typography>
          </ListSubheader>
        }
      >
        {userRouter.map((text1, index1) => (
          wordsUpperCase(text1.path) !== 'Edit' && (
            <Box key={index1}>
              <ListItem 
                disablePadding
                // List item button ripple color change
                sx={() => ({

                    // backgroundColor:`${ccVar4Color}38`,
          
                  flexDirection:'column',
                  alignItems: 'stretch',
                  "& .MuiTouchRipple-child": {
                    backgroundColor: `${ccLargeFontColor}!important`,
                  },
                })}
              >
                <ListItemButton 
                  selected={selectedIndex === `${text1.path}`}
                  onClick={e => handleClick(e, `${text1.path}`)}
                  // List button hover focus and selected color change
                  sx={{
                    '&:hover, &:focus, &.Mui-selected': {
                      backgroundColor: ccVar1Color+'a3',
                      ".MuiTouchRipple-root .MuiTouchRipple-ripple": {
                        "&:hover": {
                          backgroundColor: "red!important"
                        }
                      }
                    },
                    '&.Mui-selected': {
                      '&:hover, &:focus': {
                        backgroundColor: ccVar1Color,
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{minWidth:'35px'}}>{text1.icon}</ListItemIcon>
                  <ListItemText primary={wordsUpperCase(text1.path)} />
                  {text1.children ? isOpen(`${text1.path}`) ? <ExpandLess /> : <ExpandMore /> : ''}
                </ListItemButton>
              </ListItem>
              {text1.children && (
                <Collapse 
                  sx={{backgroundColor:`${ccVar4Color}38`}} 
                  in={isOpen(`${text1.path}`)} 
                  timeout="auto" 
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                  {text1.children.map((text2, index2) => (
                    wordsUpperCase(text2.path) !== 'Edit' && (
                      <Box key={index2}>
                        <ListItem 
                          disablePadding
                          // List item button ripple color change
                          sx={() => ({
                            flexDirection:'column',
                            alignItems: 'stretch',
                            "& .MuiTouchRipple-child": {
                              backgroundColor: `${ccLargeFontColor}!important`,
                            },
                          })}
                        >
                          <ListItemButton 
                            selected={selectedIndex === `${text1.path}/${text2.path}`}
                            onClick={e => handleClick(e, `${text1.path}/${text2.path}`)}
                            sx={{
                              pl: 3.5,
                              '&:hover, &:focus, &.Mui-selected': {
                                backgroundColor: ccVar1Color+'a3',
                                ".MuiTouchRipple-root .MuiTouchRipple-ripple": {
                                  "&:hover": {
                                    backgroundColor: "red!important"
                                  }
                                }
                              },
                              '&.Mui-selected': {
                                '&:hover, &:focus': {
                                  backgroundColor: ccVar1Color,
                                },
                              },
                            }}
                          >
                            <ListItemIcon sx={{minWidth:'35px'}}>{text2.icon}</ListItemIcon>
                            <ListItemText primary={wordsUpperCase(text2.path)} />
                            {text2.children ? isOpen(`${text1.path}/${text2.path}`) ? <ExpandLess /> : <ExpandMore /> : ''}
                          </ListItemButton>
                        </ListItem>
                        {text2.children && (
                          <Collapse in={isOpen(`${text1.path}/${text2.path}`)} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                            {text2.children.map((text3, index3) => (
                              wordsUpperCase(text3.path) !== 'Edit' && (
                                <Box key={index3}>
                                  <ListItem 
                                    disablePadding
                                    // List item button ripple color change
                                    sx={() => ({
                                      flexDirection:'column',
                                      alignItems: 'stretch',
                                      "& .MuiTouchRipple-child": {
                                        backgroundColor: `${ccLargeFontColor}!important`,
                                      },
                                    })}
                                  >
                                    <ListItemButton 
                                      selected={selectedIndex === `${text1.path}/${text2.path}/${text3.path}`}
                                      onClick={e => handleClick(e, `${text1.path}/${text2.path}/${text3.path}`)}
                                      // List button hover focus and selected color change
                                      sx={{
                                        pl:4.5,
                                        '&:hover, &:focus, &.Mui-selected': {
                                          backgroundColor: ccVar1Color+'a3',
                                          ".MuiTouchRipple-root .MuiTouchRipple-ripple": {
                                            "&:hover": {
                                              backgroundColor: "red!important"
                                            }
                                          }
                                        },
                                        '&.Mui-selected': {
                                          '&:hover, &:focus': {
                                            backgroundColor: ccVar1Color,
                                          },
                                        },
                                      }}
                                    >
                                      <ListItemIcon sx={{minWidth:'35px'}}>{text3.icon}</ListItemIcon>
                                      <ListItemText primary={wordsUpperCase(text3.path)} />
                                    </ListItemButton>
                                  </ListItem>
                                </Box>
                              )
                            ))}
                            </List>
                          </Collapse>
                        )}
                      </Box>
                    )
                  ))}
                  </List>
                </Collapse>
              )}
              <CCDividerHorizontal sx={{mb:'opx',pb:'0px'}}/>
            </Box>
          )
        ))}

        {roleRouter.map((text1, index1) => (
          wordsUpperCase(text1.path) !== 'Edit' && (
            <Box key={index1}>
              <ListItem 
                disablePadding
                // List item button ripple color change
                sx={() => ({

                    // backgroundColor:`${ccVar4Color}38`,
          
                  flexDirection:'column',
                  alignItems: 'stretch',
                  "& .MuiTouchRipple-child": {
                    backgroundColor: `${ccLargeFontColor}!important`,
                  },
                })}
              >
                <ListItemButton 
                  selected={selectedIndex === `${text1.path}`}
                  onClick={e => handleClick(e, `${text1.path}`)}
                  // List button hover focus and selected color change
                  sx={{
                    '&:hover, &:focus, &.Mui-selected': {
                      backgroundColor: ccVar1Color+'a3',
                      ".MuiTouchRipple-root .MuiTouchRipple-ripple": {
                        "&:hover": {
                          backgroundColor: "red!important"
                        }
                      }
                    },
                    '&.Mui-selected': {
                      '&:hover, &:focus': {
                        backgroundColor: ccVar1Color,
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{minWidth:'35px'}}>{text1.icon}</ListItemIcon>
                  <ListItemText primary={wordsUpperCase(text1.path)} />
                  {text1.children ? isOpen(`${text1.path}`) ? <ExpandLess /> : <ExpandMore /> : ''}
                </ListItemButton>
              </ListItem>
              {text1.children && (
                <Collapse 
                  sx={{backgroundColor:`${ccVar4Color}38`}} 
                  in={isOpen(`${text1.path}`)} 
                  timeout="auto" 
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                  {text1.children.map((text2, index2) => (
                    wordsUpperCase(text2.path) !== 'Edit' && (
                      <Box key={index2}>
                        <ListItem 
                          disablePadding
                          // List item button ripple color change
                          sx={() => ({
                            flexDirection:'column',
                            alignItems: 'stretch',
                            "& .MuiTouchRipple-child": {
                              backgroundColor: `${ccLargeFontColor}!important`,
                            },
                          })}
                        >
                          <ListItemButton 
                            selected={selectedIndex === `${text1.path}/${text2.path}`}
                            onClick={e => handleClick(e, `${text1.path}/${text2.path}`)}
                            sx={{
                              pl: 3.5,
                              '&:hover, &:focus, &.Mui-selected': {
                                backgroundColor: ccVar1Color+'a3',
                                ".MuiTouchRipple-root .MuiTouchRipple-ripple": {
                                  "&:hover": {
                                    backgroundColor: "red!important"
                                  }
                                }
                              },
                              '&.Mui-selected': {
                                '&:hover, &:focus': {
                                  backgroundColor: ccVar1Color,
                                },
                              },
                            }}
                          >
                            <ListItemIcon sx={{minWidth:'35px'}}>{text2.icon}</ListItemIcon>
                            <ListItemText primary={wordsUpperCase(text2.path)} />
                            {text2.children ? isOpen(`${text1.path}/${text2.path}`) ? <ExpandLess /> : <ExpandMore /> : ''}
                          </ListItemButton>
                        </ListItem>
                        {text2.children && (
                          <Collapse in={isOpen(`${text1.path}/${text2.path}`)} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                            {text2.children.map((text3, index3) => (
                              wordsUpperCase(text3.path) !== 'Edit' && (
                                <Box key={index3}>
                                  <ListItem 
                                    disablePadding
                                    // List item button ripple color change
                                    sx={() => ({
                                      flexDirection:'column',
                                      alignItems: 'stretch',
                                      "& .MuiTouchRipple-child": {
                                        backgroundColor: `${ccLargeFontColor}!important`,
                                      },
                                    })}
                                  >
                                    <ListItemButton 
                                      selected={selectedIndex === `${text1.path}/${text2.path}/${text3.path}`}
                                      onClick={e => handleClick(e, `${text1.path}/${text2.path}/${text3.path}`)}
                                      // List button hover focus and selected color change
                                      sx={{
                                        pl:4.5,
                                        '&:hover, &:focus, &.Mui-selected': {
                                          backgroundColor: ccVar1Color+'a3',
                                          ".MuiTouchRipple-root .MuiTouchRipple-ripple": {
                                            "&:hover": {
                                              backgroundColor: "red!important"
                                            }
                                          }
                                        },
                                        '&.Mui-selected': {
                                          '&:hover, &:focus': {
                                            backgroundColor: ccVar1Color,
                                          },
                                        },
                                      }}
                                    >
                                      <ListItemIcon sx={{minWidth:'35px'}}>{text3.icon}</ListItemIcon>
                                      <ListItemText primary={wordsUpperCase(text3.path)} />
                                    </ListItemButton>
                                  </ListItem>
                                </Box>
                              )
                            ))}
                            </List>
                          </Collapse>
                        )}
                      </Box>
                    )
                  ))}
                  </List>
                </Collapse>
              )}
              <CCDividerHorizontal sx={{mb:'opx',pb:'0px'}}/>
            </Box>
          )
        ))}
      </List>
    </>
  );
}

export default Menu;





































































// import { Link } from "react-router-dom";

// const Menu = () => {
//   return (
//     <>
//       <div id="menu">
//         <h2>Menu Items</h2>
//         <nav>
//           <ul>
//             <li>
//               <Link to={`/`}>Home</Link>
//             </li>
//             <li>
//               <Link to={`/dashboard`}>Dashboard</Link>
//             </li>
//             <li>
//               <Link to={`/profile`}>Profile</Link>
//             </li>
//             <li>
//               <Link to={`/about`}>About</Link>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </>
//   );
// };

// export default Menu;

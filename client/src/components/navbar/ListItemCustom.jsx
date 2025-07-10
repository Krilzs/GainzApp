import { ListItemButton, ListItemText, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useRef, useEffect } from "react";
import gsap from "gsap";

const ListItemCustom = ({ route, drawerOpen, index }) => {
  const listItemRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      listItemRef.current,
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        delay: index * 0.3,
        ease: "power2.out",
      }
    );
  }, [index]);

  return (
    <ListItemButton
      ref={listItemRef}
      key={route.name}
      component={NavLink}
      to={route.path}
      onClick={drawerOpen}
      className="list-item"
    >
      <ListItemText
        sx={{
          color: "text",
          fontWeight: "bold",
          borderBottom: "2px solid",
          borderColor: "secondary.main",
        }}
        variant="h4"
      >
        <Typography variant="h6" fontFamily={"anton"} component="span">
          {route.name}
        </Typography>
      </ListItemText>
    </ListItemButton>
  );
};

export default ListItemCustom;

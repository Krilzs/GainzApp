import { Box, Typography } from "@mui/material";

const FeatureBox = ({ flexDirection, info }) => {
  if (!flexDirection) {
    flexDirection = "row";
  } else {
    flexDirection = "row-reverse";
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: flexDirection },
        p: 2,
        mt: 2,
        alignItems: "center",
        gap: { xs: 0, md: 3 },
        height: { xs: "100%", md: "45vh" },
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          maxHeight: { xs: "30vh", md: "40vh" },
          maxWidth: { xs: "30vh", md: "40vh" },
          position: "relative",
        }}
      >
        <img
          src={info.image}
          alt="aca va la img"
          style={{
            width: "100%",
            scale: "1.1",
            height: "100%",
            objectFit: "contain",
            filter: "drop-shadow(0px 0px 30px rgba(0, 0, 0, 1 ))",
          }}
        />
      </Box>
      <Box
        sx={{
          mt: { xs: 3, md: 0 },
          borderTop: { xs: "3px solid #FF6B35", md: "none" },

          pt: { xs: 1, md: 0 },
        }}
      >
        <Typography variant="h4" fontFamily={"anton"} gutterBottom>
          {info.title}
        </Typography>
        <Typography>{info.description}</Typography>
      </Box>
    </Box>
  );
};

export default FeatureBox;

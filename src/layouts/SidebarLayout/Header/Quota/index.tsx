import React, { useEffect, useState } from "react";
import { Card, Typography, Box } from "@mui/material";
import styled from "@emotion/styled";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import useMediaQuery from "@mui/material/useMediaQuery";

const BalanceTypgrapy = styled(Typography)({
  marginLeft: "10px",
  display: "flex",
  fontSize: "14px",
  color: "#52b202",
});

function QuotaBox() {
  const [isMatch, setMatch] = useState(false);
  const matches = useMediaQuery("(min-width:900px)");

  useEffect(() => {
    setMatch(matches);
  }, [matches]);

  const bigBox = [
    <Card sx={{ paddingTop: "10px", paddingBottom: "10px", minWidth: "500px" }}>
      <Box sx={{ display: "flex" }}>
        <BalanceTypgrapy>
          Available Quota:&nbsp;&nbsp;
          <Typography variant="subtitle1" color="white">
            25000
          </Typography>
        </BalanceTypgrapy>
        <BalanceTypgrapy>
          Used Quota:&nbsp;&nbsp;
          <Typography variant="subtitle1" color="white">
            12000
          </Typography>
        </BalanceTypgrapy>
        <BalanceTypgrapy>
          Balance:&nbsp;&nbsp;
          <Typography variant="subtitle1" color="white">
            $4000
          </Typography>
        </BalanceTypgrapy>
        <BalanceTypgrapy sx={{ marginRight: "2rem" }}>
          Due Date:&nbsp;&nbsp;
          <Typography variant="subtitle1" color="white">
            03/12/2023
          </Typography>
        </BalanceTypgrapy>
      </Box>
    </Card>,
  ];
  const carouselBox = [
    <Card sx={{ paddingRight: "10px", paddingTop: "10px" }}>
      <Carousel
        axis="vertical"
        infiniteLoop
        showIndicators={false}
        showStatus={false}
        showArrows={false}
        showThumbs={false}
        autoPlay
      >
        <BalanceTypgrapy>
          Available Quota:&nbsp;&nbsp;
          <Typography variant="subtitle1" color="white">
            25000
          </Typography>
        </BalanceTypgrapy>
        <BalanceTypgrapy>
          Used Quota:&nbsp;&nbsp;
          <Typography variant="subtitle1" color="white">
            12000
          </Typography>
        </BalanceTypgrapy>
        <BalanceTypgrapy>
          Balance:&nbsp;&nbsp;
          <Typography variant="subtitle1" color="white">
            $4000
          </Typography>
        </BalanceTypgrapy>
        <BalanceTypgrapy>
          Due Date:&nbsp;&nbsp;
          <Typography variant="subtitle1" color="white">
            03/12/2023
          </Typography>
        </BalanceTypgrapy>
      </Carousel>
    </Card>,
  ];

  if (isMatch)
    return (
      <Card
        sx={{ paddingTop: "5px", paddingBottom: "5px", minWidth: "500px" }}
      >
        <Box sx={{ display: "flex" }}>
          <BalanceTypgrapy>
            Available Quota:&nbsp;&nbsp;
            <Typography variant="subtitle1" color="white">
              25000
            </Typography>
          </BalanceTypgrapy>
          <BalanceTypgrapy>
            Used Quota:&nbsp;&nbsp;
            <Typography variant="subtitle1" color="white">
              12000
            </Typography>
          </BalanceTypgrapy>
          <BalanceTypgrapy>
            Balance:&nbsp;&nbsp;
            <Typography variant="subtitle1" color="white">
              $4000
            </Typography>
          </BalanceTypgrapy>
          <BalanceTypgrapy sx={{ marginRight: "10px" }}>
            Due Date:&nbsp;&nbsp;
            <Typography variant="subtitle1" color="white">
              03/12/2023
            </Typography>
          </BalanceTypgrapy>
        </Box>
      </Card>
    );
  else
    return (
      <Card sx={{ paddingRight: "5px", paddingTop: "5px" }}>
        <Carousel
          axis="vertical"
          infiniteLoop
          showIndicators={false}
          showStatus={false}
          showArrows={false}
          showThumbs={false}
          autoPlay
        >
          <BalanceTypgrapy>
            Available Quota:&nbsp;&nbsp;
            <Typography variant="subtitle1" color="white">
              25000
            </Typography>
          </BalanceTypgrapy>
          <BalanceTypgrapy>
            Used Quota:&nbsp;&nbsp;
            <Typography variant="subtitle1" color="white">
              12000
            </Typography>
          </BalanceTypgrapy>
          <BalanceTypgrapy>
            Balance:&nbsp;&nbsp;
            <Typography variant="subtitle1" color="white">
              $4000
            </Typography>
          </BalanceTypgrapy>
          <BalanceTypgrapy>
            Due Date:&nbsp;&nbsp;
            <Typography variant="subtitle1" color="white">
              03/12/2023
            </Typography>
          </BalanceTypgrapy>
        </Carousel>
      </Card>
    );
}

export default QuotaBox;

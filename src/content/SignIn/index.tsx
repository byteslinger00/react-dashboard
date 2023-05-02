import { Box, Container, Card, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { styled } from '@mui/material/styles';
import SignIn from './SignIn';

const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`
);

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(50)};
    align-slef: center
`
);

const TypographyH2 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(17)};
`
);

function Overview(props:{admin:Boolean, agent:Boolean}) {
  return (
    <OverviewWrapper>
      <Helmet>
        <title>Baohule</title>
      </Helmet>
      <Container maxWidth="lg" sx={{textAlign:'-webkit-center'}}>
        <Box justifyContent="center" pt={15} pb={5} textAlign="center" alignItems="center">
          <TypographyH1 sx={{ mb: 2 }} variant="h1">
              Welcome back!
          </TypographyH1>
          <TypographyH2
            sx={{ lineHeight: 1.5, pb: 4 }}
            pt={4}
            variant="h4"
            color="text.secondary"
            fontWeight="normal"
          >
            Please log in to your account.
          </TypographyH2>
        </Box>
        <Card sx={{ 
            pl: 1,
            pr: 1,
            pt: 3,
            pb: 3, 
            mb: 10, 
            borderRadius: 2, 
            justifyContent:"center", 
            textAlign:"center", 
            width:{xs:"100%", md:"40%", sm:"60%"} 
          }}>
          <SignIn admin={props.admin} agent={props.agent}/>
        </Card>
      </Container>
    </OverviewWrapper>
  );
}
export default Overview;

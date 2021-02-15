import withRoot from './withRoot';
// --- Post bootstrap -----
import React from 'react';
// import ProductCategories from './modules/views/ProductCategories';
import AppFooter from './AppFooter';
import ProductHero from './ProductHero';
// import ProductValues from './modules/views/ProductValues';
import AppAppBar from './TopBar/AppAppBar';
import ProductHowItWorks from './HowItWorks/index';

function Index() {
  return (
    <React.Fragment>
      <AppAppBar />
      <ProductHero />
      {/* <ProductValues />
      <ProductCategories /> */}
            <ProductHowItWorks />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Index);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from './Button';
import Typography from './Typography';
import ProductHeroLayout from './ProductHeroLayout';
import BackImg from '../../../images/blood-donation.jpg'


const styles = (theme) => ({
  background: {
    backgroundImage: `url(${BackImg})`,
    backgroundColor: '#7fc7d9', // Average color of the background image.
    backgroundPosition: 'center',
  },
  button: {
    minWidth: 200,
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10),
    },
  },
  more: {
    marginTop: theme.spacing(2),
  },
});

function ProductHero(props) {
  const { classes } = props;

  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
      {/* Increase the network loading priority of the background image. */}
      <img style={{ display: 'none' }} src={BackImg} alt="increase priority" />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Donate Your Blood
      </Typography>
      <Typography color="inherit" align="center" variant="h5" className={classes.h5}>

      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        className={classes.button}
        component="a"
        href="/dashboard/donors"
      >
        Donate
      </Button>
    </ProductHeroLayout>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHero);

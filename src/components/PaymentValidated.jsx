import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Typography from '@material-ui/core/Typography';
import Grow from '@material-ui/core/Grow';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  successContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(4),
    backgroundColor: '#e0f2f1',
    borderRadius: 8,
    
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
    animation: '$fadeInUp 0.5s ease-in-out',
    marginBottom: theme.spacing(4),
  },
  successIcon: {
    color: '#00c853',
    fontSize: 72,
    marginBottom: theme.spacing(2),
  },
  successText: {
    color: '#37474f',
    fontSize: 32,
    fontWeight: 600,
    marginBottom: theme.spacing(1),
  },
  successSubtext: {
    color: '#37474f',
    fontSize: 20,
    marginBottom: theme.spacing(2),
    textAlign: 'center',
    maxWidth: '80%',
    [theme.breakpoints.up('md')]: {
      maxWidth: '50%',
    },
  },
  additionalText: {
    color: '#37474f',
    fontSize: 16,
    marginTop: theme.spacing(2),
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
  button: {
    width: '100%',
    maxWidth: 400,
    padding: theme.spacing(2),
    borderRadius: 50,
    fontWeight: 600,
    fontSize: 18,
  },
  '@keyframes fadeInUp': {
    '0%': {
      opacity: 0,
      transform: 'translateY(30px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}));

function PaymentSuccess({ additionalMessage }) {
  const classes = useStyles();
  const history = useHistory();

  const handleHomeButtonClick = () => {
    history.push('/ProjectList');
  };

  return (
    <Grow style={{marginBottom:"25%",marginTop:"5%",marginRight:"5%",marginLeft:"5%"}}in={true}>
      <div className={classes.successContainer}>
        <CheckCircleOutlineIcon className={classes.successIcon} />
        <Typography variant="h1" className={classes.successText}>
          Payment Successful
        </Typography>
        <Typography variant="subtitle1" className={classes.successSubtext}>
          Thank you for your purchase. We appreciate your business and thank you for choosing our service!
        </Typography>
        {additionalMessage && (
          <Typography variant="subtitle1" className={classes.additionalText}>
            {additionalMessage}
          </Typography>
        )}
        <div className={classes.buttonContainer}>
          <Button
            class="btn btn-primary  w-30 rounded-pill"
            variant="contained"
            color="primary"
            onClick={handleHomeButtonClick}
          >
            Back to Your Project List
        </Button>
        </div>
  </div>
</Grow>
  );
}

export default PaymentSuccess;

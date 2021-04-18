import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import App from './App';
import Watch from './Watch';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { HashRouter as Router, Switch, Route, } from "react-router-dom";


const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
    },
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
});


class Home extends Component {

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <div className={classes.root}>

                    <CssBaseline />
                    <Container component="main" className={classes.main} maxWidth="sm">
                        <Typography variant="h2" component="h1" gutterBottom>
                            WebStremio
                    </Typography>
                        <Router >
                            <Switch>
                                <Route exact path="/">
                                    <App />
                                </Route>
                                <Route path="/watch/:id">
                                    <Watch />
                                </Route>
                            </Switch>
                        </Router>
                    </Container>
                    <footer className={classes.footer}>
                        <Container maxWidth="sm">
                            <Typography variant="body1">We love Stremio</Typography>
                        </Container>
                    </footer>
                </div>
            </React.Fragment>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);

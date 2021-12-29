import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        padding: '20px 0px 50px',
        background: '#0e0b17',
    },
    root: {
        display: 'flex',
    },
    link: {
        marginRight: 15,
        fontSize: '22px',
        textDecoration: 'none',
        color: '#fff',
        fontWeight: 500,
    }
})

function NavMenu() {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={classes.root}>
                <Link to='/' className={classes.link}>Login</Link>
                <Link to='/register' className={classes.link}>Register</Link>
            </div>
        </div>
    )
}

export default NavMenu;
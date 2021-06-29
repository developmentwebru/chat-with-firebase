import React from 'react'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
function Loader() {// обычный лоадер
    return (
        <Container>
            <Grid
                container
                style={{ height: window.innerHeight - 50 }}
                alignItems={'center'}
                justify={'center'}
            >
                <Grid
                    container
                    alignItems={'center'}
                    direction={'column'}
                >
                    <div className="lds-dual-ring"></div>
                </Grid>
            </Grid>
        </Container >
    )
}

export default Loader

import { AppBar } from '@mui/material'
import { Toolbar } from '@mui/material'
import Typography from '@mui/material/Typography'


export function NavBar() {


  return (
    <div>
      <AppBar position="static">
        <Toolbar>

          <Typography
            align="center"
            variant="h4"
            noWrap
            component="div"
            sx={{ flex: 1 }}>
            Welcome to OliExpress!
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography
} from "@mui/material";

export default function Login() {
  return (
    <Card sx={{ width: 350}} className="p-6 rounded-xl">
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Iniciar sesión
        </Typography>
        <TextField size="small" label="Usuario o Email"  className="mb-7 mt-4 w-full" />
        <TextField size="small" label="Contraseña" type="password" className="mb-3 w-full"/>
      </CardContent>
      <CardActions className="flex justify-end pr-4">
        <Button type="submit" variant="outlined" color="primary">
          Iniciar sesión
        </Button>
      </CardActions>
    </Card>
  );
}

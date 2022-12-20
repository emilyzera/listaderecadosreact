import AddIcon from "@mui/icons-material/Add";
import { Box, Grid, Paper } from "@mui/material";
import Fab from "@mui/material/Fab";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardRecado from "../../componets/CardRecado/CardRecado";
import MeuModal from "../../componets/MeuModal/MeuModal";
import { useAppSelector } from "../../store/modules/hooks";
import { selectAll as recadosSelectAll } from "../../store/modules/SliceRecados/SliceRecados";
import { getUsuarioLogado } from "../../utils/functions";

const Recados = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!getUsuarioLogado()) navigate("/");
  }, []);

  const usuarioLogado = getUsuarioLogado();
  const todosOsRecados = useAppSelector(recadosSelectAll);
  const recadosDoUsuario = todosOsRecados.filter(
    (recado) => recado.usuario === usuarioLogado
  );
  const [existeRecado, setExisteRecado] = useState<boolean>(false);

  const [id, setId] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => setOpen(false);

  function handleOpen(id: string) {
    setId(id);
    setOpen(true);
  }

  useEffect(() => {
    if (recadosDoUsuario.length > 0) {
      setExisteRecado(true);
    } else {
      setExisteRecado(false);
    }
  });

  return (
    <>
      <Grid
        container
        margin={"auto"}
        xs={12}
        md={11}
        sx={{ marginBottom: 11, mt: 1 }}
      >
        <Paper sx={{ padding: 2, width: 1, opacity: 0.9 }} elevation={7}>
          <Grid container justifyContent={"center"} margin={"auto"}>
            <Grid container spacing={3}>
              {recadosDoUsuario.map((recado) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  data-idRecado={recado.id}
                  data-usuarioRecado={recado.usuario}
                  key={recado.id}
                >
                  <CardRecado
                    data={recado.data}
                    titulo={recado.titulo}
                    descricao={recado.descricao}
                    usuario={recado.usuario}
                    id={recado.id}
                    setModal={() => handleOpen(recado.id)}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      {open && <MeuModal open={open} handleClose={handleClose} id={id} />}

      <Box position={"fixed"} bottom={20} right={20}>
        <Fab
          onClick={() => navigate("/recados/novorecado")}
          color="secondary"
          aria-label="add"
        >
          <AddIcon />
        </Fab>
      </Box>
    </>
  );
};

export default Recados;

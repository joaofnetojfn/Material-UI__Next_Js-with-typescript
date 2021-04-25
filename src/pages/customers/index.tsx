import {
  Typography,
  Button,
  makeStyles,
  createStyles,
  Theme,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Paper,
  Snackbar,
} from '@material-ui/core';
import Link from 'next/link';
import { Delete, Edit } from '@material-ui/icons';
import LayoutWithMenu from '../../components/layout/LayoutWithMenu/LayoutWithMenu';
import ConfirmationDialog from '../../components/screen/ConfirmationDialog/ConfirmationDialog';
import { useState, useEffect } from 'react';
import { getCustomers } from '../../lib/api/customers';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    table: {
      marginTop: theme.spacing(3),
    },
  })
);

export default function CustomerList() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);

  const [deleteOptions, setDeleteOptions] = useState<{
    show: boolean;
    itemId?: number;
    itemDescripton?: string;
  }>({ show: false });

  const [messageInfo, setMessageInfo] = useState<{
    show: boolean;
    message: string;
  }>({ show: false });

  const handleDelete = (item: any) => {
    setDeleteOptions({
      show: true,
      itemId: item.id,
      itemDescription: item.name,
    });
  };

  const handleCloseMessage = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setMessageInfo({ show: false, message: '' });
  };

  const handleDeleteCallBack = (value: string) => {
    const { itemId } = deleteOptions;
    setDeleteOptions({ show: false, itemId: null, itemDescription: null });

    if (value === 'ok') {
      //deleter o item
      //exibir mensagem de erro
      setMessageInfo({ show: true, message: 'Item excluído com sucesso' });
    }
  };

  useEffect(() => {
    getCustomers().then((rowsResult) => setRows(rowsResult));
  }, []);

  return (
    <LayoutWithMenu>
      <div className={classes.toolbar}>
        <div>
          <Typography component="h1" variant="h4">
            Clientes
          </Typography>
        </div>
        <div>
          <Link href="/customers/new" passHref>
            <Button variant="contained" color="primary">
              Novo Cliente
            </Button>
          </Link>
        </div>
      </div>

      <TableContainer component={Paper} className={classes.table}>
        <Table aria-label="Clientes">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell width="140" align="center">
                Ações
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(row)}
                  >
                    <Delete />
                  </IconButton>
                  <Link href={`/customers/edit/${row.id}`} passHref>
                    <IconButton aria-label="edit">
                      <Edit />
                    </IconButton>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ConfirmationDialog
        id={`delete-${deleteOptions.itemId}`}
        title="Excluir"
        confirmButtonText="Excluir"
        keepMounted
        open={deleteOptions.show}
        onClose={handleDeleteCallBack}
      >
        Confirma a exclusão do Item{' '}
        <strong>{deleteOptions.itemDescription}</strong>
      </ConfirmationDialog>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
        open={messageInfo.show}
        message={messageInfo.message}
        key={messageInfo.message}
        onClose={handleCloseMessage}
      />
    </LayoutWithMenu>
  );
}

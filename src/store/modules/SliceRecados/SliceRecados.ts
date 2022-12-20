import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { EstadoDaStore } from '../..';

export interface Recado {
    id: string,
    titulo: string,
    descricao: string,
    data: string,
    usuario: string,
}

const adaptadorDosRecados = createEntityAdapter<Recado>({
    selectId: (recado) => recado.id,
});

export const { selectAll, selectById } = adaptadorDosRecados.getSelectors((state: EstadoDaStore) => state.recados)

const SliceRecado = createSlice({
    name: 'recado',
    initialState: adaptadorDosRecados.getInitialState(),
    reducers: {
        adicionarRecado: adaptadorDosRecados.addOne,
        atualizarRecado: adaptadorDosRecados.updateOne,
        removerRecado: adaptadorDosRecados.removeOne,
    },
})

export const { adicionarRecado, atualizarRecado, removerRecado } = SliceRecado.actions

export default SliceRecado.reducer
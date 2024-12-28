// src/app/dtos/registro.dto.ts

import { UsuarioRegistroDTO } from './usuarioRegistroDTO';
import { OfertanteDTO } from './ofertanteDTO';
import { DemandanteDTO } from './demandanteDTO';

export interface RegistroDTO {
    usuario: UsuarioRegistroDTO;
    ofertante?: OfertanteDTO;
    demandante?: DemandanteDTO;
}

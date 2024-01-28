import { DuacoderInfoDto } from "src/core-services/dtos/response/duacoderInfoResponse.dto";
import * as PDFDocument from 'pdfkit';
import { FileInterface } from "./file.interface";

export class FileServiceImpl implements FileInterface {
    constructor() { }

    async generatePdf(duacoder: DuacoderInfoDto): Promise<Buffer> {
        const conCebolla = duacoder.tortilla_con_cebolla ? 'Si' : 'No';
        const pdfBuffer: Buffer = await new Promise(resolve => {
            const doc = new PDFDocument({
                size: 'A4',
                bufferPages: true
            });
            doc
                .fontSize(16)
                .text(`Ficha del Duacoder - NIF: ${duacoder.nif}`, { align: 'center' })
                .fontSize(12)
                .text(`Nombre: ${duacoder.nombre}`)
                .text(`Fecha de nacimiento: ${duacoder.fecha_nacimiento}`)
                .text(`Biografia: ${duacoder.biografia}`)
                .text(`Tortilla con cebolla: ${conCebolla}`)
                .text(`Departamento: ${duacoder.nombre_departamento}`)
                .text(`Puesto: ${duacoder.nombre_puesto}`)
                .text(`Skills: ${duacoder.skills}`)
            doc.end();

            const buffer = [];
            doc.on('data', buffer.push.bind(buffer));
            doc.on('end', () => {
                const data = Buffer.concat(buffer);
                resolve(data);
            })
        })

        return pdfBuffer;
    }

}
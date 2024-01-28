import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { PhotoRepositoryInterface } from "./photo.interface";
import { Photo } from "../../entities/photos.entity";

@Injectable()
export class PhotoRepository implements PhotoRepositoryInterface {
    constructor(
        @InjectRepository(Photo)
        private photoRepository: Repository<Photo>
    ) { }

    async uploadDuacoderPhoto(photo: string, nif: string): Promise<boolean> {
        const photoDB = await this.photoRepository.save({ photo_string: photo, duacoder_id: nif });
        if (photoDB.id) return true;
        return false;
    }

    async getDuacoderPhoto(nif: string): Promise<string> {
        const response = await this.photoRepository
            .createQueryBuilder()
            .select(['photo_string'])
            .where('duacoder_id = :nif', { nif })
            .execute();

        if (!response.length) return 'El duacoder no tiene foto registrada.';
        return response[0].photo_string;
    }

    async deleteDuacoderPhoto(nif: string): Promise<boolean> {
        const response = await this.photoRepository
            .createQueryBuilder()
            .delete()
            .from(Photo)
            .where("duacoder_id = :nif", { nif })
            .execute();
        if(response.affected === 1) return true;
        return false;
    }
}
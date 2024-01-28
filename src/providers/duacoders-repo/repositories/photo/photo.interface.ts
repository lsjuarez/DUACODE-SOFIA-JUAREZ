export interface PhotoRepositoryInterface {
    uploadDuacoderPhoto(photo:string, nif:string): Promise<boolean>;
    getDuacoderPhoto(nif: string): Promise<string>;
    deleteDuacoderPhoto(nif: string): Promise<boolean>;
}
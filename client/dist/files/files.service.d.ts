export declare class FilesService {
    createImage({ image, directoryPath, fileName }: {
        image: any;
        directoryPath?: string;
        fileName?: string;
    }): Promise<string>;
    removeFile({ directoryPath, fileName }: {
        directoryPath?: string;
        fileName: string;
    }): Promise<void>;
}

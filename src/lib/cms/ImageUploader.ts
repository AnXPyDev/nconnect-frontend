export interface ImageUploaderFile {
    name: string,
    type: string,
    extension: string,
    blob_src: string,
    blob: Blob
}

export async function getFilesFromDrop(event: DragEvent): Promise<ImageUploaderFile[]> {
    if (event.dataTransfer) {
        return processFileList(event.dataTransfer.files);
    }
    return [];
}

function processFileList(fl: FileList): ImageUploaderFile[] {
    return [...fl].map((file) => {
        return {
            name: file.name,
            blob: file,
            type: file.type,
            extension: file.name.split('.').pop()!!,
            blob_src: URL.createObjectURL(file)
        };
    })
}

export function pickFiles(multiple: boolean = true): Promise<ImageUploaderFile[]> {
    return new Promise((resolve, reject) => {
        const input = document.createElement("input");
        input.type = "file";
        input.multiple = multiple;
        input.click();
        input.addEventListener("change", (ev) => {
            if (input.files) {
                resolve(processFileList(input.files));
            }
        });
    });
}
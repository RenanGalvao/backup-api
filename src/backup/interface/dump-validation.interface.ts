export interface DumpValidation {
    // message key is generated after passing through 'BadRequestException'
    message: {
        property: string;
        constraits: {
            [key: string]: any;
        }
    }[]
}
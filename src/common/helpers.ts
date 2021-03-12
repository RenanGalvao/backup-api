export function fileNameTimestamp(database: string){
    return `${new Date().toLocaleString().replace(/[\/\s:]/g, '-')}-${database}.sql`;
}
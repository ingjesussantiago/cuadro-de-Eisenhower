import { dirname } from "path"
import { fileURLToPath } from "url"

export const __dirname = dirname(fileURLToPath(import.meta.url))

// console.log(__dirname )

// esta funcion solo ordena devuelve el mismo array, pero ordenado
export function ordenarFecha(arr) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len - 1; j++) {
            if (arr[j].fecha === "" || (arr[j + 1].fecha !== "" && new Date(arr[j].fecha) > new Date(arr[j + 1].fecha))) {
                // Intercambiar elementos
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}



async function generarParFirma() {
    return await crypto.subtle.generateKey(
        {
            name: "RSA-PSS",
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256",
        },
        true,
        ["sign", "verify"]
    );
}

async function generarParCifrado() {
    return await crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256",
        },
        true,
        ["encrypt", "decrypt"]
    );
}

function bufferABase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binario = "";
    for (const b of bytes) binario += String.fromCharCode(b);
    return btoa(binario);
}

async function exportarPublica(clave){
    const bytes = await crypto.subtle.exportKey("spki", clave);
    return bufferABase64(bytes);
}

async function exportarPrivada(clave) {
    const bytes = await crypto.subtle.exportKey("pkcs8", clave);
    return bufferABase64(bytes);
}
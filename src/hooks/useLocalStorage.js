import { useState, useEffect } from "react";

function useLocalStorage(chave, valorInicial, validar = null) {

    const [valor, setValor] = useState(() => {

    try {

        const valorSalvo = localStorage.getItem(chave);

       if (valorSalvo === null) {
    return valorInicial;
}

const dados = JSON.parse(valorSalvo);

if (validar && !validar(dados)) {

    console.warn("Dados inválidos no localStorage:", chave);

    return valorInicial;

}

return dados;

    } catch (erro) {

        console.error("Erro ao ler localStorage:", erro);

        return valorInicial;

    }

});
useEffect(() => {

    try {

        localStorage.setItem(
            chave,
            JSON.stringify(valor)
        );

    } catch (erro) {

        console.error("Erro ao salvar no localStorage:", erro);

    }

}, [chave, valor]);
    return [valor, setValor];

}

export default useLocalStorage;
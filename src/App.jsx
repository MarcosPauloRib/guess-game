import {useEffect, useState} from 'react'
import './App.css'

let nextId = 0;

export default function App() {
  const [tentativas, setTentativas] = useState(10)
  const [fimDoJogo, setFimDoJogo] = useState(false)
  const [numeroAleatorio, setNumeroAleatorio] = useState(Math.floor(Math.random() *100) + 1);
  const [valor, setValor] = useState('');
  const [chutes, setChutes] = useState([]);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    setNumeroAleatorio(Math.floor(Math.random() * 100) + 1);
  }, [fimDoJogo]);
  
  const validar = () => {
    const palpite = parseInt(valor);
    console.log('Validando palpite...')

    if(palpite <1 || palpite > 100){
      setMensagem('Por favor, digite um número entre 1 e 100');
      return;
    }

    if(palpite === numeroAleatorio){
      setMensagem('Parabéns! Você acertou o número!');
      setFimDoJogo(true);
    }else{
      setTentativas((prevTentativas) => {
        if(prevTentativas === 1){
          setMensagem('Fim de jogo! O número era .' + numeroAleatorio);
          setFimDoJogo(true);
        }else{
          setMensagem(palpite < numeroAleatorio ? 'Valor baixo!' : 'Valor alto!');
        }
        return prevTentativas -1;
      });
    }
    setValor('');

    /*if(tentativas === 1)
      setFimDoJogo(true)
    
    setTentativas(tentativas -1)*/
  }

  const juntarChutes = () =>{
    setChutes([
      ...chutes,
      {id: nextId++, name: valor}
    ])
  }

  const reiniciar = () => {
    setTentativas(10)
    setFimDoJogo(false)
    setValor('');
    setChutes([]);
    setMensagem('');
    setNumeroAleatorio(Math.floor(Math.random() * 100) + 1);
  };
  
  return (
    <main>
      <h1>Jogo Adivinhe o número</h1>
      <p>
        Selecionamos um número aletório entre 1 e 100. 
        Veja se consegue adivinhar em <strong>{tentativas}</strong> chances ou menos.
        Lhe diremos se seu palpite está com um valor alto ou baixo.
      </p>
      <div>
        <label>Digite seu palpite:</label>
        <input type="number" min="1" max="100" disabled={fimDoJogo} value={valor} onChange={(e) => setValor(e.target.value)}/>
        <button onClick={() => {
          validar();
          juntarChutes();
        }} disabled={fimDoJogo}>ENVIAR PALPITE</button>
        {
          fimDoJogo && <button onClick={reiniciar}>REINICIAR</button>
        }
      </div>
      <p id="mensagem">{mensagem}</p>
      <p>Valores informados: {valor}</p>
      <ul>{chutes.map(chutes => (
          <li key={chutes.id}>{chutes.name}</li>
        ))}
      </ul>
    </main>
  )
}

import { useState } from 'react';
import './App.css';
import Canvas from './Components/Canvas';
import Triangle from './Triangle';
import Matrix from './Components/Matrix';
import Gcd from './Components/Gcd';

function App() {
  const triangle = new Triangle();
  const [shape, setShape] = useState(triangle.generate(1, 2, 0));
  const [primitive, setPrimitive] = useState(triangle.generate(1, 2, 0));
  const [cosine, setCosine] = useState([0, 1]);

  const gcdOfTwo = (a, b) => b ? gcdOfTwo(b, a%b) : a;

  const gcdOfArray = (array) => {
    let n = 0;
    array.forEach(el => {n = gcdOfTwo(el, n)});
    return n;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const p_ = Number(formData.get("p_"));
    const q_ = Number(formData.get("q_"));
    const cosA = Number(formData.get("cosineA"));
    const cosB = Number(formData.get("cosineB"));
    const cos = cosA / cosB;
    setCosine([cosA, cosB]);
    setShape(triangle.generate(p_, q_, cos));
    const { A, B, C } = shape;
    const gcd = gcdOfArray([A * cosB, B * cosB, C * cosB]);
    setPrimitive({
      ...shape,
      A: A * cosB / gcd,
      B: B * cosB / gcd,
      C: C * cosB / gcd
    })
  }

  return (
    <div className='App'>
      <h1>Üçgen Oluşturma</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='p_'>p': </label>
        <input
          type="text"
          id="p_"
          name="p_"
          placeholder="Enter the number for p'"
          defaultValue={1}
          autoComplete="off"
        />
        <label htmlFor='q_'>q': </label>
        <input
          type="text"
          id="q_"
          name="q_"
          placeholder="Enter the number for q'"
          defaultValue={2}
          autoComplete="off"
        />
        <div className="cosine">
          <span>cosθ (a/b): </span>
          <input
            type="text"
            id="cosineA"
            name="cosineA"
            defaultValue={0}
            autoComplete="off"
          /> / <input
            type="text"
            id="cosineB"
            name="cosineB"
            defaultValue={1}
            autoComplete="off"
          />
        </div>
        <button type="submit"><span>Oluştur</span></button>
      </form>
      <details>
        <summary>Adım 1 - Değişkenlerin hesaplanması ve üçgenin oluşturulması</summary>
        <div>
          <div>p = q' * (1 - 2 * cosθ) - p'</div>
          <div>q = p' + q'</div>işlemleri hesaplanır.
          <div>p = {shape.matrix[1][1]} * (1 - 2 * ({cosine[0]} / {cosine[1]})) - {shape.matrix[0][1]} = {shape.matrix[0][0]}</div>
          <div>q = {shape.matrix[0][1]} + {shape.matrix[1][1]} = {shape.matrix[1][0]}</div>
        </div>
      </details>
      <div className="shapeInfo">
        <span className="matrices">
          <Matrix rows={[["p", "p'"],["q", "q'"]]}/>
          {":"}
          <Matrix rows={
            shape.matrix.map(
              row => (
                row.map(el => (Number.isInteger(el) ? el : el.toFixed(2)))
              )
            )
          }/>
        </span>
        <span>A: {shape.A}</span>
        <span>B: {shape.B}</span>
        <span>C: {shape.C}</span>
        <span>θ: {shape.angle}{"\u00BA"}</span>
      </div>
      <Canvas draw={triangle.draw} shape={shape} width={500} height={250}/>
      <details>
        <summary>Adım 2 - Primitif (en sade) üçgenin oluşturulması</summary>
        <div>
          <div>Kenarların tam sayı olabilmesi için her bir kenar cosθ = a/b ifadesindeki b ile çarpılır.</div>
          {
            [shape.A, shape.B, shape.C].every(Number.isInteger)
            ? <li>Kenarlar tam sayı olduğundan çarpma işlemine gerek yoktur.</li>
            : <>
              <li>cosθ = {cosine[0]}/{cosine[1]}, b = {cosine[1]}</li>
              <li>{shape.A} * {cosine[1]} = {shape.A * cosine[1]}</li>
              <li>{shape.B} * {cosine[1]} = {shape.B * cosine[1]}</li>
              <li>{shape.C} * {cosine[1]} = {shape.C * cosine[1]}</li>
            </>
          }
          <br/>
          <div>Daha sonra elde edilen sayılar en büyük ortak bölenleri "gcd" ile sadeleştirilir ve primitif üçgen elde edilir.</div>
          <Gcd array={
            [shape.A, shape.B, shape.C].every(Number.isInteger)
            ? [shape.A, shape.B, shape.C]
            : [shape.A, shape.B, shape.C].map(n => n * cosine[1])
          }/>
        </div>
      </details>
      <div>
        <span>A: {primitive.A}</span>
        <span>B: {primitive.B}</span>
        <span>C: {primitive.C}</span>
      </div>
      <Canvas draw={triangle.draw} shape={primitive} width={500} height={250}/>
      <span class="credit">Tarık Tamer, Hamza Kağan Özer, 2023</span>
    </div>
  );
}

export default App;

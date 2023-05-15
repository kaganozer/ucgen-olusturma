"use client";

import { useState } from 'react';
import Canvas from '@/components/Canvas';
import { IoHelpCircleOutline } from 'react-icons/io5';

export default function Home() {
  const [triangle, setTriangle] = useState({ A: 3, B: 4, C: 5, cos: 0 });
  const [variables, setVariables] = useState({ m: 2, n: 1, cosine: [0, 1] });
  const [infoActive, setInfoActive] = useState(false);

  const gcd = (a, b) => b ? gcd(b, a % b) : a;

  const generateTriangle = (m, n, cos) => {
    const A = m ** 2 - n ** 2;
    const B = 2 * m * n + 2 * (m ** 2) * cos;
    const C = m ** 2 + n ** 2 + 2 * m * n * cos;
    setTriangle({ A, B, C, cos });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const m = Number(formData.get("m"));
    const n = Number(formData.get("n"));
    const cosA = Number(formData.get("cosineA"));
    const cosB = Number(formData.get("cosineB"));
    const cos = cosA / cosB;
    setVariables({ m, n, cosine: [cosA, cosB] });
    generateTriangle(m, n, cos);
  }

  return (
    <main>
      <h1>
        <span>Üçgen Oluşturma</span>
        <IoHelpCircleOutline
          className='help'
          title="Bilgilendirme"
          onClick={() => { setInfoActive(active => !active) }}
        />
      </h1>
      <div
        style={{
          maxHeight: infoActive ? 0 : '20rem',
          overflow: 'hidden',
          pointerEvents: 'none'
        }}
        className='infoText'
      >
          İstenilen kosinüs değerine sahip açıyı içeren üçgenlerin, girilen m ve n değerlerine bağlı olarak nasıl değiştiğini gözlemlemek adına kurulmuş bir web sitesidir.
          <br /><br />
          <b>Değişkenler nasıl girilmeli?</b>
          <br />
          Üçgen eşitsizlikleri ve tanımlarına uymak için m, n ve kosinüs değerlerinin verilen tanıma uygun olarak girilmesi gerekmektedir:
          <br />
          1 {"\u003e"} n/m {"\u003e"} -cos{"\u03b8"} {"\u003e"} -1
          <br /><br />
          <b>Uyarı:</b> Kullanılan kodlama dilinin doğası gereği bazı durumlarda hesaplamalar doğru sonuçlar vermeyebilir. Ondalık sayı yerine tam sayı girilmesi daha doğru sonuçlar verecektir.
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='m'>m: </label>
        <input
          type="text"
          id="m"
          name="m"
          placeholder="m değerini giriniz"
          defaultValue={2}
          autoComplete="off"
        />
        <label htmlFor='n'>n: </label>
        <input
          type="text"
          id="n"
          name="n"
          placeholder="n değerini giriniz"
          defaultValue={1}
          autoComplete="off"
        />
        <div className='cosine'>
          <label htmlFor="cosineA">cosθ (a/b): </label>
          <input
            type="text"
            id="cosineA"
            name="cosineA"
            defaultValue={0}
            autoComplete="off"
          />
          <span> / </span>
          <input
            type="text"
            id="cosineB"
            name="cosineB"
            defaultValue={1}
            autoComplete="off"
          />
        </div>
        <button type="submit">
          <span>Oluştur</span>
        </button>
      </form>
      <details>
        <summary>Adım 1 - Üçgenin kenar uzunluklarının hesaplanması</summary>
        <div>
          <li>A = m{"\u00b2"} - n{"\u00b2"} {"\u2192"} {variables.m}{"\u00b2"} - {variables.n}{"\u00b2"} = {triangle.A}</li>
          <li>B = 2mn + 2m{"\u00b2"}cos{"\u03b8"} {"\u2192"} 2 . {variables.m} . {variables.n} + 2 . {variables.m}{"\u00b2"} . ({variables.cosine[0]}/{variables.cosine[1]}) = {triangle.B}</li>
          <li>C = m{"\u00b2"} + n{"\u00b2"} + 2mncos{"\u03b8"} {"\u2192"} {variables.m}{"\u00b2"} + {variables.n}{"\u00b2"} + 2 . {variables.m} . {variables.n} . ({variables.cosine[0]}/{variables.cosine[1]}) = {triangle.C}</li>
        </div>
      </details>
      <div className='shapeInfo'>
        <span>A: {triangle.A}</span>
        <span>B: {triangle.B}</span>
        <span>C: {triangle.C}</span>
        <span>θ: {Math.acos(triangle.cos) * 180 / Math.PI}{"\u00BA"}</span>
      </div>
      <Canvas triangle={triangle} />
      <details>
        <summary>Adım 2 - Primitif (en sade) üçgenin oluşturulması</summary>
        <div>
          <div>Kenarların tam sayı olabilmesi için her bir kenar cosθ = a/b ifadesindeki b ile çarpılır.</div>
          {
            [triangle.A, triangle.B, triangle.C].every(Number.isInteger)
              ? <li>Kenarlar tam sayı olduğundan bu adımda çarpma işlemine gerek yoktur.</li>
              : <>
                <li>cosθ = {variables.cosine[0]}/{variables.cosine[1]}, b = {variables.cosine[1]}</li>
                <li>{triangle.A} * {variables.cosine[1]} = {triangle.A * variables.cosine[1]}</li>
                <li>{triangle.B} * {variables.cosine[1]} = {triangle.B * variables.cosine[1]}</li>
                <li>{triangle.C} * {variables.cosine[1]} = {triangle.C * variables.cosine[1]}</li>
              </>
          }
          <div>Daha sonra elde edilen sayılar en büyük ortak bölenleri ile sadeleştirilerek primitif üçgen elde edilir.</div>
          {
            gcd(gcd(triangle.A, triangle.B), triangle.C) === 1
              ? <li>Kenar uzunlukları en sade biçimde olduğundan bu adımda sadeleştirme işlemine gerek yoktur.</li>
              : <>
                <li>ebob = {gcd(gcd(triangle.A, triangle.B), triangle.C)}</li>
                <li>A = {triangle.A} : {triangle.A / gcd(gcd(triangle.A, triangle.B), triangle.C)}</li>
                <li>B = {triangle.B} : {triangle.B / gcd(gcd(triangle.A, triangle.B), triangle.C)}</li>
                <li>C = {triangle.C} : {triangle.C / gcd(gcd(triangle.A, triangle.B), triangle.C)}</li>
              </>
          }
        </div>
      </details>
      <Canvas triangle={{
        A: triangle.A / gcd(gcd(triangle.A, triangle.B), triangle.C),
        B: triangle.B / gcd(gcd(triangle.A, triangle.B), triangle.C),
        C: triangle.C / gcd(gcd(triangle.A, triangle.B), triangle.C),
        cos: triangle.cos
      }} />
      <details>
        <summary>Adım 3 - İşlemlerin Kosinüs Teoremi ile doğrulanması</summary>
        <div>
          <span>Kosinüs teoremi kullanılarak yapılan işlemlerin doğruluğu sağlanabilir:</span>
          <li>{triangle.A}{"\u00b2"} = {triangle.A ** 2}</li>
          <li>{triangle.B}{"\u00b2"} = {triangle.B ** 2}</li>
          <li>{triangle.C}{"\u00b2"} = {triangle.C ** 2}</li>
          <li>2 . {triangle.A} . {triangle.B} . ({variables.cosine[0]}/{variables.cosine[1]}) = {2 * triangle.A * triangle.B * triangle.cos}</li>
          <li>{triangle.A ** 2} + {triangle.B ** 2} - {2 * triangle.A * triangle.B * triangle.cos} = {triangle.C ** 2}</li>
        </div>
      </details>
      <div className="credit">
        <div>Hamza Kağan Özer, Tarık Tamer</div>
        <div>Kosinüs Değeri Rasyonel Sayı Olarak Verilen Açılara Sahip Tam Sayı Kenarlı Üçgen Oluşturma Algoritmaları​</div>
      </div>
    </main>
  )
}

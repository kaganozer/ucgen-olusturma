const gcdOfTwo = (a, b) => b ? gcdOfTwo(b, a%b) : a;

const gcdOfArray = (array) => {
  let n = 0;
  array.forEach(el => {n = gcdOfTwo(el, n)});
  return n;
}

const Gcd = (props) => {
    const [A, B, C] = props.array;
    return (
        <>
            <li>gcd({A}, {B}, {C}) = {gcdOfArray([A, B, C])}</li>
            {
            gcdOfArray([A, B, C]) === 1
            ? <li>gcd = 1 olduğundan sadeleştirme işlemine gerek yoktur.</li>
            : <>
                <li>{A} / {gcdOfArray([A, B, C])} = {A / gcdOfArray([A, B, C])}</li>
                <li>{B} / {gcdOfArray([B, B, C])} = {B / gcdOfArray([A, B, C])}</li>
                <li>{C} / {gcdOfArray([C, B, C])} = {C / gcdOfArray([A, B, C])}</li>
            </>
            }
        </>
    );
}

export default Gcd;
const Matrix = props => {
    const { rows } = props;
    return (
        <div className="matrix">{
            rows.map((row, rowIndex) => (<div className="matrix-row" key={rowIndex}>{
                row.map((el, elIndex) => <span key={elIndex}>{el}</span>)
            }</div>))
        }</div>
    )
}

export default Matrix;

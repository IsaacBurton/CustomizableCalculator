export function FunctionButton(props) {
    let {
        functionName: functionName,
        onClick: onClick,
    } = props;

    return (
        <div className="function-button">
            <button onClick={onClick}>{functionName}</button>
        </div>
    )
}
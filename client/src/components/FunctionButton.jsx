export function FunctionButton(props) {
    let {
        functionName: functionName,
        onClick: onClick,
    } = props;

    return (
        <span>
            <button onClick={onClick}>{functionName}</button>
        </span>
    )
}
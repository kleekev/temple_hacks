const RequestList = (props) => {
    const handleClick = (e) => {
        const filteredList = props.list.filter((l) => l !== e.target.textContent)
        props.setList(filteredList)
    }
    return (
        <div>
            <h1 className="text-white text-xl underline">List of Accepted Requests</h1>
            {props.list.map((l, index) => (<button onClick={handleClick} key={l}>{l}</button>))}
        </div>
    )
}

export default RequestList
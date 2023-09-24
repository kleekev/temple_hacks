const RequestList = (props) => {
    return (
        <div className="text-center">
            <h1 className="text-white text-xl underline">List of Addresses</h1>
            {props.list.map((l, index) => (<p key={l}>{l}</p>))}
        </div>
    )
}

export default RequestList
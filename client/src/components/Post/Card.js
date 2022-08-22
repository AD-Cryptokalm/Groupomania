import { useState } from "react"

const Card = ({post}) => {

    const [isLoading, setIsLoading] = useState(true)

    return (
        <li className="card-container" key={postMessage._id}>
            {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
            ):(
                <h2>test</h2>
            )}
        </li>
    )

}

export default Card
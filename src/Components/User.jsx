import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";


const User = () => {
    const loadedUser = useLoaderData()
    const [users, setUsers] = useState(loadedUser);
    const handleDelete = _id=>{
        console.log("delete", _id)
        fetch(`http://localhost:5000/users/${_id}`,{
            method: "DELETE"
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
         if(data.deletedCount >0){
            alert('delete successful')
            const remaining  = users.filter(user => user._id !== _id); 
            setUsers(remaining);
         }
        });

    };
    return (
        <div>
            <h1>Total Data: {users.length} </h1>
            <div>
                {
                    users.map(user => <p key={user._id}>{user.name} : {user.email}: {user._id} <button onClick={ ()=>handleDelete(user._id)}>Delete</button> 
                    <Link to={`/update/${user._id}`}> Update</Link>
                     </p>
                     )
                }
                

               <Link to="/" className="btn  btn-primary"> Back to Home</Link>
            </div>

            
        </div>

    //     <div>
    //     <h1>Hello: {loadedUser.length} </h1>
    //     <div>
    //         {
    //             users.map(user => (
    //                 <div key={user._id}>
    //                     <p>{user.name} : {user.email}: {user._id}</p>
    //                     <button onClick={() => handleDelete(user._id)}>X</button>
    //                 </div>
    //             ))
    //         }
    //         <Link to="/" className="btn btn-primary">Back to Home</Link>
    //     </div>
    // </div>
    );
};

export default User;
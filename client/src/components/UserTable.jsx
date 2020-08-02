import React from 'react';
import {Table} from 'reactstrap';
import {Link} from 'react-router-dom';

export default function UserTable({group}){
    return (
        <Table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Rating</td>
                        <td>Permission</td>
                    </tr>
                </thead>
                <tbody>
                    {group.admins.map(admin =>{
                        return (
                            <tr key={admin._id}>
                                <td><Link to={'/users/'+admin._id}>{admin.username}</Link></td>
                                <td>{admin.rating}</td>
                                <td>Admin</td>
                            </tr>
                        )
                    })}
                    {group.users.map(user =>{
                        return (
                            <tr key={user._id}>
                                <td><Link to={'/users/'+user._id}>{user.username}</Link></td>
                                <td>{user.rating}</td>
                                <td>User</td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </Table>
    );
}
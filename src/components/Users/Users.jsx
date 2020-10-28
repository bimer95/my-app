import React from 'react';
import styles from './users.module.css'

let Users = (props) => {
    if (props.users.length === 0) {
        props.setUsers([
            {
                id: 1, 
                photoUrl: 'https://media.tvzvezda.ru/storage/default/2019/01/23/39b2d933d6cc4651b11f61422bc8de98.jpg',
                followed: true,
                fullName: 'Veniamin',
                status: 'admin',
                location: { city: 'Tomsk', contry: 'Russia' }
            },
            {
                id: 2, 
                photoUrl: 'https://media.tvzvezda.ru/storage/default/2019/01/23/39b2d933d6cc4651b11f61422bc8de98.jpg',
                followed: false,
                fullName: 'Volodya',
                status: 'user',
                location: { city: 'Tomsk', contry: 'Russia' }
            },
            {
                id: 3, 
                photoUrl: 'https://media.tvzvezda.ru/storage/default/2019/01/23/39b2d933d6cc4651b11f61422bc8de98.jpg',
                followed: false,
                fullName: 'Sergei',
                status: 'user',
                location: { city: 'Roan', contry: 'France' }
            },
            {
                id: 4, 
                photoUrl: 'https://media.tvzvezda.ru/storage/default/2019/01/23/39b2d933d6cc4651b11f61422bc8de98.jpg',
                followed: false,
                fullName: 'Anton',
                status: 'user',
                location: { city: 'Tomsk', contry: 'Russia' }
            }
        ]
        )
    }

    return <div>
        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <img src={u.photoUrl} className={styles.userPhoto}/>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {
                                props.unfollow(u.id)
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                props.follow(u.id)
                            }}>Follow</button>}

                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.fullName}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{u.location.country}</div>
                        <div>{u.location.city}</div>
                    </span>
                </span>
            </div>)
        }
    </div>
}

export default Users;
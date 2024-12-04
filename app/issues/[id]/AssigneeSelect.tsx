'use client'
import { User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import axios from 'axios';
import { useEffect, useState } from 'react'

export default function AssigneeSelect() {
  const [users, setUsers] = useState<User[]>([]);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const {data} = await axios.get<User[]>('/api/users');
        setUsers(data)
        console.log(data);
      } catch (error) {
        console.error(error);
      };
    };
    fetchUsers();
  }, []);

  return (
    <Select.Root>
        <Select.Trigger placeholder='Asign...'/>
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    {users.map(user => (
                      <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>)
                    )}
                </Select.Group>
            </Select.Content>
    </Select.Root>
  )
}

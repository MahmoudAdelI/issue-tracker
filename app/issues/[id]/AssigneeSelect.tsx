'use client'
import { Select } from '@radix-ui/themes'

export default function AssigneeSelect() {
  return (
    <Select.Root>
        <Select.Trigger placeholder='Asign...'/>
        <Select.Group>
            <Select.Content>
                <Select.Label>Suggestions</Select.Label>
                <Select.Item value='1'>Mahmoud Adel</Select.Item>
            </Select.Content>
        </Select.Group>
    </Select.Root>
  )
}

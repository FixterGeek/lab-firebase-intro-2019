import { useState } from 'react'

export function useToggleModal(initial = true) {
    let [value, setValue] = useState(initial)
    function onChange(newValue) {
        setValue(newValue)
    }
    return [value, onChange]
}
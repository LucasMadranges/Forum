import React from 'react';

export default function Textarea({
    label,
    name,
    value,
    onChange,
}: {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
    return (
        <>
            <label htmlFor={name} className={'font-bold'}>
                {label}
            </label>
            <textarea
                rows={12}
                name={name}
                id={name}
                className={'border border-gray-300 rounded-lg p-2'}
                value={value}
                onChange={onChange}
            />
        </>
    );
}

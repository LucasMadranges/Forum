import React from "react";

export default function Input({
                                  label,
                                  name,
                                  value,
                                  onChange,
                              }: {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <>
            <label htmlFor={name}
                   className={"font-bold"}>
                {label}
            </label>
            <input
                name={name}
                id={name}
                type={"text"}
                className={"border border-gray-300 rounded-lg p-2"}
                value={value}
                onChange={onChange}
            />
        </>
    );
}

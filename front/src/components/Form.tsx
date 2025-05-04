import Input from '@/components/Input';
import React, { useState } from 'react';
import Textarea from '@/components/Textarea';

export default function Form() {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');

    return (
        <form className={'flex flex-col gap-8'}>
            <div className={'flex flex-col gap-4'}>
                <Input
                    label={"Nom d'utilisateur"}
                    name={'username'}
                    value={username}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUsername(e.target.value)
                    }
                />
            </div>
            <div className={'flex flex-col gap-4'}>
                <Textarea
                    label={'Message'}
                    name={'message'}
                    value={message}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setMessage(e.target.value)
                    }
                />
            </div>
            <button
                className={
                    'cursor-pointer px-4 py-2 bg-blue-500 hover:bg-blue-600 transition text-white rounded-lg w-fit'
                }
            >
                Envoyer le message
            </button>
        </form>
    );
}

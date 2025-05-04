'use client';

import Link from 'next/link';
import Form from '@/components/Form';

export default function Page() {
    return (
        <>
            <div className={'container mx-auto py-12 flex flex-col gap-16'}>
                <Link
                    href="/"
                    className={
                        'px-4 py-2 bg-blue-500 hover:bg-blue-600 transition text-white rounded-lg w-fit'
                    }
                >
                    Retour à la home
                </Link>
                <Form />
            </div>
        </>
    );
}

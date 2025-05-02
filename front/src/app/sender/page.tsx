import Link from 'next/link';

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
                <div className={'flex flex-col gap-8'}>
                    <div className={'flex flex-col gap-4'}>
                        <label className={'font-bold'}>Nom d&apos;utilisateur</label>
                        <input type={'text'} className={'border border-gray-300 rounded-lg p-2'} />
                    </div>
                    <div className={'flex flex-col gap-4'}>
                        <label className={'font-bold'}>Message</label>
                        <input type={'text'} className={'border border-gray-300 rounded-lg p-2'} />
                    </div>
                    <button
                        className={
                            'cursor-pointer px-4 py-2 bg-blue-500 hover:bg-blue-600 transition text-white rounded-lg w-fit'
                        }
                    >
                        Envoyer le message
                    </button>
                </div>
            </div>
        </>
    );
}

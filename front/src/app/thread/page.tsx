import Link from 'next/link';
import Message from '@/components/Message';

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
                <div className={'flex flex-col gap-4'}>
                    <Message username={'Bob'} message={'Hello World!'} />
                    <Message username={'Bob'} message={'Hello World!'} />
                    <Message username={'Bob'} message={'Hello World!'} />
                </div>
            </div>
        </>
    );
}

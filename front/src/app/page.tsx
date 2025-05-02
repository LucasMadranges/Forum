import Link from "next/link";

export default function Home() {
    return (
        <>
            <div className={"container mx-auto py-80 flex flex-col items-center gap-16"}>
                <h1 className={"text-6xl font-semibold"}>Page d&apos;accueil</h1>
                <div className={"flex gap-4"}>
                    <Link
                        href="/sender"
                        className={
                            "px-4 py-2 bg-blue-500 hover:bg-blue-600 transition text-white rounded-lg"
                        }
                    >
                        Envoyer un message
                    </Link>
                    <Link
                        href="/thread"
                        className={
                            "px-4 py-2 bg-blue-500 hover:bg-blue-600 transition text-white rounded-lg"
                        }
                    >
                        Lire les messages
                    </Link>
                </div>
            </div>
        </>
    );
}

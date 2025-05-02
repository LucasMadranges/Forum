export default function Message({ username, message }: { username: string; message: string }) {
    return (
        <div
            className={
                'flex items-center justify-between gap-4 border border-gray-300 p-4 rounded-lg shadow'
            }
        >
            <span>{username}</span>
            <span>{message}</span>
        </div>
    );
}

import { component$ } from '@builder.io/qwik';

export interface IMessage {
    message: string | undefined;
    status: string;
}

type Props = {
    message: IMessage;
    classText?: string;
};

export const Message = component$(({ message, classText }: Props) => {
    return (
        <>
            {message.message && (
                <div
                    class={
                        classText +
                        'transition-all duration-600 text-sm border-2 border-gray-300 py-2 px-4 w-full animate-bounce' +
                        (message.status === 'error' &&
                            ' text-red-600 bg-red-50 border-red-600') +
                        (message.status === 'warning' &&
                            ' text-yellow-600 bg-yellow-50 border-yellow-600') +
                        (message.status === 'notice' &&
                            ' text-sky-600 bg-sky-50 border-sky-600') +
                        (message.status === 'success' &&
                            ' text-green-600 bg-green-50 border-green-600')
                    }
                >
                    {message.message}
                </div>
            )}
        </>
    );
});

import Link from "next/link";

export default function Pagination({page, total}) {
    const lastPage = total;
    return (
        <>
            {page > 1 && (
                <Link href={`events?page=${page - 1}`} className={'btn-secondary'}>
                    Prev
                </Link>
            )}
            {page < lastPage && (
                <Link href={`events?page=${page + 1}`} className={'btn-secondary'}>
                    Next
                </Link>
            )}
        </>
    );
}
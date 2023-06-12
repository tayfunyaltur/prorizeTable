import Table from '../components/Table'
import useQuery from '../hooks/useQuery'
import { User } from '../types/user.type';

const Users = () => {

    const {
        data: rows,
        isLoading,
        isError,
        pagination,
        fetch: onDataFetch
    } = useQuery<User>("users");


    return (
        <Table columns={[
            { header: 'Name', accessor: 'name', filterType: 'TEXT' },
            { header: 'Age', accessor: 'age', filterType: 'NUMBER' },
            { header: 'Email', accessor: 'email', filterType: 'TEXT' },
            { header: 'Address', accessor: 'address', filterType: 'TEXT' },
            { header: 'City', accessor: 'city', filterType: 'TEXT' },
            { header: 'Country', accessor: 'country', filterType: 'TEXT' }
        ]}
            isLoading={isLoading}
            totalPages={pagination?.pageCount ?? 0}
            onFetchData={onDataFetch}
            rows={(rows ?? []) as Array<User>} />
    )
}

export default Users
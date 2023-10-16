
export default function Test({ data }) {
    return <>
        <div>{data.map(value => {
            return (
                <div>{value.bldg_nm}</div>
            )
        })}</div>
    </>
}
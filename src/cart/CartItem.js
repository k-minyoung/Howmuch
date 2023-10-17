


export default function CartItem({ value }) {

    const defaultTitle = value.title.replace(/<\/?b>/g, "");
    let title = value.title.replace(/<\/?b>/g, "");
    if (title.length > 30) {
        title = title.slice(0, 30) + " ..."
    } else {
        title = title
    }



    const addCommaPrice = value.lprice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return (
        <div className="text-center">
            <span title={defaultTitle} className="text-center"> {title}</span><br />
            <span className="font-bold text-lg">{addCommaPrice}₩</span>
        </div>
    )
}
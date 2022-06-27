import { useDispatch, useSelector } from "react-redux"
import { removeToast } from "../Reducers/toasts.slice";

export default function Toasts() {
    const dispatch = useDispatch();
    const toasts = useSelector(state => state.toasts.list);

    return (
        <ul>
            {toasts.map(
                ({ id, text }) => <li key={id}>
                    <span>{text}</span> - <button onClick={e => dispatch(removeToast({id}))}>X</button>
                </li>
            )}
        </ul>
    )
}